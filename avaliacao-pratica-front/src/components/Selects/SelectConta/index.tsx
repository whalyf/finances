import React from "react";
import { WrapperSelect } from "./style";
import {
  IAccountData,
  ITransactionData,
  IUserData,
} from "../../../types/types";
import { formatToMonetary } from "../../../utils/validations";

type SelectData = IUserData[] | IAccountData[] | ITransactionData[];
interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectData;
  fieldName: string;
  handleLoadMovimentacoes: (accountNumber: number) => void;
  contaCallback: (accountNumber: number) => void;
}

export const SelectConta = React.forwardRef<HTMLSelectElement, ISelectProps>(
  (
    { options, fieldName, handleLoadMovimentacoes, contaCallback, ...rest },
    ref
  ) => {
    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const selectedAccountNumber = parseInt(event.target.value, 10);
      handleLoadMovimentacoes(selectedAccountNumber);
      contaCallback(selectedAccountNumber);
    };
    return (
      <WrapperSelect>
        <span>{fieldName}:</span>
        <select
          ref={ref}
          {...rest}
          defaultValue="default"
          onChange={handleSelectChange}
        >
          <option value="default" disabled>
            Selecione uma conta
          </option>
          {options.map((item, index) => (
            <option key={index}>{`${
              item.accountNumber
            } - Saldo: ${formatToMonetary(item.saldo)}`}</option>
          ))}
        </select>
      </WrapperSelect>
    );
  }
);
