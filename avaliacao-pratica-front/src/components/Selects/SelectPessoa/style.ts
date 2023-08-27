import { styled } from "styled-components";

export const WrapperSelect = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: center;

  > select {
    border: 2px solid black;
    height: 1.5rem;
    display: flex;
  }
`;
