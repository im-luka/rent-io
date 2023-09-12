import { FC, useReducer } from "react";
import { Button, Modal, Stack, Stepper } from "@mantine/core";
import { PropertyStepOneCategory } from "./property-step-one-category";
import {
  PropertyStepTwoLocation,
  PropertyStepTwoLocationFormValues,
} from "./property-step-two-location";
import { Typography } from "../base/typography";
import { useTranslations } from "next-intl";
import { DEFAULT_MAP_LATLNG } from "@/utils/constants";
import {
  PropertyStepThreeMisc,
  PropertyStepThreeMiscFormValues,
} from "./property-step-three-misc";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const AddPropertyModal: FC<Props> = (props) => {
  const { t, opened, onClose, state, dispatch, handleSubmit } =
    useAddPropertyModal(props);

  return (
    <Modal opened={opened} onClose={onClose} title={t("title")} centered>
      <Stepper size="sm" active={state.active} allowNextStepsSelect={false}>
        <Stepper.Step
          label={t("category.label")}
          description={t("category.description")}
        >
          <PropertyStepOneCategory formState={state.form} dispatch={dispatch} />
        </Stepper.Step>
        <Stepper.Step
          label={t("location.label")}
          description={t("location.description")}
        >
          <PropertyStepTwoLocation formState={state.form} dispatch={dispatch} />
        </Stepper.Step>
        <Stepper.Step
          label={t("misc.label")}
          description={t("misc.description")}
        >
          <PropertyStepThreeMisc formState={state.form} dispatch={dispatch} />
        </Stepper.Step>
        <Stepper.Completed>
          <Stack spacing="xl" mt="md">
            <Typography component="h4" ta="center">
              {t("completed.title")}
            </Typography>
            <Stack spacing="xs">
              <Button onClick={handleSubmit}>{t("completed.submit")}</Button>
              <Button
                variant="subtle"
                onClick={() => dispatch({ type: StepType.PREVIOUS })}
              >
                {t("completed.back")}
              </Button>
              <Button
                color="red.7"
                onClick={() => dispatch({ type: StepType.RESET })}
              >
                {t("completed.reset")}
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
  MISC = 2,
}
export enum StepType {
  PREVIOUS = "previous",
  NEXT = "next",
  RESET = "reset",
}
export type StepForm = {
  category: string[];
  location: PropertyStepTwoLocationFormValues;
  misc: PropertyStepThreeMiscFormValues;
};
type StepPayload = {
  active: number;
  form: StepForm;
};
const initialData: StepPayload = {
  active: AddPropertyStep.CATEGORY,
  form: {
    category: [],
    location: {
      country: "",
      city: "",
      street: "",
      postalCode: "",
      county: "",
      latlng: DEFAULT_MAP_LATLNG,
    },
    misc: {
      quadrature: 0,
      guestCount: 0,
      bathroomCount: 0,
      includesKitchen: false,
      includesParking: false,
    },
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
  const t = useTranslations("home.propertyModal");
  const [state, dispatch] = useReducer(reducerFnc, initialData);

  const handleSubmit = () => console.log(state);

  return { t, opened, onClose, state, dispatch, handleSubmit };
}
