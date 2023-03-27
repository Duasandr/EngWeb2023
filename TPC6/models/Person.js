/**
 * @file Person.js
 * @brief File that contains the Person model
 * @version 1.0
 * @date 2021-05-10
 * @author: Sandro Duarte
 */

// Import mongoose module
var mongoose = require('mongoose');

/**
 * @brief Person Schema
 * @details Defines the schema for the Person model
 */
var personSchema = new mongoose.Schema({
    // _id is the person's ID used by MongoDB is automatically generated
    nome: String,
    idade: Number,
    sexo: String,
    morada: {
        cidade: String,
        distrito: String,
    },
    profissao: String,
    descricao: {
        party_abbr: String,
        party_name: String
    },
    religiao: String,
    desportos: [ String ]
});

/**
 * @brief Person Model Export
 * @details Exports the Person model
 */
module.exports = mongoose.model('person', personSchema);