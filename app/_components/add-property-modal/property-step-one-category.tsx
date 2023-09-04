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

export const PropertyStepOneCategory: FC<Props> = (props) => {
  const { stepOneForm, onPrevStep, onSubmit } =
    usePropertyStepOneCategory(props);

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

function usePropertyStepOneCategory({
  onPrevStep,
  onNextStep,
  formState,
  setFormState,
}: Props) {
  const stepOneForm = useForm<PropertyStepOneCategoryFormValues>({
    resolver: zodResolver(propertyStepOneCategorySchema("required!")),
    defaultValues: formState.category,
  });

  const handleSubmit = (values: PropertyStepOneCategoryFormValues) => {
    onNextStep();
    setFormState((currState) => ({ ...currState, category: values }));
  };

  return {
    stepOneForm,
    onPrevStep,
    onSubmit: stepOneForm.handleSubmit(handleSubmit),
  };
}

export type PropertyStepOneCategoryFormValues = z.infer<
  ReturnType<typeof propertyStepOneCategorySchema>
>;
const propertyStepOneCategorySchema = (required: string) =>
  z.object({
    title: z.string().nonempty(required),
  });
