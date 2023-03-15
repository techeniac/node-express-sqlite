const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const config = require("../config");
const UsersService = require("./users.service");

class AuthService {

  async login(email, password) {
    const user = await UsersService.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = this.signToken({ userId: user.id });

    return { user, token };
  }

  async register(username, email, password, info) {
    const existingUser = await UsersService.getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await UsersService.createUser({
      username,
      email,
      info,
      password,
    });

    const token = this.signToken({ userId: user.id });

    return { user, token };
  }

  signToken(data) {
    const token = jwt.sign(data, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    return token;
  }

}

module.exports = new AuthService();
