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
