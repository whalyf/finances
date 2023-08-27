import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { WrapperInput } from "./style";
import {
  handleCPFInputChange,
  handleNameInputChange,
} from "../../utils/validations";

interface IInputProps {
  fieldName: string;
  type?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { fieldName, type, ...rest },
  ref
) => {
  const [text, setText] = useState();

  const convertName = useCallback((nameFullyCapitalized) => {
    setText(nameFullyCapitalized);
  }, []);

  return (
    <WrapperInput>
      <span>{fieldName}:</span>
      {fieldName === "CPF" && (
        <input
          {...rest}
          ref={ref}
          onChange={handleCPFInputChange}
          maxLength={14}
        />
      )}
      {fieldName === "Nome" && (
        <input
          {...rest}
          ref={ref}
          type="text"
          value={text}
          onChange={(e) => convertName(handleNameInputChange(e))}
        />
      )}
      {fieldName !== "CPF" && fieldName !== "Nome" && (
        <input {...rest} type={type} ref={ref} min={0} />
      )}
    </WrapperInput>
  );
};

export const Input = forwardRef(InputBase);
