import { Routes, Route } from "react-router-dom";
import { CadastroPessoa } from "./pages/cadastroPessoa";
import { CadastroConta } from "./pages/cadastroConta";
import { CadastroMovimentacao } from "./pages/cadastroMovimentacao";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<CadastroPessoa />}></Route>
      <Route path="/contas" element={<CadastroConta />}></Route>
      <Route path="/movimentacoes" element={<CadastroMovimentacao />}></Route>
    </Routes>
  );
}
