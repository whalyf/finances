import React from 'react';
export const handleCPFInputChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const { value } = event.target;
  const formattedValue = value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

  event.target.value = formattedValue;
};

export function formatCPF(cpf: number): string {
  const cpfString = cpf.toString().padStart(11, "0");
  return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function cpfToNumber(cpf: string): number {
  const cleanedCPF = cpf.replace(/\D/g, "");
  const cpfNumber = parseInt(cleanedCPF);
  return cpfNumber;
}

export const handleNameInputChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const newText = event.target.value
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return newText;
};

export function separateNameAndNumbers(input: string) {
  const regex = /([A-Za-z\s]+) - (\d{3}\.\d{3}\.\d{3}-\d{2})/;
  const match = input.match(regex);

  if (match) {
    const name = match[1];
    const numbers = match[2];
    return {
      name: name.trim(),
      numbers: cpfToNumber(numbers),
    };
  } else {
    return null;
  }
}

export function separateAccountNumberAndSaldo(input: string) {
  const regex = /^(\d+)\s+-\s+Saldo:/;
  const match = input.match(regex);
  if (match) {
    return Number(match[1]);
  }
}

export const formatToMonetary = (number: number) => {
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const formatDate = (date: Date): string => {
  const timestamp = new Date(date);

  const day = timestamp.getDate();
  const month = timestamp.getMonth() + 1; // Months are 0-indexed, so we add 1
  const year = timestamp.getFullYear();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  const formattedTimestamp = `${day < 10 ? "0" : ""}${day}/${
    month < 10 ? "0" : ""
  }${month}/${year} - ${hours}:${minutes}:${seconds}`;

  return formattedTimestamp;
};
