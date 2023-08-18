import { Link } from "@/app/_components/base/link";
import { Typography } from "@/app/_components/base/typography";
import { paths } from "@/navigation/paths";
import { Stack, useMantineTheme } from "@mantine/core";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const RegisterSuccess: FC = () => {
  const { t, colors } = useRegisterSuccess();

  return (
    <Stack align="center" spacing="lg">
      <IconCircleCheckFilled size={48} style={{ color: colors.green[5] }} />
      <Stack spacing="sm">
        <Typography component="h2" ta="center">
          {t("title")}
        </Typography>
        <Typography ta="center">{t("description")}</Typography>
      </Stack>
      <Typography size="md" ta="center">
        {t.rich("loginLink", {
          l: (chunk) => (
            <Link href={paths.home()} color={colors.blue[5]} underline>
              {chunk}
            </Link>
          ),
        })}
      </Typography>
    </Stack>
  );
};

function useRegisterSuccess() {
  const t = useTranslations("auth.register.success");
  const { colors } = useMantineTheme();

  return { t, colors };
}
