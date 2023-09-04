import { FC } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import { FormTextInput } from "../base/form/text-input";

type Props = {
  onPrevStep: () => void;
  onNextStep: () => void;
};

export const PropertyStepTwo: FC<Props> = (props) => {
  const { stepTwoForm, onPrevStep, onSubmit } = usePropertyStepTwo(props);

  return (
    <FormProvider {...stepTwoForm}>
      <form onSubmit={onSubmit}>
        <FormTextInput name="subject" label="Subject" />
        <Button onClick={onPrevStep}>prev step</Button>
        <Button type="submit">next step</Button>
      </form>
    </FormProvider>
  );
};

function usePropertyStepTwo({ onPrevStep, onNextStep }: Props) {
  const stepTwoForm = useForm<PropertyStepTwoFormValues>({
    resolver: zodResolver(propertyStepTwoSchema("required field!")),
    defaultValues: {
      subject: "",
    },
  });

  const handleSubmit = (values: PropertyStepTwoFormValues) => {
    onNextStep();
  };

  return {
    stepTwoForm,
    onPrevStep,
    onSubmit: stepTwoForm.handleSubmit(handleSubmit),
  };
}

export type PropertyStepTwoFormValues = z.infer<
  ReturnType<typeof propertyStepTwoSchema>
>;
const propertyStepTwoSchema = (required: string) =>
  z.object({
    subject: z.string().nonempty(required),
  });
