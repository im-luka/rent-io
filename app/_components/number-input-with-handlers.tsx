"use client";

import { FC, useRef } from "react";
import {
  ActionIcon,
  Flex,
  NumberInputHandlers,
  NumberInputProps,
} from "@mantine/core";
import { FormNumberInput } from "./base/form/number-input";
import { useTranslations } from "next-intl";

type Props = NumberInputProps & {
  name: string;
};

export const NumberInputWithHandlers: FC<Props> = (props) => {
  const { t, name, restProps, handlersRef } = useNumberInputWithHandlers(props);

  return (
    <Flex align="flex-end" gap="xs">
      <ActionIcon
        variant="default"
        radius="xl"
        mb="0.28125rem"
        onClick={() => handlersRef.current?.decrement()}
      >
        {t("minus")}
      </ActionIcon>
      <FormNumberInput
        name={name}
        decimalSeparator={t("comma")}
        thousandsSeparator={t("dot")}
        {...restProps}
        hideControls
        handlersRef={handlersRef}
      />
      <ActionIcon
        variant="default"
        radius="xl"
        mb="0.28125rem"
        onClick={() => handlersRef.current?.increment()}
      >
        {t("plus")}
      </ActionIcon>
    </Flex>
  );
};

function useNumberInputWithHandlers({ name, ...restProps }: Props) {
  const t = useTranslations("symbol");
  const handlersRef = useRef<NumberInputHandlers>();

  return { t, name, restProps, handlersRef };
}
