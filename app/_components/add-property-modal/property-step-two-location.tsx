import { FC, Dispatch, useState } from "react";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepAction, StepForm, StepType } from ".";
import { Actions } from "./actions";
import { useCountries } from "@/hooks/use-countries";
import { FormSelect } from "../base/form/select";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepTwoLocation: FC<Props> = (props) => {
  const { stepTwoForm, countries, handleChange, handlePrevButton, onSubmit } =
    usePropertyStepTwoLocation(props);

  return (
    <FormProvider {...stepTwoForm}>
      <form onSubmit={onSubmit}>
        <Controller
          name="country"
          render={({ field }) => (
            <FormSelect
              name="country"
              data={countries.map(({ id, flag, name }) => ({
                value: id,
                label: `${flag} ${name}`,
              }))}
              onChange={(value) => {
                field.onChange(value);
                handleChange(value);
              }}
              dropdownPosition="bottom"
            />
          )}
        />
        <Actions handlePrevButton={handlePrevButton} />
      </form>
    </FormProvider>
  );
};

function usePropertyStepTwoLocation({ formState, dispatch }: Props) {
  const [country, setCountry] = useState<string>(formState.location.country);
  const [countries] = useCountries();

  const stepTwoForm = useForm<PropertyStepTwoLocationFormValues>({
    resolver: zodResolver(propertyStepTwoLocationSchema("required field!")),
    defaultValues: formState.location,
  });

  const handleChange = (value: string | null) => {
    setCountry(countries.find((c) => c.id === value)?.id ?? "");
  };

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const handleSubmit = (values: PropertyStepTwoLocationFormValues) => {
    dispatch({ type: StepType.NEXT, payload: { location: values } });
  };

  return {
    stepTwoForm,
    countries,
    handleChange,
    handlePrevButton,
    onSubmit: stepTwoForm.handleSubmit(handleSubmit),
  };
}

export type PropertyStepTwoLocationFormValues = z.infer<
  ReturnType<typeof propertyStepTwoLocationSchema>
>;
const propertyStepTwoLocationSchema = (required: string) =>
  z.object({
    country: z.string().nonempty(required),
  });
