import React from "react";
import { WrapperHeader } from "./style";

export const Header = () => {
  return (
    <WrapperHeader>
      <a href="/">Pessoa</a>|<a href="/contas">Conta</a>|
      <a href="/movimentacoes">Movimentação</a>
    </WrapperHeader>
  );
};
