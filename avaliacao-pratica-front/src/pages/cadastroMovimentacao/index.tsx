import React, { useState } from "react";
import { useForm } from "react-hook-form";
// COMPONENTS
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { SelectPessoa } from "../../components/Selects/SelectPessoa";
import { SelectConta } from "../../components/Selects/SelectConta";
//HOOKS
import { usePCM } from "../../hooks/usePCM";
// TYPES
import { ITransactionData } from "../../types/types";

// STYLES
import { UserInputs, WrapperMovimentacao } from "./style";
import { separateNameAndNumbers } from "../../utils/validations";
import { Header } from "../../components/Header";

export function CadastroMovimentacao() {
  const {
    movimentacoes,
    fetchMovimentacoes,
    fetchContaWhere,
    pessoas,
    userContas,
  } = usePCM();
  const { register, handleSubmit } = useForm<ITransactionData>();

  const submit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <WrapperMovimentacao>
      <Header />
      <Title text="Cadastro de Movimentação" />
      <form onSubmit={submit}>
        <UserInputs>
          <SelectPessoa
            options={pessoas}
            fieldName="Pessoa"
            {...register("nomeCpf", { required: true })}
            onChange={(e) => {
              const separetedData = separateNameAndNumbers(e.target.value);
              if (separetedData !== null) {
                fetchContaWhere(separetedData.numbers);
              }
            }}
          />

          {userContas && (
            <SelectConta
              options={userContas}
              fieldName="Número da conta"
              {...register("accountNumberSaldo", { required: true })}
            />
          )}
        </UserInputs>
        <Button text="Salvar" type="submit" />
      </form>
    </WrapperMovimentacao>
  );
}
