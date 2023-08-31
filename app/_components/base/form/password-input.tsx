"use client";

import { FC } from "react";
import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { useController } from "react-hook-form";

type Props = PasswordInputProps & {
  name: string;
};

export const FormPasswordInput: FC<Props> = (props) => {
  const { field, error, restProps } = useFormPasswordInput(props);

  return <PasswordInput {...field} error={error?.message} {...restProps} />;
};

function useFormPasswordInput({ name, ...restProps }: Props) {
  const { field, fieldState } = useController({ name });
  const error = fieldState.error;

  return { field, error, restProps };
}
