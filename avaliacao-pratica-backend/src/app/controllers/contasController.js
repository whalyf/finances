import ContasService from "../services/contasService";
import MovimentacoesService from "../services/movimentacoesService";

class ContasController {
  async getContasData(req, res) {
    const service = new ContasService();

    const result = await service.catchContasData();
    res.status(200).json(result);
  }

  async getContasWhere(req, res) {
    const cpf = req.body.cpf;
    const service = new ContasService();
    const result = await service.catchContasWhere(cpf);

    res.status(200).json(result);
  }

  async saveContaData(req, res) {
    const data = req.body;

    const service = new ContasService();
    const contaAlreadyExists = await service.catchConta(data.accountNumber);
    if (!Boolean(contaAlreadyExists.length)) {
      await service.insertConta(data);

      res.status(200).json({ message: "Conta Cadastrada" });
    } else {
      res.status(270).json({ message: "Conta already exists" });
    }
  }

  async removeConta(req, res) {
    const accountNumber = req.params.accountNumber;
    const serviceC = new ContasService();
    const serviceM = new MovimentacoesService();
    try {
      const isThereAnyMovimentacao = await serviceM.catchMovimentacoesWhere(
        Number(accountNumber)
      );

      if (isThereAnyMovimentacao.length > 0) {
        res.status(270).json({
          message: "Conta já possui movimentações financeiras vinculadas",
        });
      } else {
        const result = await serviceC.deleteContaByAccountNumber(
          Number(accountNumber)
        );

        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Conta deleted successfully" });
        } else {
          res.status(404).json({ message: "Conta not found" });
        }
      }
    } catch (error) {
      console.error("Error deleting conta:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ContasController();
