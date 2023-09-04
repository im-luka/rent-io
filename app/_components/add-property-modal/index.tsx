import { FC, useState } from "react";
import { Modal, Stepper } from "@mantine/core";
import {
  PropertyStepOne,
  PropertyStepOneFormValues,
} from "./property-step-one-category";
import {
  PropertyStepTwo,
  PropertyStepTwoFormValues,
} from "./property-step-two";

enum StepType {
  PREVIOUS = "previous",
  NEXT = "next",
}
export enum AddPropertyStep {
  CATEGORY = 0,
  LOCATION = 1,
}
export type FormState = {
  category: PropertyStepOneFormValues;
  location: PropertyStepTwoFormValues;
};

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const AddPropertyModal: FC<Props> = (props) => {
  const { opened, onClose } = useAddPropertyModal(props);
  const [active, setActive] = useState(AddPropertyStep.CATEGORY);
  const [formState, setFormState] = useState<FormState>({
    category: { title: "" },
    location: { subject: "" },
  });
  const numberOfSteps = Object.values(AddPropertyStep).length / 2;

  const handlePrevStep = () =>
    setActive((currActiveStep) =>
      currActiveStep <= 0 ? 0 : currActiveStep - 1
    );

  const handleNextStep = () =>
    setActive((currActiveStep) =>
      currActiveStep >= numberOfSteps ? numberOfSteps : currActiveStep + 1
    );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add Property Modal"
      centered
    >
      <Stepper
        size="sm"
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Step 1" description="Select Category">
          <PropertyStepOne
            formState={formState}
            setFormState={setFormState}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
          />
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Select Location">
          <PropertyStepTwo
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
          />
        </Stepper.Step>
        <Stepper.Completed>Property ready to create!</Stepper.Completed>
      </Stepper>
    </Modal>
  );
};

function useAddPropertyModal({ opened, onClose }: Props) {
  return { opened, onClose };
}
