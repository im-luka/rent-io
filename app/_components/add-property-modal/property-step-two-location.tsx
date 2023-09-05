import { FC, Dispatch, useState } from "react";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepAction, StepForm, StepType } from ".";
import { Actions } from "./actions";
import { useCountries } from "@/hooks/use-countries";
import { FormSelect } from "../base/form/select";
import { Group, Stack } from "@mantine/core";
import { FormTextInput } from "../base/form/text-input";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepTwoLocation: FC<Props> = (props) => {
  const {
    stepTwoForm,
    countries,
    addressErrors,
    handleChange,
    handlePrevButton,
    onSubmit,
  } = usePropertyStepTwoLocation(props);

  return (
    <FormProvider {...stepTwoForm}>
      <form onSubmit={onSubmit}>
        <Stack>
          <Controller
            name="country"
            render={({ field }) => (
              <FormSelect
                name="country"
                label="Country"
                placeholder="Select Country"
                data={countries.map(({ id, flag, name }) => ({
                  value: id,
                  label: `${flag} ${name}`,
                }))}
                onChange={(value) => {
                  field.onChange(value);
                  handleChange(value);
                }}
                dropdownPosition="bottom"
                searchable
                allowDeselect
                withAsterisk
              />
            )}
          />
          {/* TODO: 🗺️ leaflet map goes here */}
          <Stack spacing="xs">
            <Group noWrap>
              <FormTextInput
                name="city"
                label="City"
                placeholder="City"
                withAsterisk
                w="100%"
                mb={addressErrors.cityStreet.city ? "md" : 0}
              />
              <FormTextInput
                name="street"
                label="Street"
                placeholder="Street"
                withAsterisk
                w="100%"
                mb={addressErrors.cityStreet.street ? "md" : 0}
              />
            </Group>
            <Group noWrap>
              <FormTextInput
                name="county"
                label="County"
                placeholder="County"
                w="100%"
                mb={addressErrors.countyPostalCode.county ? "md" : 0}
              />
              <FormTextInput
                name="postalCode"
                label="Postal Code"
                placeholder="Postal Code"
                withAsterisk
                w="100%"
                mb={addressErrors.countyPostalCode.postalCode ? "md" : 0}
              />
            </Group>
          </Stack>
        </Stack>
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
    defaultValues: { ...formState.location, postalCode: undefined },
  });
  const {
    formState: { errors },
    handleSubmit,
  } = stepTwoForm;
  const addressErrors = {
    cityStreet: {
      city: !!(!errors.city && errors.street),
      street: !!(!errors.street && errors.city),
    },
    countyPostalCode: {
      county: !!(!errors.county && errors.postalCode),
      postalCode: !!(!errors.postalCode && errors.county),
    },
  };

  const handleChange = (value: string | null) => {
    setCountry(countries.find((c) => c.id === value)?.id ?? "");
  };

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const onSubmit = (values: PropertyStepTwoLocationFormValues) => {
    dispatch({ type: StepType.NEXT, payload: { location: values } });
  };

  return {
    stepTwoForm,
    countries,
    addressErrors,
    handleChange,
    handlePrevButton,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type PropertyStepTwoLocationFormValues = z.infer<
  ReturnType<typeof propertyStepTwoLocationSchema>
>;
const propertyStepTwoLocationSchema = (required: string) =>
  z.object({
    country: z.string().nonempty(required),
    city: z.string().nonempty(required),
    street: z.string().nonempty(required),
    postalCode: z.number({ required_error: required }),
    county: z.string(),
  });
