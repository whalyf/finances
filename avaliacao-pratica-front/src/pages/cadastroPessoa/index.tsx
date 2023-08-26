import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// COMPONENTS
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Header } from "../../components/Header";
import { Modal } from "../../components/ModalEdit";

// UTILS
import { cpfToNumber } from "../../utils/validations";
import api from "../../tools/api";

// TYPES
import { IUserData } from "../../types/types";

// STYLES
import { UserInputs, WrapperUser } from "./style";

export function CadastroPessoa() {
  const { register, handleSubmit } = useForm<IUserData>();
  const [loading, setLoading] = useState(false);
  const [pessoas, setPessoas] = useState<IUserData[]>([]);
  const [openCloseModal, setOpenCloseModal] = useState(true);

  const handleModal = useCallback(() => {
    setOpenCloseModal(!openCloseModal);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setPessoas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = handleSubmit(async (data) => {
    await api.post("/users", {
      ...data,
      cpf: cpfToNumber(data.cpf.toString()),
    });
    fetchData();
  });

  useEffect(() => {
    fetchData();
  }, []);

  const removerPessoa = useCallback(async (cpf: string) => {
    await api.delete(`/users/${cpf}`);
  }, []);

  const editarPessoa = useCallback(async (cpf: string | number) => {}, []);

  return (
    <WrapperUser>
      <Header />
      <Title text="Cadastro de Pessoa" />
      <form onSubmit={submit}>
        <UserInputs>
          <Input fieldName="Nome" {...register("nome", { required: true })} />
          <Input fieldName="CPF" {...register("cpf", { required: true })} />
          <Input
            fieldName="Endereço"
            {...register("endereco", { required: true })}
          />
        </UserInputs>
        <Button text="Salvar" type="submit" />
      </form>
      {pessoas.length > 0 && !loading && (
        <Table
          page="pessoas"
          content={pessoas}
          handleRemove={removerPessoa}
          handleEdit={editarPessoa}
        />
      )}
    </WrapperUser>
  );
}
