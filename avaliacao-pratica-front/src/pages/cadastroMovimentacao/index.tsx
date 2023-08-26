import React, { useState } from "react";
import { useForm } from "react-hook-form";
// COMPONENTS
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
// TYPES
import { IAccountData } from "../../types/types";

// STYLES
import { UserInputs, WrapperHome } from "./style";

export function CadastroMovimentacao() {
  const { register, handleSubmit } = useForm<IAccountData>();
  const [loading, setLoading] = useState(false);

  const submit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <WrapperHome>
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
    </WrapperHome>
  );
}
