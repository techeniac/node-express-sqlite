const { AuthService } = require("./../services");

class AuthController {

  async login(req, res, next) {
    try {
      
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      return res.json({ user, token });

    } catch(error) {

      next(error);
      
    }
  }

  async register(req, res, next) {
    try {

      const { username, email, password, info } = req.body;
      const { user, token } = await AuthService.register(username, email, password, info);
      return res.json({ user, token });

    } catch(error) {
      
      next(error);
      
    }
  }
}

module.exports = new AuthController();
