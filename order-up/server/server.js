const orders = require('./data/orders.json');
const workers = require('./data/workers.json');

//================ Dependencies ==================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
}); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("trust proxy", 1);

// Return all work orders
app.get('/work_orders', (req, res) => res.send(orders));

// Return workers by ID
app.get('/workers/:id', (req, res) => res.send(workers[req.params.id]));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
