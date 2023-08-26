import React, { useEffect, useState } from "react";
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

export function CadastroPessoa() {
  const { register, handleSubmit } = useForm<IUserData>();
  const [loading, setLoading] = useState(false);
  const [pessoas, setPessoas] = useState<IUserData[]>([]);

  const submit = handleSubmit(async (data) => {
    console.log(data);
    await api.post("/save", { ...data, cpf: cpfToNumber(data.cpf.toString()) });
  });

  useEffect(() => {
    setLoading(true);
    // REQUEST TO GET ALL ACCOUNTS

    setPessoas([
      {
        nome: "Whalyf",
        cpf: 12345678943,
        endereco: "Rua A",
      },
      {
        nome: "Elis",
        cpf: 12345678944,
        endereco: "Rua A",
      },
    ]);
    setLoading(false);
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
        <Table page="pessoas" content={pessoas} />
      )}
    </WrapperUser>
  );
}
