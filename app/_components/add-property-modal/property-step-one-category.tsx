import { Dispatch, FC, SetStateAction } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import { FormTextInput } from "../base/form/text-input";
import { FormState } from ".";

type Props = {
  formState: FormState;
  setFormState: Dispatch<SetStateAction<FormState>>;
  onPrevStep: () => void;
  onNextStep: () => void;
};

export const PropertyStepOne: FC<Props> = (props) => {
  const { stepOneForm, onPrevStep, onSubmit } = usePropertyStepOne(props);

  return (
    <FormProvider {...stepOneForm}>
      <form onSubmit={onSubmit}>
        <FormTextInput name="title" label="Title" />
        <Button onClick={onPrevStep}>prev step</Button>
        <Button type="submit">next step</Button>
      </form>
    </FormProvider>
  );
};

function usePropertyStepOne({
  onPrevStep,
  onNextStep,
  formState,
  setFormState,
}: Props) {
  const stepOneForm = useForm<PropertyStepOneFormValues>({
    resolver: zodResolver(propertyStepOneSchema("required!")),
    defaultValues: formState.category,
  });

  const handleSubmit = (values: PropertyStepOneFormValues) => {
    onNextStep();
    setFormState((currState) => ({ ...currState, category: values }));
  };

  return {
    stepOneForm,
    onPrevStep,
    onSubmit: stepOneForm.handleSubmit(handleSubmit),
  };
}

export type PropertyStepOneFormValues = z.infer<
  ReturnType<typeof propertyStepOneSchema>
>;
const propertyStepOneSchema = (required: string) =>
  z.object({
    title: z.string().nonempty(required),
  });
