import React from "react";
import { ModalTitle, WrapperModal } from "./style";
import { Button } from "../Button";
interface IModalProps {
  type: "edit" | "delete";
  handleOpenCloseModal: () => void;
  handleDelete: () => void;
}
export const Modal = ({
  type,
  handleOpenCloseModal,
  handleDelete,
}: IModalProps) => {
  return (
    <>
      {type === "delete" ? (
        <WrapperModal>
          <ModalTitle>Delete ?</ModalTitle>
          <div>
            <Button text="Confirm" onClick={handleDelete} />
            <Button text="Cancel" onClick={handleOpenCloseModal} />
          </div>
        </WrapperModal>
      ) : (
        <WrapperModal>EDIT</WrapperModal>
      )}
    </>
  );
};
