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
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { fieldName, ...rest },
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
          ref={ref}
          {...rest}
          onChange={handleCPFInputChange}
          maxLength={14}
        />
      )}
      {fieldName === "Nome" && (
        <input
          ref={ref}
          {...rest}
          type="text"
          value={text}
          onChange={(e) => convertName(handleNameInputChange(e))}
        />
      )}
      {fieldName !== "CPF" && fieldName !== "Nome" && (
        <input ref={ref} {...rest} />
      )}
    </WrapperInput>
  );
};

export const Input = forwardRef(InputBase);
