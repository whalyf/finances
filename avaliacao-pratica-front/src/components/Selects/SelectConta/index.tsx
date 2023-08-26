import React from "react";
import { WrapperSelect } from "./style";
import {
  IAccountData,
  ITransactionData,
  IUserData,
} from "../../../types/types";
import { formatCPF, formatToMonetary } from "../../../utils/validations";

type SelectData = IUserData[] | IAccountData[] | ITransactionData[];
interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectData;
  fieldName: string;
}

export const SelectConta = React.forwardRef<HTMLSelectElement, ISelectProps>(
  ({ options, fieldName, ...rest }, ref) => {
    return (
      <WrapperSelect>
        <span>{fieldName}:</span>
        <select ref={ref} {...rest}>
          {options.map((item, index) => (
            <option
              key={index}
            >{`${item.accountNumber} - Saldo: ${formatToMonetary(item.saldo)}`}</option>
          ))}
        </select>
      </WrapperSelect>
    );
  }
);
