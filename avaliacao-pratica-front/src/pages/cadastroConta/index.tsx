import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// COMPONENTS
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Header } from "../../components/Header";
import { SelectPessoa } from "../../components/Selects/SelectPessoa";
// TYPES
import { IAccountData, IUserData } from "../../types/types";

//UTILS
import { cpfToNumber, separateNameAndNumbers } from "../../utils/validations";
//HOOKS
import { usePCM } from "../../hooks/usePCM";
// STYLES
import { UserInputs, WrapperConta } from "./style";

import api from "../../tools/api";

export function CadastroConta() {
  const { fetchContas, fetchPessoas, pessoas, contas, loading } = usePCM();
  const { register, handleSubmit } = useForm<IAccountData>();

  const submit = handleSubmit(async (data) => {
    const split = await separateNameAndNumbers(data.nomeCpf);
    if (split) {
      await api.post("/contas", {
        accountNumber: cpfToNumber(data.accountNumber.toString()),
        nome: split.name,
        cpf: split.numbers,
        saldo: 0,
      });
    }
    fetchContas();
  });

  useEffect(() => {
    fetchPessoas();
    fetchContas();
  }, []);

  const removerConta = useCallback(async (id: number | string) => {
    await api.delete(`/contas/${id}`);
    fetchContas();
  }, []);
  const editarConta = useCallback((id) => {}, []);
  return (
    <WrapperConta>
      <Header />
      <Title text="Cadastro de Conta" />
      <form onSubmit={submit}>
        <UserInputs>
          <SelectPessoa
            options={pessoas}
            fieldName="Pessoa"
            {...register("nomeCpf", { required: true })}
          />
          <Input
            fieldName="Número da conta"
            {...register("accountNumber", { required: true })}
            type="number"
          />
        </UserInputs>
        <Button text="Salvar" type="submit" />
      </form>
      {contas.length > 0 && !loading && (
        <Table
          page="contas"
          content={contas}
          handleEdit={editarConta}
          handleRemove={removerConta}
        />
      )}
    </WrapperConta>
  );
}
