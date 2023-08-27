import { styled } from "styled-components";

export const WrapperConta = styled.div`
  display: flex;
  flex-direction: column;

  > form {
    align-items: center;
    display: flex;
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
