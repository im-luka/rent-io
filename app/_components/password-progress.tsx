import { FC } from "react";
import {
  Box,
  Group,
  MantineColor,
  PasswordInput,
  PasswordInputProps,
  Portal,
  Progress,
  Stack,
} from "@mantine/core";
import { ZodStringCheck } from "zod";
import { useInputState } from "@mantine/hooks";
import { Controller } from "react-hook-form";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Typography } from "./base/typography";
import { IconCheck, IconX } from "@tabler/icons-react";

type Props = PasswordInputProps & {
  name: string;
  validationChecks: ZodStringCheck[];
};

export const PasswordProgress: FC<Props> = (props) => {
  const {
    validationChecks,
    restProps,
    value,
    setValue,
    getProgressStrength,
    colorProgress,
    isErrorLabel,
  } = usePasswordProgress(props);

  const renderProgressBar = (_: ZodStringCheck, index: number) => (
    <Progress
      key={index}
      h={4}
      value={index + 1 <= getProgressStrength() ? 100 : 0}
      color={colorProgress()}
    />
  );

  const renderErrorLabel = (value: ZodStringCheck, index: number) => (
    <Group key={index} ml="md" spacing="sm">
      {isErrorLabel(value) ? (
        <IconX size={16} color="red" />
      ) : (
        <IconCheck size={16} color="green" />
      )}
      <Typography size="sm" color={isErrorLabel(value) ? "red" : "green"}>
        {value.message}
      </Typography>
    </Group>
  );

  return (
    <>
      <Controller
        name={props.name}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <PasswordInput
                {...field}
                {...restProps}
                value={value}
                onChange={(value) => {
                  field.onChange(value);
                  setValue(value);
                }}
                error={
                  error && (
                    <Portal target="#password-error-block">
                      <Stack spacing={3}>
                        {validationChecks.map(renderErrorLabel)}
                      </Stack>
                    </Portal>
                  )
                }
              />
              <Group spacing="xs" grow>
                {validationChecks.map(renderProgressBar)}
              </Group>
              <Box id="password-error-block" />
            </>
          );
        }}
      />
    </>
  );
};

function usePasswordProgress({ validationChecks, ...restProps }: Props) {
  const [value, setValue] = useInputState("");
  const updatedValidationChecks = validationChecks.slice(1);
  const [{ isDarkTheme }] = useColorScheme();

  const getProgressStrength = () => {
    const [lengthValidation, ...restValidations] = updatedValidationChecks;
    let progressTracks =
      lengthValidation.kind === "min" && value.length >= lengthValidation.value
        ? 1
        : 0;
    restValidations.forEach((val) => {
      if (val.kind === "regex" && val.regex.test(value)) {
        progressTracks += 1;
      }
    });
    return progressTracks;
  };

  const colorProgress = (): MantineColor => {
    const currProgress = getProgressStrength();
    const validationsCount = updatedValidationChecks.length;
    if (currProgress === 0) {
      return isDarkTheme ? "dark.4" : "gray.3";
    }
    if (currProgress === validationsCount) {
      return "green";
    }
    if (currProgress > Math.ceil((validationsCount - 1) / 2)) {
      return "yellow";
    }
    return "red";
  };

  const isErrorLabel = (val: ZodStringCheck) => {
    if (val.kind === "min") {
      return val.value > value.length;
    }
    return val.kind === "regex" && !val.regex.test(value);
  };

  return {
    validationChecks: updatedValidationChecks,
    restProps,
    value,
    setValue,
    getProgressStrength,
    colorProgress,
    isErrorLabel,
  };
}
