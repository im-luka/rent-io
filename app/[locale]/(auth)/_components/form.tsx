import { createStyles, rem } from "@mantine/core";
import { ComponentProps, FC, ReactNode } from "react";

type Props = ComponentProps<"form"> & {
  children: ReactNode;
};

export const AuthForm: FC<Props> = ({ children, ...restProps }) => {
  const { classes } = useAuthForm();

  return (
    <form className={classes.form} {...restProps}>
      {children}
    </form>
  );
};

function useAuthForm() {
  const { classes } = useStyles();

  return { classes };
}

const useStyles = createStyles((theme) => ({
  form: {
    minWidth: rem(350),
    [theme.fn.smallerThan("xs")]: {
      minWidth: "100%",
    },
  },
}));
