import {
  UseSessionOptions,
  useSession as useSessionHook,
} from "next-auth/react";

export const useSession = (
  options?: UseSessionOptions<boolean> | undefined
) => {
  const { data: session, status, update } = useSessionHook(options);
  const isAuthenticated = !!session?.user;

  return { session, status, update, isAuthenticated };
};
