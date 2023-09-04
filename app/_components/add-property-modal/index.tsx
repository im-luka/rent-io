import { FC, useReducer } from "react";
import { Modal, Stepper } from "@mantine/core";
import {
  PropertyStepOneCategory,
  PropertyStepOneCategoryFormValues,
} from "./property-step-one-category";
import {
  PropertyStepTwoLocation,
  PropertyStepTwoLocationFormValues,
} from "./property-step-two-location";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const AddPropertyModal: FC<Props> = (props) => {
  const { opened, onClose, state, dispatch } = useAddPropertyModal(props);

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
        <Stepper.Completed>Property ready to create!</Stepper.Completed>
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
    default:
      return state;
  }
}

function useAddPropertyModal({ opened, onClose }: Props) {
  const [state, dispatch] = useReducer(reducerFnc, initialData);

  return { opened, onClose, state, dispatch };
}
