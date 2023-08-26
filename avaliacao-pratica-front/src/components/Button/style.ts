import { styled } from "styled-components";

export const WrapperButton = styled.button`
  width: 70px;
  height: 1.5rem;
  background-color: transparent;
  border: 2px solid black;
  box-shadow: 2px 2px 2px 1px black;

  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
