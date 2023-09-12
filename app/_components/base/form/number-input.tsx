"use client";

import { FC } from "react";
import { useController } from "react-hook-form";
import { NumberInput, NumberInputProps } from "@mantine/core";

type Props = NumberInputProps & {
  name: string;
};

export const FormNumberInput: FC<Props> = (props) => {
  const { field, error, restProps } = useFormNumberInput(props);

  return (
    <NumberInput {...field} error={error?.message} min={0} {...restProps} />
  );
};

function useFormNumberInput({ name, ...restProps }: Props) {
  const { field, fieldState } = useController({ name });
  const error = fieldState.error;

  return { field, error, restProps };
}
