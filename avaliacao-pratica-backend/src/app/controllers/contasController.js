import ContasService from "../services/contasService";

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
    console.log(cpf);
    res.status(200).json(result);
  }

  async saveContaData(req, res) {
    const data = req.body;

    const service = new ContasService();
    const contaAlreadyExists = await service.catchConta(data.accountNumber);
    if (!Boolean(contaAlreadyExists.length)) {
      const result = await service.insertConta(data);

      res.status(200).json({ result });
    } else {
      res.status(400).json({ message: "Conta already exists" });
    }
  }

  async removeConta(req, res) {
    const accountNumber = req.params.accountNumber;
    const service = new ContasService();
    try {
      const result = await service.deleteContaByAccountNumber(
        Number(accountNumber)
      );

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Conta deleted successfully" });
      } else {
        res.status(404).json({ message: "Conta not found" });
      }
    } catch (error) {
      console.error("Error deleting conta:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ContasController();
