import { getClient } from "../../database/initMongoDB";

class MovimentacoesService {
  async insertMovimentacao(data) {
    const client = getClient();
    const collection = client
      .db("avaliacao-pratica")
      .collection("movimentacoes");
    try {
      const result = await collection.insertOne(data);
      console.log("dados inseridos ", result.insertedId);
    } catch (error) {
      console.error("Erro ao inserir documento: ", error);
    }
  }

  async catchMovimentacoesData() {
    const client = getClient();
    const collection = client
      .db("avaliacao-pratica")
      .collection("movimentacoes");
    try {
      const cursor = collection.find();
      const result = await cursor.toArray();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async catchConta(accountNumber) {
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

  async deleteContaByAccountNumber(accountNumber) {
    const client = getClient();
    const collection = client
      .db("avaliacao-pratica")
      .collection("movimentacoes");
    try {
      const result = await collection.deleteOne({
        accountNumber: accountNumber,
      });

      return result;
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
}

export default MovimentacoesService;
