"use client";

import { FC } from "react";
import { useController } from "react-hook-form";
import { Select, SelectProps } from "@mantine/core";

type Props = SelectProps & {
  name: string;
};

export const FormSelect: FC<Props> = (props) => {
  const { field, error, restProps } = useFormSelect(props);

  return <Select {...field} error={error?.message} {...restProps} />;
};

function useFormSelect({ name, ...restProps }: Props) {
  const { field, fieldState } = useController({ name });
  const error = fieldState.error;

  return { field, error, restProps };
}
