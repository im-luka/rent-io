"use client";

import { Checkbox, CheckboxProps } from "@mantine/core";
import { FC } from "react";
import { useController } from "react-hook-form";

type Props = CheckboxProps & {
  name: string;
};

export const FormCheckbox: FC<Props> = (props) => {
  const { field, error, restProps } = useFormCheckbox(props);

  return (
    <Checkbox
      {...field}
      defaultChecked={field.value}
      error={error?.message}
      {...restProps}
    />
  );
};

function useFormCheckbox({ name, ...restProps }: Props) {
  const { field, fieldState } = useController({ name });
  const error = fieldState.error;

  return { field, error, restProps };
}
