const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let _config = null;
class Helper {
  constructor({ config }) {
    _config = config;
  }
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign({ id: id }, _config.SECRET_KEY);
    console.log(token);
    return token;
  }
}
module.exports = Helper;
