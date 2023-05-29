var EMD = require('../models/emd');

// list of all EMDs.
exports.list = () => {
    return EMD.find({}, {"_id": 1, "nome.primeiro": 1, "nome.último":1, "dataEMD": 1, "resultado": 1})
                .sort({"nome.primeiro": 1})
                .then(res => {
                    return res
                })
                .catch(err => {
                    console.log("ERROR")
                    return err
                })
}

// detail page for a specific EMD.
exports.detail = (id) => {
    return EMD.findById(id)
                .then(res => {
                    return res
                })
                .catch(err => {
                    return err
                })
}

// Modalidades withouth repetitions
exports.modalidades = () => {
    return EMD.distinct("modalidade")
                .then(res => {
                    return res
                })
                .catch(err => {
                    return err
                })
}

// EMD list with resultado = true
exports.resultadosOK = () => {
    return EMD.find({"resultado": true})
                .then(res => {
                    return res
                })
                .catch(err => {
                    return err
                })
}

// EMD list of a given modalidade
exports.modalidade = (modalidade) => {
    return EMD.find({"modalidade": modalidade})
                .then(res => {
                    return res
                })
                .catch(err => {
                    return err
                })
}

// list of female athletes ordered alphabetically by name
exports.feminino = () => {
    return EMD.find({"género": "F"}, {"_id": 0, "nome.primeiro": 1, "nome.último": 1})
                .sort({"nome.primeiro": 1})
                .then(res => {
                    return res
                })
                .catch(err => {
                    return err
                })
}

// list of athletes ordered by name of a given club
exports.clube = (clube) => {
    return EMD.find({"clube": clube}, {"_id": 0, "nome.primeiro": 1, "nome.último": 1})
                .sort({"nome.primeiro": 1})
                .then(res => {
                    return res
                })
                .catch(err => {
                    return err
                })
}

// insert a new EMD
exports.insert = (data) => {
    console.log(data)
    return EMD.create(data)
                .then(res => {
                    return res
                }
                )
                .catch(err => {
                    return err
                }
                )
}
