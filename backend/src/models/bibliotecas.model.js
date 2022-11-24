const mongoose = require("mongoose");
const { Schema } = mongoose;

const BibliotecaSchema = new Schema({
    nombre: { type: String },
}, {
    timestamps: { createdAt: true, updatedAt: true }
})

module.exports = mongoose.model("Bibliotecas", BibliotecaSchema);