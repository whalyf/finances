import { styled } from "styled-components";

export const WrapperHome = styled.div`
  display: flex;
  flex-direction: column;
  
  > form {
    align-items: center;
    display: flex;
    width: 300px;
    flex-direction: column;
    gap: 50px;
  }
`;

export const UserInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  display: flex;

  align-items: flex-end;
`;
