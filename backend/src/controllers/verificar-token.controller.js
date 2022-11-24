let _verificarTokenService = null ;
class VerificarTokenController {
	constructor({VerificarTokenService}){
		_verificarTokenService = VerificarTokenService;
	}
	verificarToken(req, res, next){
		return _verificarTokenService.verificar(req, res, next);
	}

}

module.exports = VerificarTokenController;