import ContasService from "../services/contasService";
import MovimentacoesService from "../services/movimentacoesService";

class MovimentacoesController {
  async getMovimentacoesWhere(req, res) {
    const service = new MovimentacoesService();
    const accountNumber = req.body.accountNumber;

    const result = await service.catchMovimentacoesWhere(accountNumber);
    res.status(200).json(result);
  }

  async saveMovimentacaoData(req, res) {
    const data = req.body;

    const service = new MovimentacoesService();
    const serviceConta = new ContasService();

    const conta = await serviceConta.catchConta(data.accountNumber);

    if (data.value >= 0) {
      const result = await service.insertMovimentacao(data);
      res.status(200).json({ message: "Transação realizada com sucesso" });
    } else if (conta[0].saldo >= Math.abs(data.value)) {
      const result = await service.insertMovimentacao(data);
      res.status(200).json({ message: "Transação realizada com sucesso" });
    } else {
      res.status(270).json({ message: "Saldo Insuficiente" });
    }
  }
}

export default new MovimentacoesController();
