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
import { SelectKind, UserInputs, WrapperMovimentacao } from "./style";
import {
  separateAccountNumberAndSaldo,
  separateNameAndNumbers,
} from "../../utils/validations";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import api from "../../tools/api";
import { Table } from "../../components/Table";

export function CadastroMovimentacao() {
  const {
    loading,
    fetchMovimentacoes,
    fetchContaWhere,

    movimentacoes,
    pessoas,
    userContas,
  } = usePCM();
  const { register, handleSubmit } = useForm<ITransactionData>();
  const [cpf, setCpf] = useState<number>(0);
  const [accountNumber, setAccountNumber] = useState<number>(0);
  const { toast } = usePCM();

  const submit = handleSubmit(async (data) => {
    const response = await api.post("/movimentacoes", {
      value:
        data.kind === "Depositar" ? Number(data.value) : Number(-data.value),
      date: new Date(),
      accountNumber: separateAccountNumberAndSaldo(data.accountNumberSaldo),
    });
    if (response.status === 270) {
      toast.error(response.data?.message);
    }
    if (response.status === 200) {
      toast.success(response.data?.message);
      await fetchContaWhere(cpf);
      await fetchMovimentacoes(accountNumber);
    }
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
                setCpf(separetedData.numbers);
              }
            }}
          />

          {userContas && userContas.length > 0 && (
            <>
              <SelectConta
                options={userContas}
                fieldName="Número da conta"
                {...register("accountNumberSaldo", { required: true })}
                handleLoadMovimentacoes={fetchMovimentacoes}
                contaCallback={setAccountNumber}
              />

              <Input
                fieldName="Valor"
                type="number"
                {...register("value", { required: true })}
              />
              <SelectKind>
                <span>Depósito/Retirada:</span>
                <select
                  id="kind"
                  defaultValue="default"
                  {...register("kind", { required: true })}
                >
                  <option value="default" disabled>
                    Selecione a transação
                  </option>
                  <option defaultValue="deposit">Depositar</option>
                  <option defaultValue="withdraw">Retirar</option>
                </select>
              </SelectKind>
            </>
          )}
        </UserInputs>
        <Button text="Salvar" type="submit" />
      </form>
      {movimentacoes.length > 0 && !loading && (
        <Table
          page="movimentacoes"
          content={movimentacoes}
          handleRemove={() => {}}
          handleEdit={() => {}}
        />
      )}
    </WrapperMovimentacao>
  );
}
