import { FC, useRef, useState } from "react";
import { EMAIL_PROVIDERS } from "@/utils/constants";
import { Loader } from "@mantine/core";
import {
  FormAutocomplete,
  FormAutocompleteProps,
} from "./base/form/autocomplete";
import { Controller } from "react-hook-form";

type Props = Omit<FormAutocompleteProps, "data">;

export const EmailAutocomplete: FC<Props> = (props) => {
  const { value, loading, data, handleChange } = useEmailAutocomplete();

  return (
    <Controller
      name={props.name}
      render={(renderProps) => (
        <FormAutocomplete
          {...props}
          value={value}
          data={data}
          onChange={(value) => {
            renderProps.field.onChange(value);
            handleChange(value);
          }}
          rightSection={loading ? <Loader size="xs" /> : null}
        />
      )}
    />
  );
};

function useEmailAutocomplete() {
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  // 📧 showcase email providers loading
  // TODO: 💡 potential improvement - fetch providers from some API
  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setData([]);
    setValue(val);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(EMAIL_PROVIDERS.map((prov) => `${val}@${prov}`));
      }, 500);
    }
  };

  return { value, loading, data, handleChange };
}
