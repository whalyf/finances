export interface IUserData {
  nome: string;
  cpf: number;
  endereco: string;
}

export interface IAccountData {
  accountNumber: number;
  cpf: IUserData["cpf"];
}

export interface ITransactionData {
  account: IAccountData["accountNumber"];
  cpf: IUserData["cpf"];
  value: number;
  type: "deposit" | "withdraw";
}
