"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Box, Group, createStyles } from "@mantine/core";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const LayoutContainer: FC<Props> = ({ children }) => {
  const { t, classes, largeScreen } = useLayoutContainer();

  return (
    <Group h="100%">
      <Box className="flex-1">{children}</Box>
      {largeScreen && (
        <Box className={classes.imgBlock}>
          <Image
            src="/images/auth-cover.jpg"
            alt={t("coverImgAlt")}
            fill
            priority
            className={classes.img}
          />
        </Box>
      )}
    </Group>
  );
};

function useLayoutContainer() {
  const t = useTranslations("auth");
  const { classes } = useStyles();
  const largeScreen = useMediaQuery("md", "largerThan");

  return { t, classes, largeScreen };
}

const useStyles = createStyles((theme) => ({
  imgBlock: {
    position: "relative",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  img: {
    objectFit: "cover",
    objectPosition: "right",
  },
}));
