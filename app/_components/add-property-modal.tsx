import { FC } from "react";
import { Modal } from "@mantine/core";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const AddPropertyModal: FC<Props> = (props) => {
  const { opened, onClose } = useAddPropertyModal(props);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add Property Modal"
      centered
    />
  );
};

function useAddPropertyModal({ opened, onClose }: Props) {
  return { opened, onClose };
}
