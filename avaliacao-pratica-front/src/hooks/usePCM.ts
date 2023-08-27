import { useCallback, useEffect, useState } from "react";
import api from "../tools/api";
import { toast } from "react-toastify";
import { IAccountData, ITransactionData, IUserData } from "../types/types";

export const usePCM = () => {
  const [pessoas, setPessoas] = useState<IUserData[]>([]);
  const [contas, setContas] = useState<IAccountData[]>([]);
  const [userContas, setUserContas] = useState<IAccountData[]>();
  const [movimentacoes, setMovimentacoes] = useState<ITransactionData[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchPessoas = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setPessoas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContas = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contas");
      setContas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContaWhere = async (cpf: number) => {
    setMovimentacoes([]);
    try {
      setLoading(true);
      const response = await api.post(`/getContas`, { cpf: cpf });

      if (response.data.length > 0) {
        setUserContas(response.data);
      } else {
        setUserContas([]);
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovimentacoes = async (accountNumber: number) => {
    try {
      setLoading(true);
      const response = await api.post(`/minhasMovimentacoes`, {
        accountNumber,
      });

      setMovimentacoes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAmbas = async () => {
      const fetchPessoasPromise = fetchPessoas();
      const fetchContasPromise = fetchContas();

      await Promise.all([fetchPessoasPromise, fetchContasPromise]);
    };

    fetchAmbas();
  }, []);

  return {
    pessoas,
    fetchPessoas,

    userContas,
    contas,
    fetchContas,
    fetchContaWhere,

    movimentacoes,
    setMovimentacoes,
    fetchMovimentacoes,

    loading,
    api,

    toast,
  };
};
