var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */

router.get('/', function(req, res, next) {
  axios.get(process.env.API_URL + "/emd")
    .then(response => {
      var l = response.data
      console.log("l: "+l)
      res.render('index', { list: response.data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

module.exports = router;
