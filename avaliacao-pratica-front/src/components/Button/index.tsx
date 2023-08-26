import React, { forwardRef } from "react";
import { WrapperButton } from "./style";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ text, ...rest }: IButtonProps, ref) => {
    return (
      <WrapperButton ref={ref} {...rest}>
        {text}
      </WrapperButton>
    );
  }
);
