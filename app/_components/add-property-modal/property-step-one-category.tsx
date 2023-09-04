import { FC, Dispatch } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import { FormTextInput } from "../base/form/text-input";
import { StepAction, StepForm, StepType } from ".";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepOneCategory: FC<Props> = (props) => {
  const { stepOneForm, handlePrevButton, onSubmit } =
    usePropertyStepOneCategory(props);

  return (
    <FormProvider {...stepOneForm}>
      <form onSubmit={onSubmit}>
        <FormTextInput name="title" label="Title" />
        <Button onClick={handlePrevButton}>prev step</Button>
        <Button type="submit">next step</Button>
      </form>
    </FormProvider>
  );
};

function usePropertyStepOneCategory({ formState, dispatch }: Props) {
  const stepOneForm = useForm<PropertyStepOneCategoryFormValues>({
    resolver: zodResolver(propertyStepOneCategorySchema("required!")),
    defaultValues: formState.category,
  });

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const handleSubmit = (values: PropertyStepOneCategoryFormValues) => {
    dispatch({ type: StepType.NEXT, payload: { category: values } });
  };

  return {
    stepOneForm,
    handlePrevButton,
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
