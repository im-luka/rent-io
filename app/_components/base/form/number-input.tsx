"use client";

import { FC, useRef } from "react";
import {
  ActionIcon,
  Flex,
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { useController } from "react-hook-form";

type Props = NumberInputProps & {
  name: string;
};

export const FormNumberInput: FC<Props> = (props) => {
  const { t, handlerRef, field, error, restProps } = useFormNumberInput(props);

  return (
    <Flex align="flex-end" gap="xs">
      <ActionIcon
        variant="default"
        radius="xl"
        mb="0.28125rem"
        onClick={() => handlerRef.current?.decrement()}
      >
        {t("minus")}
      </ActionIcon>
      <NumberInput
        {...field}
        error={error?.message}
        min={0}
        decimalSeparator={t("comma")}
        thousandsSeparator={t("dot")}
        {...restProps}
        hideControls
        handlersRef={handlerRef}
      />
      <ActionIcon
        variant="default"
        radius="xl"
        mb="0.28125rem"
        onClick={() => handlerRef.current?.increment()}
      >
        {t("plus")}
      </ActionIcon>
    </Flex>
  );
};

function useFormNumberInput({ name, ...restProps }: Props) {
  const t = useTranslations("symbol");
  const handlerRef = useRef<NumberInputHandlers>();

  const { field, fieldState } = useController({ name });
  const error = fieldState.error;

  return { t, handlerRef, field, error, restProps };
}
