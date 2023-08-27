import React from "react";
import { ModalTitle, WrapperModal } from "./style";
import { Button } from "../Button";
// TYPES
import { IUserData } from "../../types/types";
import { useForm } from "react-hook-form";
interface IModalProps {
  handleOpenCloseModal: (person: IUserData | null) => void;
  itemToEdit: IUserData;
  handleEdit: (person: IUserData) => void;
}
export const ModalEdit = ({
  handleOpenCloseModal,
  handleEdit,
  itemToEdit,
}: IModalProps) => {
  const { register, handleSubmit } = useForm();
  const submit = handleSubmit(async (data) => {
    handleEdit({
      cpf: itemToEdit.cpf,
      nome: data.novoNome,
      endereco: data.novoEndereco,
    });
  });
  return (
    <WrapperModal>
      <ModalTitle>Edit</ModalTitle>
      <form onSubmit={submit}>
        <input
          type="text"
          defaultValue={itemToEdit.nome}
          {...register("novoNome")}
        />
        <input
          type="text"
          defaultValue={itemToEdit.endereco}
          {...register("novoEndereco")}
        />
        <div>
          <Button text="Edit" type="submit" />
          <Button text="Cancel" onClick={() => handleOpenCloseModal(null)} />
        </div>
      </form>
    </WrapperModal>
  );
};
