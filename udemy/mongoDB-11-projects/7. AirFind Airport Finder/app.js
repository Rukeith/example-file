const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

Airport = require('./models/airport');
State = require('./models/state');

const app = express();

const port = 3000;

// Mongoose Connect
mongoose.connect('mongodb://localhost/airfinds');
let db = mongoose.connection;

// CORS
app.use((req, res, next) => {
  // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');
   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   next();
});

// Static Folder
app.use(express.static(__dirname+'/client'));
// Body Parser
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Please use /api/airports or /api/states endpoints');
});

// Airports
app.get('/api/airports', (req, res) => {
  Airport.getAirports((err, docs) => {
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(docs);
  });
});

// States
app.get('/api/states', (req, res) => {
  State.getStates((err, docs) => {
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(docs);
  });
});

// Airports By State
app.get('/api/airports/state/:state', (req, res) => {
  Airport.getAirportsByState(req.params.state, (err, docs) => {
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(docs);
  });
});

app.listen(port, () => {
  console.log('Server started on port '+port);
});
