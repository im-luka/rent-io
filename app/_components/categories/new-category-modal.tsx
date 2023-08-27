import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Modal, Stack } from "@mantine/core";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormTextInput } from "../base/form/text-input";
import { Typography } from "../base/typography";

type Props = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  isAdding: boolean;
};

export const NewCategoryModal: FC<Props> = (props) => {
  const { t, opened, onClose, categoryForm, onSubmit, isAdding } =
    useNewCategoryModal(props);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title={<Typography size="lg">{t("title")}</Typography>}
    >
      <FormProvider {...categoryForm}>
        <form onSubmit={onSubmit}>
          <Stack>
            <FormTextInput
              name="name"
              label={t("name")}
              placeholder={t("namePlaceholder")}
              withAsterisk
            />
            <FormTextInput
              name="emoji"
              label={t("emoji")}
              placeholder={t("emojiPlaceholder")}
            />
            <Divider my="sm" />
            <Button type="submit" loading={isAdding}>
              {t("createAction")}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Modal>
  );
};

function useNewCategoryModal({ opened, onClose, onSubmit, isAdding }: Props) {
  const t = useTranslations("home.categories.create");

  const tValidation = useTranslations("validation");
  const categoryForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema(tValidation("required"))),
    defaultValues: {
      name: "",
      emoji: "",
    },
  });

  const handleSubmit = async (values: CategoryFormValues) => {
    await onSubmit(values);
    categoryForm.reset();
  };

  return {
    t,
    opened,
    onClose,
    categoryForm,
    onSubmit: categoryForm.handleSubmit(handleSubmit),
    isAdding,
  };
}

export type CategoryFormValues = z.infer<ReturnType<typeof categorySchema>>;
const categorySchema = (required: string) =>
  z.object({
    name: z.string().nonempty(required),
    emoji: z.string(),
  });
