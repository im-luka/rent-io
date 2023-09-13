import { useQuery, useQueryClient } from "@tanstack/react-query";

const MODAL_KEY = "modal";

export type ModalType = "addProperty" | "addCategory";
type ModalObjData = {
  isOpen: Record<ModalType, boolean>;
};
const initialData: ModalObjData = {
  isOpen: {
    addProperty: false,
    addCategory: false,
  },
};

export const useModal = (): [
  obj: ModalObjData,
  fnc: { open: (type: ModalType) => void; close: () => void }
] => {
  const qc = useQueryClient();

  const { data } = useQuery<ModalObjData>({
    queryKey: [MODAL_KEY],
    queryFn: () => qc.getQueryData([MODAL_KEY]) ?? initialData,
    initialData,
    staleTime: Infinity,
  });

  const open = (type: ModalType) =>
    qc.setQueryData<ModalObjData>([MODAL_KEY], (currState = initialData) => ({
      isOpen: {
        ...currState?.isOpen,
        [type as unknown as string]: true,
      },
    }));

  const close = () =>
    qc.setQueryData<ModalObjData>([MODAL_KEY], () => initialData);

  return [data, { open, close }];
};
