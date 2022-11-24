const { Router } = require("express");

module.exports = function ({ UsuarioController, VerificarTokenController }) {
    const router = Router();
    router.post("/crearAdmin", UsuarioController.crearUsuario);
    router.patch("/editarUsuario", VerificarTokenController.verificarToken, UsuarioController.editarUsuario);
    router.get("/listarUsuarios", VerificarTokenController.verificarToken, UsuarioController.listarUsuario);
    router.patch("/deshabilitar", VerificarTokenController.verificarToken, UsuarioController.deshabilitarUsuario);
    router.post("/login", UsuarioController.loginUsuario);
    router.get("/obtenerUsuario", VerificarTokenController.verificarToken, UsuarioController.obtenerUsuario);
    router.post("/crearOperador", VerificarTokenController.verificarToken, UsuarioController.operadorCrearUsuario);
    router.get("/buscarUsuario/:usuarioId", VerificarTokenController.verificarToken, UsuarioController.buscarUsuario);
    return router;
}