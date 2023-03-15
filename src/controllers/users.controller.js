const { UsersService } = require("../services");

class UsersController {
    
  async get(req, res) {
    const users = await UsersService.getUsers();
    return res.json(users);
  }

  async getAll(req, res) {
    const users = await UsersService.getAllUsers();
    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    return res.json(user);
  }

  async store(req, res, next) {
    try {

      const { username, email, password, info } = req.body;
      const user = await UsersService.createUser({
        username,
        email,
        password,
        info,
      });
      return res.json(user);

    } catch(error) {
      next(error);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { username, email, info } = req.body;

    if (req.userData.userId !== parseInt(id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await UsersService.updateUser(id, {
      username,
      email,
      info,
    });
    return res.json(user);
  }

  async softDelete(req, res) {
    const { id } = req.params;
    const user = await UsersService.softDeleteUser(id);
    return res.json(user);
  }

  async restore(req, res) {
    const { id } = req.params;
    const user = await UsersService.restoreUser(id);
    return res.json(user);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const user = await UsersService.deleteUser(id);
    res.json(user);
  }
}

module.exports = new UsersController();
