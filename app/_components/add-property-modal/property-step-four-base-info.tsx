import { Dispatch, FC } from "react";
import { StepAction, StepForm, StepType } from ".";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Actions } from "./actions";
import { Divider, Stack } from "@mantine/core";
import { FormTextInput } from "../base/form/text-input";
import { FormTextarea } from "../base/form/textarea";
import { FormNumberInput } from "../base/form/number-input";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepFourBaseInfo: FC<Props> = (props) => {
  const { stepFourForm, handlePrevButton, onSubmit } =
    usePropertyStepFourBaseInfo(props);

  return (
    <FormProvider {...stepFourForm}>
      <form onSubmit={onSubmit}>
        <Stack>
          <FormTextInput
            name="name"
            label="Name"
            placeholder="Luxury Apartment in Beverly Hills"
            withAsterisk
          />
          <FormTextarea
            name="description"
            label="Description"
            placeholder="Apartment with luxury interior and amazing view set in the livest part of the town"
            minRows={5}
            withAsterisk
          />
          <Divider mt="sm" />
          <FormNumberInput
            name="price"
            label="Price"
            precision={2}
            step={50}
            withAsterisk
          />
        </Stack>
        <Actions handlePrevButton={handlePrevButton} />
      </form>
    </FormProvider>
  );
};

function usePropertyStepFourBaseInfo({ formState, dispatch }: Props) {
  const stepFourForm = useForm<PropertyStepFourBaseInfoFormValues>({
    resolver: zodResolver(
      propertyStepFourBaseInfoSchema("required field!", "bigger than 0 must!")
    ),
    defaultValues: formState.baseInfo,
  });

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const handleSubmit = (values: PropertyStepFourBaseInfoFormValues) => {
    dispatch({ type: StepType.NEXT, payload: { baseInfo: values } });
  };

  return {
    stepFourForm,
    handlePrevButton,
    onSubmit: stepFourForm.handleSubmit(handleSubmit),
  };
}

export type PropertyStepFourBaseInfoFormValues = z.infer<
  ReturnType<typeof propertyStepFourBaseInfoSchema>
>;
const propertyStepFourBaseInfoSchema = (
  required: string,
  greaterThanZero: string
) =>
  z.object({
    name: z.string().nonempty(required),
    description: z.string().nonempty(required),
    price: z.number().positive(greaterThanZero),
  });
