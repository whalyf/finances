import React, { useCallback } from "react";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

// TYPES
import { IAccountData, ITransactionData, IUserData } from "../../types/types";
// STYLES
import { TableCell, TableHeader, TableRow, WrapperTable } from "./style";
import { formatCPF } from "../../utils/validations";
type TableData = IUserData[] | IAccountData[] | ITransactionData[];

interface ITableProps {
  content: TableData;
  page: "contas" | "pessoas" | "movimentacoes";
}

export const Table: React.FC<ITableProps> = ({ content, page }) => {
  const handleRenderTable = useCallback(() => {
    switch (page) {
      case "pessoas":
        return (
          <>
            <thead>
              <tr>
                <TableHeader>Nome</TableHeader>
                <TableHeader>CPF</TableHeader>
                <TableHeader>Endereco</TableHeader>
                <TableHeader>Editar</TableHeader>
                <TableHeader>Remover</TableHeader>
              </tr>
            </thead>
            <tbody>
              {content.map((item, index) => (
                <TableRow key={item.cpf} isEven={index % 2 === 0}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{formatCPF(item.cpf)}</TableCell>
                  <TableCell>{item.endereco}</TableCell>
                  <TableCell>
                    <button>
                      <FaPencilAlt />
                    </button>
                  </TableCell>
                  <TableCell>
                    <button>
                      <FaTrashAlt />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </>
        );

      case "contas":
        return (
          <>
            <thead>
              <tr>
                <TableHeader>Nome</TableHeader>
                <TableHeader>CPF</TableHeader>
                <TableHeader>Número da conta</TableHeader>
                <TableHeader>Editar</TableHeader>
                <TableHeader>Remover</TableHeader>
              </tr>
            </thead>
            <tbody>
              {content.map((item, index) => (
                <TableRow key={item.cpf} isEven={index % 2 === 0}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                  <TableCell>{item.accountNumber}</TableCell>
                  <TableCell>
                    <button>
                      <FaPencilAlt />
                    </button>
                  </TableCell>
                  <TableCell>
                    <button>
                      <FaTrashAlt />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </>
        );

      // case "movimentacoes":
      // return (
      //   <>
      //     <thead>
      //       <tr>
      //         <TableHeader>Nome</TableHeader>
      //         <TableHeader>CPF</TableHeader>
      //         <TableHeader>Endereco</TableHeader>
      //         <TableHeader>Editar</TableHeader>
      //         <TableHeader>Remover</TableHeader>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {content.map((item, index) => (
      //         <TableRow key={item.cpf} isEven={index % 2 === 0}>
      //           <TableCell>{item.nome}</TableCell>
      //           <TableCell>{item.cpf}</TableCell>
      //           <TableCell>{item.endereco}</TableCell>
      //           <TableCell button>
      //             <button>
      //               <FaPencilAlt />
      //             </button>
      //           </TableCell>
      //           <TableCell>
      //             <button>
      //               <FaTrashAlt />
      //             </button>
      //           </TableCell>
      //         </TableRow>
      //       ))}
      //     </tbody>
      //   </>
      // );
    }
  }, []);
  return <WrapperTable>{handleRenderTable()}</WrapperTable>;
};
