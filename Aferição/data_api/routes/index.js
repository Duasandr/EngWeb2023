var express = require('express');
var router = express.Router();
var EMD = require('../controllers/emd');


// GET /api/emd
router.get('/api/emd', (req, res, next) => {
  EMD.list()
    .then(data => {res.jsonp(data)})
    .catch(err => {res.status(500).jsonp(err)})
})

// GET /api/emd/:id
router.get('/emd/:id', (req, res, next) => {
  EMD.detail(req.params.id)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

// GET /api/emd/modalidades
router.get('/emd/modalidades', (req, res, next) => {
  EMD.modalidades()
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

// GET /api/emd?res=OK
router.get('/emd', (req, res, next) => {
  if(req.query.res == "OK") {
    EMD.resultadosOK()
      .then(data => res.jsonp(data))
      .catch(err => res.status(500).jsonp(err))
  }
  else {
    next()
  }
})

// GET /api/emd?modalidade=X
router.get('/emd', (req, res, next) => {
  if(req.query.modalidade) {
    EMD.modalidade(req.query.modalidade)
      .then(data => res.jsonp(data))
      .catch(err => res.status(500).jsonp(err))
  }
  else {
    next()
  }
})

// GET /api/atletas?gen=F
router.get('/atletas', (req, res, next) => {
  if(req.query.gen == "F") {
    EMD.feminino()
      .then(data => res.jsonp(data))
      .catch(err => res.status(500).jsonp(err))
  }
  else {
    next()
  }
})

// GET /api/atletas?clube=X
router.get('/atletas', (req, res, next) => {
  if(req.query.clube) {
    EMD.clube(req.query.clube)
      .then(data => res.jsonp(data))
      .catch(err => res.status(500).jsonp(err))
  }
  else {
    next()
  }
})




module.exports = router;
