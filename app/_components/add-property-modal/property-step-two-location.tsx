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

export const PropertyStepTwoLocation: FC<Props> = (props) => {
  const { stepTwoForm, onPrevStep, onSubmit } =
    usePropertyStepTwoLocation(props);

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

function usePropertyStepTwoLocation({ onPrevStep, onNextStep }: Props) {
  const stepTwoForm = useForm<PropertyStepTwoLocationFormValues>({
    resolver: zodResolver(propertyStepTwoLocationSchema("required field!")),
    defaultValues: {
      subject: "",
    },
  });

  const handleSubmit = (values: PropertyStepTwoLocationFormValues) => {
    onNextStep();
  };

  return {
    stepTwoForm,
    onPrevStep,
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
