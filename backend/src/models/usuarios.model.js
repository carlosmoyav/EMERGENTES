const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  biblioteca_id: { type: Schema.Types.ObjectId },
  nombre: { type: String },
  apellido: { type: String },
  email: { type: String },
  contrasena: { type: String },
  tipo: { type: String },
  estado: { type: Boolean },
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);