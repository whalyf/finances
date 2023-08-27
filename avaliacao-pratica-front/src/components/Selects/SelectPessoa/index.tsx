import React from "react";
import { WrapperSelect } from "./style";
import {
  IAccountData,
  ITransactionData,
  IUserData,
} from "../../../types/types";
import { formatCPF } from "../../../utils/validations";

type SelectData = IUserData[] | IAccountData[] | ITransactionData[];
interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectData;
  fieldName: string;
}

export const SelectPessoa = React.forwardRef<HTMLSelectElement, ISelectProps>(
  ({ options, fieldName, ...rest }, ref) => {
    return (
      <WrapperSelect>
        <span>{fieldName}:</span>
        <select ref={ref} {...rest} defaultValue="default">
          <option value="default" disabled>
            Selecione um usuário
          </option>
          {options.map((item, index) => (
            <option key={index}>{`${item.nome} - ${formatCPF(
              item.cpf
            )}`}</option>
          ))}
        </select>
      </WrapperSelect>
    );
  }
);
