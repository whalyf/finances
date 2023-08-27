import React, { useCallback, useState } from "react";
import { FaTrashAlt, FaPencilAlt, FaCheck } from "react-icons/fa";

// TYPES
import { IAccountData, ITransactionData, IUserData } from "../../types/types";
// STYLES
import { TableCell, TableHeader, TableRow, WrapperTable } from "./style";
import {
  formatCPF,
  formatDate,
  formatToMonetary,
} from "../../utils/validations";
import { ModalDelete } from "../ModalDelete";
import { usePCM } from "../../hooks/usePCM";
import { ModalEdit } from "../ModalEdit";
type TableData = IUserData[] | IAccountData[] | ITransactionData[];

interface ITableProps {
  content: TableData;

  page: "contas" | "pessoas" | "movimentacoes";
  handleRemove: (id: string | number) => void;
  handleEdit: (person: IUserData) => void;
}

export const Table: React.FC<ITableProps> = ({
  content,
  page,
  handleRemove,
  handleEdit,
}) => {
  const [itemToManipulate, setItemToManipulate] = useState<
    number | string | null
  >(null);

  const [pessoaToEdit, setPessoaToEdit] = useState<IUserData | null>();

  const handleRender = () => {
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
                    <button onClick={() => setPessoaToEdit(item)}>
                      <FaPencilAlt />
                    </button>
                  </TableCell>

                  <TableCell>
                    <button onClick={() => setItemToManipulate(item.cpf)}>
                      <FaTrashAlt />
                    </button>
                  </TableCell>

                  {!!itemToManipulate && (
                    <ModalDelete
                      handleOpenCloseModal={setItemToManipulate}
                      itemToManipulate={itemToManipulate}
                      handleDelete={handleRemove}
                    />
                  )}
                  {!!pessoaToEdit && (
                    <ModalEdit
                      itemToEdit={pessoaToEdit}
                      handleOpenCloseModal={setPessoaToEdit}
                      handleEdit={handleEdit}
                    />
                  )}
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
                {/* <TableHeader>Editar</TableHeader> */}
                <TableHeader>Remover</TableHeader>
              </tr>
            </thead>
            <tbody>
              {content.map((item, index) => (
                <TableRow
                  key={`${item.cpf} - ${item.accountNumber}`}
                  isEven={index % 2 === 0}
                >
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{formatCPF(item.cpf)}</TableCell>
                  <TableCell>{item.accountNumber}</TableCell>
                  {/* <TableCell>
                    <button
                      onClick={() => {
                        if (typeof handleEdit === "function") {
                          handleEdit(item.cpf);
                        }
                      }}
                    >
                      <FaPencilAlt />
                    </button>
                  </TableCell> */}
                  <TableCell>
                    <button
                      onClick={() => setItemToManipulate(item.accountNumber)}
                    >
                      <FaTrashAlt />
                    </button>
                  </TableCell>
                  {!!itemToManipulate && (
                    <ModalDelete
                      handleOpenCloseModal={setItemToManipulate}
                      itemToManipulate={itemToManipulate}
                      handleDelete={handleRemove}
                    />
                  )}
                </TableRow>
              ))}
            </tbody>
          </>
        );

      case "movimentacoes":
        return (
          <>
            <thead>
              <tr>
                <TableHeader>Data</TableHeader>
                <TableHeader>Valor</TableHeader>
              </tr>
            </thead>
            <tbody>
              {content.map((item, index) => (
                <TableRow key={item.date} isNegative={item.value < 0}>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell>{formatToMonetary(item.value)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </>
        );
    }
  };
  return <WrapperTable>{handleRender()}</WrapperTable>;
};
