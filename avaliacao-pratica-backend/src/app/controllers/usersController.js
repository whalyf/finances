import ContasService from "../services/contasService";
import UsersService from "../services/usersService";

class UsersController {
  async helloWorld(req, res) {
    return res.status(200).json({ example: "Hello World" });
  }

  async getUsersData(req, res) {
    const service = new UsersService();

    const result = await service.catchUsersData();
    res.status(200).json(result);
  }

  async saveUserData(req, res) {
    const data = req.body;

    const service = new UsersService();
    const userAlreadyExists = await service.catchUserByCPF(data.cpf);
    if (!Boolean(userAlreadyExists.length)) {
      const result = await service.insertUserData(data);

      res.status(200).json({ message: "User created" });
    } else {
      res.status(270).json({ message: "User already exists" });
    }
  }

  async removeUser(req, res) {
    const cpf = req.params.cpf;
    const serviceU = new UsersService();
    const serviceC = new ContasService();
    try {
      const isThereAnyConta = await serviceC.catchContasWhere(Number(cpf));
      if (isThereAnyConta.length > 0) {
        res.status(270).json({
          message: "Usuário já possui contas vinculadas",
        });
      } else {
        const result = await serviceU.deleteUserByCPF(Number(cpf));

        if (result.deletedCount === 1) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    } catch (error) {
      console.error("Error deleting user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    const data = req.body;
    const cpf = req.params.cpf;
    
    const service = new UsersService();
    await service.updateUserByCPF(Number(cpf), data);

    res.status(200).json({ message: "User updated" });
  }
}

export default new UsersController();
