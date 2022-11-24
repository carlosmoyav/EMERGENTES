const { Usuarios, Bibliotecas } = require("../models");
const { mongo } = require("mongoose");
const bcrypt = require("bcrypt");
let _tokenHelper = null;

class UsuarioService {
  constructor({ TokenHelper }) {
    _tokenHelper = TokenHelper;
  }
  crear(req, res) {
    const entrada = req.body;
    ///comprobacion de que todos lo campos estan llenos
    if (
      !entrada["nombres"] ||
      !entrada["apellidos"] ||
      !entrada["nombre_biblioteca"] ||
      !entrada["email"] ||
      !entrada["password"]
    ) {
      return res.status(400).json({ message: "Faltan campos" });
    }
    try {
      Usuarios.findOne(
        { email: entrada.email },
        function (err, usuarioEncontrado) {
          if (err) {
            return res
              .status(500)
              .json({ mensaje: "Error al buscar al comprobar correo" });
          }
          if (usuarioEncontrado) {
            return res
              .status(404)
              .json({ mensaje: "Ya existe una cuenta con este correo" });
          }
          Bibliotecas.create(
            { nombre: entrada.nombre_biblioteca },
            function (err, bibliotecaCreada) {
              if (err) {
                return res
                  .status(500)
                  .json({ mensaje: "Error al buscar al crear biblioteca" });
              }
              const usuario = {
                biblioteca_id: bibliotecaCreada._id,
                nombre: entrada.nombres,
                apellido: entrada.apellidos,
                email: entrada.email,
                contrasena: _tokenHelper.hashPassword(entrada.password),
                tipo: "admin",
                estado: true,
              };

              Usuarios.create(usuario, function (err, usuario) {
                if (err) {
                  return res
                    .status(500)
                    .json({ mensaje: "Error al buscar al crear usuario" });
                } else {
                  return res
                    .status(200)
                    .json({ 'datos': usuario });
                }
              });

            }
          );
        }
      );
    } catch (err) {
      return res.status(500).json({ message: "Error al crear el usuario" });
    }
  }
  editar(req, res) {
    const entrada = req.body;
    if (
      !entrada["nombre"] ||
      !entrada["apellido"] ||
      !entrada["email"] ||
      !entrada["tipo"]
    ) {
      return res.status(400).json({ message: "Faltan campos" });
    }
    try {
      Usuarios.findOneAndUpdate(
        { _id: mongo.ObjectId(entrada._id) },
        {
          $set: entrada,
        },
        function (err, usuarioActualizado) {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al actualizar el usuario" });
          }
          if (!usuarioActualizado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
          } else {
            return res.status(200).json({ message: "Usuario actualizado" });
          }
        }
      );
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error al actualizar el usuario" });
    }
  }

  listar(req, res) {
    try {
      Usuarios.findOne(
        {
          _id: mongo.ObjectId(req.id),
        },
        function (err, usuarioBuscado) {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al listar usuarios" });
          }
          if (!usuarioBuscado) {
            return res.status(404).json({
              message: "Usuario no encontrado para realizar la busqueda",
            });
          }
          Usuarios.find(
            { biblioteca_id: usuarioBuscado.biblioteca_id },
            function (err, usuarios) {
              if (!usuarios) {
                return res
                  .status(500)
                  .json({ message: "Error al buscar usuarios" });
              }
              return res.status(200).json({ usuarios: usuarios });
            }
          );
        }
      );
    } catch (err) {
      return res.status(500).json({ message: "Error al listar usuarios" });
    }
  }

  deshabilitar(req, res) {
    const entrada = req.body;
    console.log('peticion deshabilitar')
    console.log(entrada);
    if (!entrada["estado"] || !entrada["_id"]) {
      return res.status(400).json({ message: "Faltan campos" });
    }
    try {
      Usuarios.findOneAndUpdate(
        { _id: mongo.ObjectId(entrada._id) },
        {
          estado: entrada.estado,
        },
        function (err, usuarioActualizado) {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error al deshabilitar " });
          }
          return res.status(200).json({ message: "Usuario deshabilitado" });
        }
      );
    } catch (err) {
      console.log(err)
      return res
        .status(500)
        .json({ message: "Error al deshabilitar el usuario" });
    }
  }

  login(req, res) {
    const entrada = req.body;
    if (!entrada["email"] || !entrada["password"]) {
      return res.status(400).json({ mensaje: "Faltan valores" });
    }
    try {
      Usuarios.findOne(
        {
          email: entrada.email,
        },
        function (err, usuarioBuscado) {
          if (err) {
            return res.status(500).json({ message: "Error al realizar login" });
          }

          if (!usuarioBuscado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
          }

          const estadoContrasena = bcrypt.compareSync(
            entrada["password"],
            usuarioBuscado.contrasena
          );
          if (!estadoContrasena) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
          }
          if (!usuarioBuscado.estado) {
            return res.status(400).json({ mensaje: "Usuario deshabilitado" });
          }
          const token = _tokenHelper.generateToken(usuarioBuscado._id);

          return res.status(200).json({
            token: token,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: "Error al realizar login" });
    }
  }

  obtener(req, res) {
    try {
      Usuarios.findOne(
        { _id: mongo.ObjectId(req.id) },
        function (err, usuarioBuscado) {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al realizar busqueda" });
          }

          if (!usuarioBuscado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
          }
          Bibliotecas.findOne(
            {
              _id: mongo.ObjectId(usuarioBuscado.biblioteca_id),
            },
            function (err, bibliotecaBuscada) {
              if (err) {
                return res
                  .status(500)
                  .json({ message: "Error al realizar busqueda" });
              }

              if (!bibliotecaBuscada) {
                return res
                  .status(404)
                  .json({ message: "Biblioteca no encontrada" });
              }

              return res.status(200).json({
                id: usuarioBuscado._id,
                nombre: usuarioBuscado.nombre,
                apellido: usuarioBuscado.pellido,
                tipo: usuarioBuscado.tipo,
                biblioteca_id: bibliotecaBuscada._id,
                biblioteca_nombre: bibliotecaBuscada.nombre,
              });
            }
          );
        }
      );
    } catch (err) {
      return res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }

  buscarUsuario(req, res) {
    try {
      Usuarios.findOne(
        { _id: mongo.ObjectId(req.params.usuarioId) },
        function (err, usuarioBuscado) {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al realizar busqueda" });
          }

          if (!usuarioBuscado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
          } else {
            return res.status(200).send(usuarioBuscado);
          }
        });
    } catch (err) {
      return res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }

  operadorCrear(req, res) {
    console.log('Entro a operador crear')
    const entrada = req.body;
    if (
      !entrada["nombre"] ||
      !entrada["apellido"] ||
      !entrada["email"] ||
      !entrada["contrasena"]
    ) {
      return res.status(400).send({ message: "Faltan campos" });
    }
    try {
      Usuarios.findOne(
        {
          email: entrada.usuario_email,
        },
        function (err, usuarioBuscado) {
          if (err) {
            return res
              .status(500)
              .json({ mensaje: "Error al buscar al comprobar correo" });
          }
          if (usuarioBuscado) {
            return res
              .status(404)
              .json({ mensaje: "Ya existe una cuenta con este correo" });
          }
          Usuarios.findOne(
            {
              _id: mongo.ObjectId(req.id),
            },
            function (err, usuarioAdmin) {
              if (err) {
                return res
                  .status(500)
                  .json({ mensaje: "Error al buscar al usuario admin" });
              }
              if (!usuarioAdmin) {
                return res
                  .status(404)
                  .json({ mensaje: "Ya existe una cuenta con este correo" });
              }
              const usuario = {
                biblioteca_id: usuarioAdmin.biblioteca_id,
                nombre: entrada.nombre,
                apellido: entrada.apellido,
                email: entrada.email,
                contrasena: _tokenHelper.hashPassword(
                  entrada.contrasena
                ),
                tipo: "operador",
                estado: true,
              };
              Usuarios.create(usuario, function (err, usuarioCreado) {
                if (err) {
                  return res
                    .status(500)
                    .json({ mensaje: "Error al buscar al crear usuario operador" });
                } else {
                  return res
                    .status(200)
                    .json({ 'datos': usuarioCreado });
                }
              });
            }
          );
        }
      );
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error al crear el usuario operador" });
    }
  }

}
module.exports = UsuarioService;
