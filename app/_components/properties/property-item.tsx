import { FC } from "react";
import { Property } from "@/types/property";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  createStyles,
  rem,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useIntl } from "@/hooks/use-intl";
import { generateLocaleTranslation } from "@/utils/objects";
import { useCountries } from "@/hooks/use-countries";
import { Typography } from "../base/typography";
import { Category } from "@prisma/client";
import { IconHeart } from "@tabler/icons-react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { OPTIMAL_IMAGE_SIZES } from "@/utils/constants";

type Props = {
  item: Property;
};

export const PropertyItem: FC<Props> = (props) => {
  const {
    t,
    classes,
    locale,
    name,
    description,
    imageSrc,
    country,
    categories,
  } = usePropertyItem(props);

  const renderCategory = (category: Category) => (
    <Badge key={category.id} size="sm" leftSection={category.emoji}>
      {generateLocaleTranslation(category.name, locale)}
    </Badge>
  );

  return (
    <Grid.Col span={4}>
      <Card h="100%" radius="md" withBorder className={classes.card}>
        <Card.Section>
          <Box pos="relative" h={200}>
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes={OPTIMAL_IMAGE_SIZES}
              priority
              className={classes.image}
            />
          </Box>
          <Box p="md">
            <Group position="apart" spacing="xs">
              <Typography size="lg" fw={600}>
                {name}
              </Typography>
              <Badge size="sm" variant="filled">
                {country}
              </Badge>
            </Group>
            <Typography size="sm" mt="xs">
              {description}
            </Typography>
          </Box>
        </Card.Section>
        <Card.Section>
          <Box p="md" className={classes.categoriesBlock}>
            <Typography size="xs" transform="uppercase" fw={700} c="gray.6">
              {t("categoriesLabel")}
            </Typography>
            <Group mt="xs" spacing="xs">
              {categories?.map(renderCategory)}
            </Group>
          </Box>
          <Group py="sm" px="xs">
            <Button radius="md" className="flex-1">
              {t("showDetailsAction")}
            </Button>
            <ActionIcon variant="default" radius="md" size={40}>
              <IconHeart size={24} color="red" />
            </ActionIcon>
          </Group>
        </Card.Section>
      </Card>
    </Grid.Col>
  );
};

function usePropertyItem({
  item: { name, description, imageSrc, address, categories },
}: Props) {
  const t = useTranslations("home.properties.item");
  const [{ isDarkTheme }] = useColorScheme();
  const { classes } = useStyles(isDarkTheme);
  const { locale } = useIntl();
  const [, { getCountry }] = useCountries();

  return {
    t,
    classes,
    locale,
    name: generateLocaleTranslation(name, locale),
    description: generateLocaleTranslation(description, locale),
    imageSrc,
    country: getCountry(address.country)?.name,
    categories,
  };
}

const useStyles = createStyles((theme, isDarkTheme: boolean) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: isDarkTheme ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  image: {
    objectFit: "cover",
  },

  categoriesBlock: {
    borderBlock: `${rem(1)} solid ${
      isDarkTheme ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));
