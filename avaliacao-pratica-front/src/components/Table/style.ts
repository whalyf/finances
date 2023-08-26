import styled from "styled-components";

interface TableRowProps {
  isEven: boolean;
}

export const WrapperTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid black;
  margin: auto;
`;

export const TableHeader = styled.th`
  padding: 8px;
  border-right: 2px solid black;
`;

export const TableRow = styled.tr<TableRowProps>`
  background-color: ${(props) => (props.isEven ? "#f2f2f2" : "transparent")};
`;

export const TableCell = styled.td`
  padding: 8px;
  border-right: 2px solid black;

  > button {
    border: none;
    cursor: pointer;
    background: transparent;
    > svg {
      width: 1rem;
      height: 1rem;
    }
    &:hover {
      opacity: 0.8;
    }
  }
`;
