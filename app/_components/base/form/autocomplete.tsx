import { Autocomplete, AutocompleteProps } from "@mantine/core";
import { FC } from "react";
import { useController } from "react-hook-form";

type Props = AutocompleteProps & {
  name: string;
};
export type FormAutocompleteProps = Props;

export const FormAutocomplete: FC<Props> = (props) => {
  const { field, error, restProps } = useFormAutocomplete(props);

  return <Autocomplete {...field} error={error?.message} {...restProps} />;
};

function useFormAutocomplete({ name, ...restProps }: Props) {
  const { field, fieldState } = useController({ name });
  const error = fieldState.error;

  return { field, error, restProps };
}
