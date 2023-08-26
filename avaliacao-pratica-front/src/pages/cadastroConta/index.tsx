import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// COMPONENTS
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
// TYPES
import { IAccountData } from "../../types/types";

// STYLES
import { UserInputs, WrapperConta } from "./style";
import { Table } from "../../components/Table";
import { Header } from "../../components/Header";

export function CadastroConta() {
  const { register, handleSubmit } = useForm<IAccountData>();
  const [loading, setLoading] = useState(false);
  const [contas, setContas] = useState<IAccountData[]>([]);

  const submit = handleSubmit((data) => {
    console.log(data);
  });

  useEffect(() => {
    setLoading(true);
    // REQUEST TO GET ALL ACCOUNTS

    setContas([
      {
        accountNumber: 1231312,
        cpf: 1231123,
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <WrapperConta>
      <Header />
      <Title text="Cadastro de Conta" />
      <form onSubmit={submit}>
        <UserInputs>
          <Input fieldName="Pessoa" {...register("cpf", { required: true })} />
          <Input
            fieldName="Número da conta"
            {...register("accountNumber", { required: true })}
          />
        </UserInputs>
        <Button text="Salvar" type="submit" />
      </form>
      {contas.length > 0 && !loading && (
        <Table page="contas" content={contas} />
      )}
    </WrapperConta>
  );
}
