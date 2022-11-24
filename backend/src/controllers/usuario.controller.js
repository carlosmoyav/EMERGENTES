let _usuarioService = null;
class UsuarioController {
	constructor({ UsuarioService }) {
		_usuarioService = UsuarioService;
	}
	crearUsuario(req, res) {
		return _usuarioService.crear(req, res);
	}
	editarUsuario(req, res) {
		return _usuarioService.editar(req, res);
	}
	listarUsuario(req, res) {
		return _usuarioService.listar(req, res);
	}
	deshabilitarUsuario(req, res) {
		return _usuarioService.deshabilitar(req, res);
	}
	loginUsuario(req, res) {
		return _usuarioService.login(req, res);
	}
	obtenerUsuario(req, res) {
		return _usuarioService.obtener(req, res);
	}
	operadorCrearUsuario(req, res) {
		return _usuarioService.operadorCrear(req, res);
	}
	buscarUsuario(req, res) {
		return _usuarioService.buscarUsuario(req, res);
	}

}

module.exports = UsuarioController;