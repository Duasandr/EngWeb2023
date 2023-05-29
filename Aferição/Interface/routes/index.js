var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */

router.get('/', function(req, res, next) {
  axios.get(process.env.API_URL + "/api/emd")
    .then(response => {
      console.log("/api/emd responded.")
      res.render('index', { list: response.data });
    })
    .catch(err => {
      console.log("/api/emd responded with error.")
      res.render('error', {error: err})
    })
});

router.get('/emd/:id', function(req, res, next) {
  axios.get(process.env.API_URL + "/api/emd/" + req.params.id)
    .then(response => {
      console.log("/api/emd/" + req.params.id + " responded.")
      console.log(response.data)
      res.render('emd', { emd: response.data });
    })
    .catch(err => {
      console.log("/api/emd/" + req.params.id + " responded with error.")
      res.render('error', {error: err})
    })
});


module.exports = router;
