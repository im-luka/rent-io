"use client";

import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Box, Card, Group, Stack, createStyles } from "@mantine/core";
import { PROFILE_PHOTO_PLACEHOLDER } from "@/utils/constants";
import { User } from "@/types/user";
import { Typography } from "../base/typography";
import {
  ProfileCardSection,
  ProfileCardSectionOption,
} from "./profile-card-section";
import { getFirstName } from "@/utils/user";

type Props = {
  user: User | undefined;
};

export const ProfileCard: FC<Props> = (props) => {
  const {
    t,
    classes,
    user,
    baseInfoOptions,
    statsOptions,
    confirmedInfoOptions,
  } = useProfileCard(props);

  return (
    <Card shadow="lg" radius="md" withBorder sx={{ alignSelf: "center" }}>
      <Group h="100%" spacing="xl">
        <Box m="sm">
          <Image
            src={user?.image ?? PROFILE_PHOTO_PLACEHOLDER}
            width={250}
            height={250}
            alt={user?.name ?? t("photoPlaceholder")}
            className={classes.image}
          />
        </Box>
        <Stack h="100%" p="md" spacing="lg" sx={{ flexGrow: 1 }}>
          <Typography component="h1">
            {t.rich("title", {
              name: user?.firstName ?? getFirstName(user?.name),
              s: (chunk) => (
                <Typography component="span" color="indigo.5">
                  {chunk}
                </Typography>
              ),
            })}
          </Typography>
          <Group spacing="xl" mt="md">
            <ProfileCardSection
              title={t("baseInfo")}
              options={baseInfoOptions}
            />
            <ProfileCardSection title={t("stats")} options={statsOptions} />
            <ProfileCardSection
              title={
                t.rich("userConfirmedInfo", {
                  name: user?.firstName ?? getFirstName(user?.name),
                }) as string
              }
              options={confirmedInfoOptions}
            />
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};

function useProfileCard({ user }: Props) {
  const t = useTranslations("user.profileCard");
  const { classes } = useStyles();

  const reviewsReceivedCount = user?.properties.reduce(
    (acc, curr) => acc + (curr.reviews?.length ?? 0),
    0
  );

  const baseInfoOptions: ProfileCardSectionOption[] = [
    { label: t("name"), value: user?.name },
    { label: t("email"), value: user?.email },
  ];
  const statsOptions: ProfileCardSectionOption[] = [
    { label: t("reviewsGiven"), value: user?.reviews?.length ?? 0 },
    { label: t("reviewsReceived"), value: reviewsReceivedCount },
  ];
  const confirmedInfoOptions: ProfileCardSectionOption[] = [
    { label: t("confirmed"), value: t("identity") },
    { label: t("confirmed"), value: t("emailAddress") },
  ];

  return {
    t,
    classes,
    user,
    baseInfoOptions,
    statsOptions,
    confirmedInfoOptions,
  };
}

const useStyles = createStyles((theme) => ({
  image: {
    objectFit: "cover",
    borderRadius: "100%",
  },
}));
