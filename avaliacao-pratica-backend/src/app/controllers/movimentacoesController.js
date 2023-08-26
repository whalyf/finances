import MovimentacoesService from "../services/movimentacoesService";

class MovimentacoesController {
  async getMovimentacoesData(req, res) {
    const service = new ContasService();

    const result = await service.catchContasData();
    res.status(200).json(result);
  }

  async saveMovimentacaoData(req, res) {
    const data = req.body;

    const service = new MovimentacoesService();
    const contaAlreadyExists = await service.catchConta(data.accountNumber);
    if (!Boolean(contaAlreadyExists.length)) {
      const result = await service.insertConta(data);

      res.status(200).json({ result });
    } else {
      res.status(400).json({ message: "Conta already exists" });
    }
  }
}

export default new MovimentacoesController();
