import { styled } from "styled-components";

export const WrapperMovimentacao = styled.div`
  display: flex;
  flex-direction: column;

  > form {
    display: flex;
    align-items: center;
    width: 500px;
    flex-direction: column;
    gap: 50px;
    margin-bottom: 30px;
  }
`;

export const UserInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SelectKind = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  > select {
    border: 2px solid black;
    height: 1.5rem;
    display: flex;
    width: 100%;
  }
`;
