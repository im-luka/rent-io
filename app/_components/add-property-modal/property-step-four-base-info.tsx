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
import { useTranslations } from "next-intl";
import { IconCurrencyEuro } from "@tabler/icons-react";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepFourBaseInfo: FC<Props> = (props) => {
  const { t, stepFourForm, handlePrevButton, onSubmit } =
    usePropertyStepFourBaseInfo(props);

  return (
    <FormProvider {...stepFourForm}>
      <form onSubmit={onSubmit}>
        <Stack>
          <FormTextInput
            name="name"
            label={t("name")}
            placeholder={t("namePlaceholder")}
            withAsterisk
          />
          <FormTextarea
            name="description"
            label={t("descriptionLabel")}
            placeholder={t("descriptionLabelPlaceholder")}
            minRows={5}
            withAsterisk
          />
          <Divider mt="sm" />
          <FormNumberInput
            name="price"
            label={t("price")}
            precision={2}
            step={50}
            withAsterisk
            icon={<IconCurrencyEuro size={16} />}
          />
        </Stack>
        <Actions handlePrevButton={handlePrevButton} />
      </form>
    </FormProvider>
  );
};

function usePropertyStepFourBaseInfo({ formState, dispatch }: Props) {
  const t = useTranslations("home.propertyModal.baseInfo");

  const tValidation = useTranslations("validation");
  const validationMessages: Parameters<typeof propertyStepFourBaseInfoSchema> =
    [tValidation("required"), tValidation("greaterThanZero")];
  const stepFourForm = useForm<PropertyStepFourBaseInfoFormValues>({
    resolver: zodResolver(
      propertyStepFourBaseInfoSchema(...validationMessages)
    ),
    defaultValues: formState.baseInfo,
  });

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const handleSubmit = (values: PropertyStepFourBaseInfoFormValues) => {
    dispatch({ type: StepType.NEXT, payload: { baseInfo: values } });
  };

  return {
    t,
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
