import { getClient } from "../../database/initMongoDB";

class MovimentacoesService {
  async insertMovimentacao(data) {
    const client = getClient();
    const collectionM = client
      .db("avaliacao-pratica")
      .collection("movimentacoes");
    const collectionC = client.db("avaliacao-pratica").collection("contas");
    try {
      const result = await collectionM.insertOne(data);
      console.log("movimentação realizada ", result.insertedId);

      await collectionC.updateOne(
        { accountNumber: data.accountNumber },
        { $inc: { saldo: data.value } }
      );
    } catch (error) {
      console.error("Erro ao inserir documento: ", error);
    }
  }

  async catchMovimentacoesWhere(accountNumber) {
    const client = getClient();
    const collection = client
      .db("avaliacao-pratica")
      .collection("movimentacoes");
    try {
      const cursor = collection.find({ accountNumber: accountNumber });
      const result = await cursor.toArray();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

export default MovimentacoesService;
