import { Router } from "express";

import UsersController from "./app/controllers/usersController";
import ContasController from "./app/controllers/contasController";
import MovimentacoesController from "./app/controllers/movimentacoesController";

const routes = new Router();

routes.get("/", UsersController.helloWorld);

// USERS
routes.post("/users", UsersController.saveUserData);
routes.get("/users", UsersController.getUsersData);
routes.delete("/users/:cpf", UsersController.removeUser);
routes.put("/users/:cpf", UsersController.updateUser);

// CONTAS
routes.get("/contas", ContasController.getContasData);
routes.post("/contas", ContasController.saveContaData);
routes.post("/getContas", ContasController.getContasWhere);
routes.delete("/contas/:accountNumber", ContasController.removeConta);

// MOVIMENTACOES
routes.post("/movimentacoes", MovimentacoesController.saveMovimentacaoData);
routes.post(
  "/minhasMovimentacoes",
  MovimentacoesController.getMovimentacoesWhere
);
export default routes;
