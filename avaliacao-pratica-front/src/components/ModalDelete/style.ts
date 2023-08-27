import { styled } from "styled-components";

export const WrapperModal = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: #d3d3d3;
  box-shadow: 2px 2px 2px 1px black;
  border-radius: 20px;

  > div {
    display: flex;
    gap: 20px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
`;
