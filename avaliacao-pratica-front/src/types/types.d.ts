export interface IUserData {
  nome: string;
  cpf: number;
  endereco: string;
}

export interface IAccountData {
  accountNumber: number;
  nomeCpf: `${IUserData["cpf"]} - ${IUserData["cpf"]}`;
  saldo: number;
}

export interface ITransactionData {
  accountNumberSaldo: `${IAccountData["accountNumber"]} - ${IAccountData["saldo"]}`;
  nomeCpf: `${IUserData["cpf"]} - ${IUserData["cpf"]}`;
  value: number;
  kind: "deposit" | "withdraw";
}
