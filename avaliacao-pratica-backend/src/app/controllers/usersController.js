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

      res.status(200).json({ result });
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  }

  async removeUser(req, res) {
    const cpf = req.params.cpf;
    const service = new UsersService();
    try {
      const result = await service.deleteUserByCPF(Number(cpf));

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new UsersController();
