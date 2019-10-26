const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


// set cross origin header to allow cross-origin request.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static('./'));

app.post('/', function (req, res) {
  console.log('i got the request', req.body);
  fs.writeFile(path.resolve(__dirname, 'log'), req.body, (err) => {
    console.log(err);
  });
  res.send(req.body)
});

const server = app.listen(3000, function () {
  console.log('Express is listening to http://localhost:3000');
});
