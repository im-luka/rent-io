import { Dispatch, FC } from "react";
import { StepAction, StepForm, StepType } from ".";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Actions } from "./actions";
import {
  Divider,
  Group,
  NumberInputStylesNames,
  Stack,
  Styles,
  rem,
} from "@mantine/core";
import { Typography } from "../base/typography";
import { FormCheckbox } from "../base/form/checkbox";
import { NumberInputWithHandlers } from "../number-input-with-handlers";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepThreeMisc: FC<Props> = (props) => {
  const { stepThreeForm, fieldInputStyles, handlePrevButton, onSubmit } =
    usePropertyStepThreeMisc(props);

  return (
    <FormProvider {...stepThreeForm}>
      <form onSubmit={onSubmit}>
        <Stack mt="xs">
          <Group align="center" grow spacing="md">
            <Typography size="sm" ta="right">
              Number of Guests:
            </Typography>
            <NumberInputWithHandlers
              name="guestCount"
              min={1}
              withAsterisk
              styles={fieldInputStyles}
            />
          </Group>
          <Group align="center" grow spacing="md">
            <Typography size="sm" ta="right">
              Quadrature:
            </Typography>
            <NumberInputWithHandlers
              name="quadrature"
              step={5}
              min={1}
              withAsterisk
              styles={fieldInputStyles}
            />
          </Group>
          <Group align="center" grow spacing="md">
            <Typography size="sm" ta="right">
              Number of Bathrooms:
            </Typography>
            <NumberInputWithHandlers
              name="bathroomCount"
              min={1}
              withAsterisk
              styles={fieldInputStyles}
            />
          </Group>
          <Divider />
          <Group mx="auto" spacing="xl">
            <FormCheckbox name="includesKitchen" label="Includes Kitchen" />
            <FormCheckbox name="includesParking" label="Includes Parking" />
          </Group>
        </Stack>
        <Actions handlePrevButton={handlePrevButton} />
      </form>
    </FormProvider>
  );
};

function usePropertyStepThreeMisc({ formState, dispatch }: Props) {
  const stepThreeForm = useForm<PropertyStepThreeMiscFormValues>({
    resolver: zodResolver(
      propertyStepThreeMiscSchema("must be greater than zero")
    ),
    defaultValues: formState.misc,
  });

  const fieldInputStyles: Styles<
    NumberInputStylesNames,
    Record<string, any>
  > = {
    wrapper: { width: rem(42) },
    input: { textAlign: "center" },
  };

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const handleSubmit = (values: PropertyStepThreeMiscFormValues) => {
    dispatch({ type: StepType.NEXT, payload: { misc: values } });
  };

  return {
    stepThreeForm,
    fieldInputStyles,
    handlePrevButton,
    onSubmit: stepThreeForm.handleSubmit(handleSubmit),
  };
}

export type PropertyStepThreeMiscFormValues = z.infer<
  ReturnType<typeof propertyStepThreeMiscSchema>
>;
const propertyStepThreeMiscSchema = (greaterThanZero: string) =>
  z.object({
    quadrature: z.number().positive(greaterThanZero),
    guestCount: z.number().positive(greaterThanZero),
    bathroomCount: z.number().positive(greaterThanZero),
    includesKitchen: z.boolean(),
    includesParking: z.boolean(),
  });
