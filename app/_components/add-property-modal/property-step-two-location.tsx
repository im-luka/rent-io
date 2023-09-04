import { FC, Dispatch } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormTextInput } from "../base/form/text-input";
import { StepAction, StepForm, StepType } from ".";
import { Actions } from "./actions";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepTwoLocation: FC<Props> = (props) => {
  const { stepTwoForm, handlePrevButton, onSubmit } =
    usePropertyStepTwoLocation(props);

  return (
    <FormProvider {...stepTwoForm}>
      <form onSubmit={onSubmit}>
        <FormTextInput name="subject" label="Subject" />
        <Actions handlePrevButton={handlePrevButton} />
      </form>
    </FormProvider>
  );
};

function usePropertyStepTwoLocation({ formState, dispatch }: Props) {
  const stepTwoForm = useForm<PropertyStepTwoLocationFormValues>({
    resolver: zodResolver(propertyStepTwoLocationSchema("required field!")),
    defaultValues: formState.location,
  });

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const handleSubmit = (values: PropertyStepTwoLocationFormValues) => {
    dispatch({ type: StepType.NEXT, payload: { location: values } });
  };

  return {
    stepTwoForm,
    handlePrevButton,
    onSubmit: stepTwoForm.handleSubmit(handleSubmit),
  };
}

export type PropertyStepTwoLocationFormValues = z.infer<
  ReturnType<typeof propertyStepTwoLocationSchema>
>;
const propertyStepTwoLocationSchema = (required: string) =>
  z.object({
    subject: z.string().nonempty(required),
  });
