import { styled } from "styled-components";

export const WrapperSelect = styled.div`
  display: flex;
  gap: 20px;
  > span {
    text-wrap: nowrap;
  }

  > select {
    border: 2px solid black;
    height: 1.5rem;
    display: flex;
    width: 100%;
  }
`;
