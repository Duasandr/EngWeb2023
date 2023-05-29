var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nomeSchema = new Schema({
    primeiro: String,
    último: String
});

var emdSchema = new Schema({
    index: Number,
    dataEMD: String,
    nome: nomeSchema,
    idade: Number,
    género: String,
    morada: String,
    modalidade: String,
    clube: String,
    email: String,
    federado: Boolean,
    resultado: Boolean
});

module.exports = mongoose.model('EMD', emdSchema, 'exames' );