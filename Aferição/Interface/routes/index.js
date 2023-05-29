var express = require('express');
var router = express.Router();
var axios = require('axios')

// GET /
router.get('/', function(req, res, next) {
  axios.get(process.env.API_URL + "/api/emd")
    .then(response => {
      res.render('index', { list: response.data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

// GET /emd/insert
router.get('/emd/insert', function(req, res, next) {
  res.render('emd_submit');
});


// GET /emd/:id
router.get('/emd/:id', function(req, res, next) {
  axios.get(process.env.API_URL + "/api/emd/" + req.params.id)
    .then(response => {
      console.log(response.data)
      res.render('emd', { emd: response.data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

// POST /emd
router.post('/emd', function(req, res, next) {
  console.log(req.body)
  axios.post(process.env.API_URL + "/api/emd", req.body)
    .then(response => {
      res.render('emd_submit_confirm', { ack: response.data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

module.exports = router;
