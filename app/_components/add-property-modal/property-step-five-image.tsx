"use client";

import { Dispatch, FC, FormEvent, useState } from "react";
import { StepAction, StepForm, StepType } from ".";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  ActionIcon,
  Box,
  Group,
  Stack,
  Tooltip,
  createStyles,
  rem,
} from "@mantine/core";
import { IconPhoto, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { Typography } from "../base/typography";
import Image from "next/image";
import { Actions } from "./actions";
import { useTranslations } from "next-intl";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepFiveImage: FC<Props> = (props) => {
  const {
    t,
    classes,
    theme,
    image,
    setImage,
    isSubmitted,
    handlePrevButton,
    handleSubmit,
  } = usePropertyStepFiveImage(props);

  return (
    <form onSubmit={handleSubmit}>
      {image ? (
        <Box w="100%" pos="relative" h={300}>
          <ActionIcon
            variant="subtle"
            size="lg"
            m={4}
            pos="absolute"
            right={0}
            bottom={0}
            radius="100%"
            className="z-index-1"
            onClick={() => setImage(null)}
          >
            <Tooltip label={t("home.propertyModal.image.tooltip")}>
              <IconTrash size={28} color={theme.colors.red[6]} />
            </Tooltip>
          </ActionIcon>
          <Image
            src={URL.createObjectURL(image)}
            alt={props.formState.baseInfo.name}
            fill
            className={classes.image}
          />
        </Box>
      ) : (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          onDrop={(files) => setImage(files[0])}
        >
          <Group h={rem(100)} position="center" align="center">
            <Dropzone.Accept>
              <IconUpload size={32} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={32} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={32} />
            </Dropzone.Idle>
            <Stack spacing={0}>
              <Typography>
                {t("home.propertyModal.image.dropzoneTitle")}
              </Typography>
              <Typography size="sm" color="gray.7" italic>
                {t("home.propertyModal.image.dropzoneDescription")}
              </Typography>
            </Stack>
          </Group>
        </Dropzone>
      )}
      {!image && isSubmitted && (
        <Typography size="xs" mt="sm" ta="center" color="red.5">
          {t("validation.requiredImage")}
        </Typography>
      )}
      <Actions handlePrevButton={handlePrevButton} />
    </form>
  );
};

function usePropertyStepFiveImage({ formState, dispatch }: Props) {
  const t = useTranslations();
  const { classes, theme } = useStyles();
  const [image, setImage] = useState<File | null>(formState.image);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (image) {
      dispatch({ type: StepType.NEXT, payload: { image } });
      setIsSubmitted(false);
    }
  };

  return {
    t,
    classes,
    theme,
    image,
    setImage,
    isSubmitted,
    handlePrevButton,
    handleSubmit,
  };
}

const useStyles = createStyles((theme) => ({
  image: {
    objectFit: "cover",
  },
}));
