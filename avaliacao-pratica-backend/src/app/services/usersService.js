import { getClient } from "../../database/initMongoDB";

class UsersService {
  async insertUserData(data) {
    const client = getClient();
    const collection = client.db("avaliacao-pratica").collection("colecao");
    try {
      const result = await collection.insertOne(data);
      console.log("dados inseridos ", result.insertedId);
    } catch (error) {
      console.error("Erro ao inserir documento: ", error);
    }
  }

  async catchUserByCPF(cpf) {
    const client = getClient();
    const collection = client.db("avaliacao-pratica").collection("colecao");
    try {
      const cursor = collection.find({ cpf: cpf });
      const result = await cursor.toArray();

      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async catchUsersData() {
    const client = getClient();
    const collection = client.db("avaliacao-pratica").collection("colecao");
    try {
      const cursor = collection.find();
      const result = await cursor.toArray();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async deleteUserByCPF(cpf) {
    const client = getClient();
    const collection = client.db("avaliacao-pratica").collection("colecao");
    try {
      const result = await collection.deleteOne({ cpf: cpf });

      return result;
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
}

export default UsersService;
