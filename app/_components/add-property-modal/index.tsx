import { FC, useReducer } from "react";
import { Button, Modal, Stack, Stepper } from "@mantine/core";
import {
  PropertyStepOneCategory,
  PropertyStepOneCategoryFormValues,
} from "./property-step-one-category";
import {
  PropertyStepTwoLocation,
  PropertyStepTwoLocationFormValues,
} from "./property-step-two-location";
import { Typography } from "../base/typography";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const AddPropertyModal: FC<Props> = (props) => {
  const { opened, onClose, state, dispatch, handleSubmit } =
    useAddPropertyModal(props);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add Property Modal"
      centered
    >
      <Stepper size="sm" active={state.active} allowNextStepsSelect={false}>
        <Stepper.Step label="Step 1" description="Select Category">
          <PropertyStepOneCategory formState={state.form} dispatch={dispatch} />
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Select Location">
          <PropertyStepTwoLocation formState={state.form} dispatch={dispatch} />
        </Stepper.Step>
        <Stepper.Completed>
          <Stack spacing="xl" mt="md">
            <Typography component="h4" ta="center">
              Property ready for creation!
            </Typography>
            <Stack spacing="xs">
              <Button onClick={handleSubmit}>Submit</Button>
              <Button
                variant="subtle"
                onClick={() => dispatch({ type: StepType.PREVIOUS })}
              >
                Go Back
              </Button>
              <Button
                color="red.7"
                onClick={() => dispatch({ type: StepType.RESET })}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </Stepper.Completed>
      </Stepper>
    </Modal>
  );
};

enum AddPropertyStep {
  CATEGORY = 0,
  LOCATION = 1,
}
export enum StepType {
  PREVIOUS = "previous",
  NEXT = "next",
  RESET = "reset",
}
export type StepForm = {
  category: PropertyStepOneCategoryFormValues;
  location: PropertyStepTwoLocationFormValues;
};
type StepPayload = {
  active: number;
  form: StepForm;
};
const initialData: StepPayload = {
  active: AddPropertyStep.CATEGORY,
  form: {
    category: { title: "" },
    location: { subject: "" },
  },
};
export type StepAction = {
  type: StepType;
  payload?: Partial<StepForm>;
};

function reducerFnc(
  state: StepPayload,
  { type, payload }: StepAction
): StepPayload {
  const numberOfSteps = Object.values(AddPropertyStep).length / 2;
  switch (type) {
    case StepType.PREVIOUS:
      return {
        active: state.active <= 0 ? 0 : state.active - 1,
        form: state.form,
      };
    case StepType.NEXT:
      return {
        active:
          state.active >= numberOfSteps ? numberOfSteps : state.active + 1,
        form: {
          ...state.form,
          ...payload,
        },
      };
    case StepType.RESET:
      return initialData;
    default:
      return state;
  }
}

function useAddPropertyModal({ opened, onClose }: Props) {
  const [state, dispatch] = useReducer(reducerFnc, initialData);

  const handleSubmit = () => console.log(state);

  return { opened, onClose, state, dispatch, handleSubmit };
}
