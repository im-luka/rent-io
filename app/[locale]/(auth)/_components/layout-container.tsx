"use client";

import { Box, Group, createStyles } from "@mantine/core";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const LayoutContainer: FC<Props> = ({ children }) => {
  const { t, classes } = useLayoutContainer();

  return (
    <Group h="100%">
      <Box className="flex-1">{children}</Box>
      <Box className={classes.imgBlock}>
        <Image
          src="/images/auth-cover.jpg"
          alt={t("coverImgAlt")}
          fill
          objectFit="cover"
          objectPosition="right"
        />
      </Box>
    </Group>
  );
};

function useLayoutContainer() {
  const t = useTranslations("auth");
  const { classes } = useStyles();

  return { t, classes };
}

const useStyles = createStyles((theme) => ({
  imgBlock: {
    position: "relative",
    height: "100%",
    width: "100%",
    flex: 1,
  },
}));
