import { FC, Dispatch, useState, FormEvent } from "react";
import { StepAction, StepForm, StepType } from ".";
import { Actions } from "./actions";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { categoryQuery } from "@/domain/queries/categories-query";
import { Chip, Grid } from "@mantine/core";
import { useIntl } from "@/hooks/use-intl";
import { Typography } from "../base/typography";
import { useTranslations } from "next-intl";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepOneCategory: FC<Props> = (props) => {
  const {
    selected,
    setSelected,
    locale,
    categories,
    error,
    isSubmitted,
    handlePrevButton,
    handleSubmit,
  } = usePropertyStepOneCategory(props);

  const renderCategory = ({ id, name, emoji }: Category) => (
    <Grid.Col key={id} span={6}>
      <Chip value={id} w="100%">
        {emoji} {(name as Record<string, string>)[locale]}
      </Chip>
    </Grid.Col>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Chip.Group multiple value={selected} onChange={setSelected}>
        <Grid mt="lg">{categories?.map(renderCategory)}</Grid>
      </Chip.Group>
      {error.active && isSubmitted && (
        <Typography size="xs" mt="sm" ta="center" color="red.5">
          {error.msg}
        </Typography>
      )}
      <Actions handlePrevButton={handlePrevButton} />
    </form>
  );
};

function usePropertyStepOneCategory({ formState, dispatch }: Props) {
  const t = useTranslations();
  const { locale } = useIntl();
  const [selected, setSelected] = useState<string[]>(formState.category);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const error = {
    active: selected.length === 0,
    msg: t("validation.categorySelected"),
  };

  const { data: categories } = useQuery<Category[]>(categoryQuery.key);

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!error.active) {
      dispatch({ type: StepType.NEXT, payload: { category: selected } });
      setIsSubmitted(false);
    }
  };

  return {
    selected,
    setSelected,
    locale,
    categories,
    error,
    isSubmitted,
    handlePrevButton,
    handleSubmit,
  };
}
