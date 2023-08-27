import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// COMPONENTS
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Header } from "../../components/Header";

// UTILS
import { cpfToNumber } from "../../utils/validations";
import api from "../../tools/api";

// TYPES
import { IUserData } from "../../types/types";

// STYLES
import { UserInputs, WrapperUser } from "./style";
import { usePCM } from "../../hooks/usePCM";
import { ModalDelete } from "../../components/ModalDelete";

export function CadastroPessoa() {
  const {
    fetchPessoas,
    pessoas,
    loading,

    toast,
  } = usePCM();

  const { register, handleSubmit } = useForm<IUserData>();

  const submit = handleSubmit(async (data) => {
    const result = await api.post("/users", {
      ...data,
      cpf: cpfToNumber(data.cpf.toString()),
    });

    if (result.status === 270) {
      toast.error(result.data?.message);
    }

    if (result.status === 200) {
      toast.success(result.data?.message);
      fetchPessoas();
    }
  });

  const removerPessoa = useCallback(async (cpf: string | number) => {
    const result = await api.delete(`/users/${cpf}`);
    if (result.status === 270) {
      toast.error(result.data?.message);
    }
    if (result.status === 200) {
      toast.success(result.data?.message);
      fetchPessoas();
    }
  }, []);

  const editarPessoa = useCallback(async (person: IUserData) => {
    const result = await api.put(`/users/${person.cpf}`, {
      nome: person.nome,
      endereco: person.endereco,
    });

    if (result.status === 270) {
      toast.error(result.data?.message);
    }
    if (result.status === 200) {
      toast.success(result.data?.message);
      fetchPessoas();
    }
  }, []);

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
          handleEdit={editarPessoa}
          handleRemove={removerPessoa}
        />
      )}
    </WrapperUser>
  );
}
