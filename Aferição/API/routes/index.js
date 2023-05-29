var express = require('express');
var router = express.Router();
var EMD = require('../controllers/emd');

// GET /api/emd/modalidades
router.get('/api/emd/modalidades', (req, res, next) => {
  EMD.modalidades()
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})


// GET /api/emd?res=OK
router.get('/api/emd', (req, res, next) => {
  console.log("Evaluating /api/emd?res=OK.")
  if(req.query.res == "OK") {
    console.log("Query string res=OK.")
    EMD.resultadosOK()
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err))
  }
  else {
    console.log("Query string not res=OK.\nRedirecting to next route.")
    next()
  }
})

// GET /api/emd?modalidade=X
router.get('/api/emd', (req, res, next) => {
  console.log("Evaluating /api/emd?modalidade=X.")
  if(req.query.modalidade) {
    EMD.modalidade(req.query.modalidade)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err))
    console.log("/api/emd?modalidade=X finished.")
  }
  else {
    console.log("Query string not modalidade=X.\nRedirecting to next route.")
    next()
  }
})

// GET /api/emd
router.get('/api/emd', (req, res, next) => {
  console.log("/api/emd")
  EMD.list()
  .then(data => {res.jsonp(data)})
  .catch(err => {res.status(500).jsonp(err)})
  console.log("/api/emd finished.")
})

// GET /api/emd/:id
router.get('/api/emd/:id', (req, res, next) => {
  console.log("Evaluating /api/emd/:id.")

  if(req.params.id) {
    console.log("Parameter id exists.")
    EMD.detail(req.params.id)
      .then(data => res.jsonp(data))
      .catch(err => res.status(500).jsonp(err))
    }
    else {
      console.log("Parameter id does not exist.\nRedirecting to next route.")
      next()
    }
})


// GET /api/atletas?gen=F
router.get('/api/atletas', (req, res, next) => {
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

// POST /api/emd
router.post('/api/emd', (req, res, next) => {
  EMD.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})





module.exports = router;
