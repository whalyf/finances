import React from "react";
import { ModalTitle, WrapperModal } from "./style";
import { Button } from "../Button";
import { usePCM } from "../../hooks/usePCM";
interface IModalProps {
  handleOpenCloseModal: (id: string | number | null) => void;
  handleDelete: (id: string | number) => void;
  itemToManipulate: string | number;
}
export const ModalDelete = ({
  handleOpenCloseModal,
  handleDelete,
  itemToManipulate,
}: IModalProps) => {
  return (
    <WrapperModal>
      <ModalTitle>Delete ?</ModalTitle>
      <div>
        <Button text="Confirm" onClick={() => handleDelete(itemToManipulate)} />
        <Button text="Cancel" onClick={() => handleOpenCloseModal(null)} />
      </div>
    </WrapperModal>
  );
};
