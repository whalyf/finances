import React from "react";
import { ModalTitle, WrapperModal } from "./style";
import { Button } from "../Button";
interface IModalProps {
  handleOpenCloseModal: () => void;
  handleDelete: () => void;
}
export const ModalDelete = ({
  handleOpenCloseModal,
  handleDelete,
}: IModalProps) => {
  return (
    <WrapperModal>
      <ModalTitle>Delete ?</ModalTitle>
      <div>
        <Button text="Confirm" onClick={handleDelete} />
        <Button text="Cancel" onClick={handleOpenCloseModal} />
      </div>
    </WrapperModal>
  );
};
