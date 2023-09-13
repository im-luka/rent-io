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
    imageUrl,
    setImageUrl,
    isSubmitted,
    handlePrevButton,
    handleSubmit,
  } = usePropertyStepFiveImage(props);

  return (
    <form onSubmit={handleSubmit}>
      {imageUrl ? (
        <Box w="100%" pos="relative" h={250}>
          <ActionIcon
            variant="subtle"
            size="lg"
            m={4}
            pos="absolute"
            right={0}
            bottom={0}
            radius="100%"
            className="z-index-1"
            onClick={() => setImageUrl("")}
          >
            <Tooltip label={t("home.propertyModal.image.tooltip")}>
              <IconTrash size={28} color={theme.colors.red[6]} />
            </Tooltip>
          </ActionIcon>
          <Image
            src={imageUrl}
            alt={props.formState.baseInfo.name}
            fill
            className={classes.image}
          />
        </Box>
      ) : (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          onDrop={(files) => setImageUrl(URL.createObjectURL(files[0]))}
        >
          <Group position="center">
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
      {!imageUrl && isSubmitted && (
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
  const [imageUrl, setImageUrl] = useState(formState.image);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (imageUrl) {
      dispatch({ type: StepType.NEXT, payload: { image: imageUrl } });
      setIsSubmitted(false);
    }
  };

  return {
    t,
    classes,
    theme,
    imageUrl,
    setImageUrl,
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
