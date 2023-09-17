import { FC } from "react";
import { Grid, Skeleton, Stack, createStyles } from "@mantine/core";
import { useColorScheme } from "@/hooks/use-color-scheme";

type Props = {
  cardsCount: number;
};

export const SkeletonCards: FC<Props> = (props) => {
  const { cardsCount, classes } = useSkeletonCards(props);

  return (
    <Grid w="100%" m="xs" gutter="lg">
      {[...Array(cardsCount)].map((_, i) => (
        <Grid.Col key={i} span={4} h={450}>
          <Stack align="center" className={classes.wrapper}>
            <Skeleton height="45%" />
            <Skeleton height={40} width="90%" radius="md" />
            <Stack w="100%" align="center" spacing="xs">
              <Skeleton height={10} width="90%" radius="md" />
              <Skeleton height={10} width="90%" radius="md" />
            </Stack>
            <Skeleton height={75} width="90%" radius="md" mt="auto" mb="lg" />
          </Stack>
        </Grid.Col>
      ))}
    </Grid>
  );
};

function useSkeletonCards({ cardsCount }: Props) {
  const [{ isDarkTheme }] = useColorScheme();
  const { classes } = useStyles(isDarkTheme);

  return { cardsCount, classes };
}

const useStyles = createStyles((theme, isDarkTheme: boolean) => ({
  wrapper: {
    height: "100%",
    backgroundColor: isDarkTheme ? theme.colors.dark[4] : theme.colors.gray[1],
  },
}));
