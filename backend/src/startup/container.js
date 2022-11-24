const { createContainer, asClass, asValue, asFunction } = require("awilix");
//config
const config = require("../config");
const app = require(".");
//servicios
const {UsuarioService, VerificarTokenService} = require("../services");
//controladores
const { UsuarioController, VerificarTokenController,} = require("../controllers");
//rutas
const { UsuarioRoutes } = require("../routes/index.routes");

const { TokenHelper } = require("../helpers");

const Routes = require("../routes");
const container = createContainer();
container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    UsuarioService: asClass(UsuarioService).singleton(),
    VerificarTokenService: asClass(VerificarTokenService).singleton(),
  })
  .register({
    UsuarioController: asClass(
      UsuarioController.bind(UsuarioController)
    ).singleton(),
    VerificarTokenController: asClass(
      VerificarTokenController.bind(VerificarTokenController)
    ).singleton(),
  })
  .register({
    UsuarioRoutes: asFunction(UsuarioRoutes).singleton(),
  })
  .register({
    TokenHelper: asClass(TokenHelper).singleton(),
  });
module.exports = container;
