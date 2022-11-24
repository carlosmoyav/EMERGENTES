const jwt = require("jsonwebtoken");
const { Usuarios } = require("../models");
const { mongo } = require("mongoose");

let _config = null;

class VerificarToken {
  constructor({ config }) {
    _config = config;
  }
  async verificar(request, res, next) {
    const token = request.headers["authorization"];
    if (!token) {
      return res.status(400).send({ message: "No se envio el token" });
    }
    try {
      jwt.verify(token, _config.SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log("Invalido");
          return res.status(400).send({ message: "El token es invalido" });
        }

        Usuarios.findOne(
          { _id: mongo.ObjectId(decoded.id) },
          function (err, result) {
            if (err) {
              return res.status(400).send({ message: "Error en la db" });
            }
            if (!result) {
              return res.status(400).send({ message: "El token es invalido" });
            } else {
              request.id = decoded.id;
              request.datosUsuario = result;
              next();
            }
          }
        );
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
module.exports = VerificarToken;
