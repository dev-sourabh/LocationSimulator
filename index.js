const socketio = require('socket.io');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const parse = require('csv-parse');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '1063456',
  key: 'e17dd7a5b13d4f40fe26',
  secret: '15ed3a6d43ec1d894c8b',
  cluster: 'ap2',
  encrypted: true
});

var subsbus = [];
var subsroute = [];

const app = express();
app.use(cors());

const httpserver = require('http').createServer(app);

//const unzipper = require('unzipper');
//location

/*fs.createReadStream('data/data.zip')
  .pipe(unzipper.Extract({ path: '' }));*/

/*var count = 0;
var isSimulationEnabled = false;
*/

function start() {
  var datastream;
  var count = 0;

  datastream = fs.createReadStream('data/data.csv');
  datastream
        .pipe(parse({delimiter: ','}))
        .on('data', (csvrow) => {

          /*var data = { 'bus_id': csvrow[0], 'trip_id': csvrow[1], 'gps_datetime': csvrow[2], 'location': csvrow[3], 'dtd': csvrow[4], 'corridor': csvrow[5], 'longitude': csvrow[6], 'latitude': csvrow[7], 'speed': csvrow[8], 'course': csvrow[9], 'color': csvrow[10]};*/

          //not waiting for 10 sec
          var inter = setTimeout(() => {
            console.log(csvrow);
            clearTimeout(inter);
          }, 10000);
        })
        .on('end', () => {
          datastream.destroy();
          //console.log(count);
  });
}

start();

app.get('/', (req, res) => {
  res.send("API is Running...");
});

app.get('/subscribe/bus/:id', (req, res) => {
  subsbus.push(req.params.id);
  res.send("subscribed "+req.params.id);
});

app.get('/subscribe/route/:id', (req, res) => {
  subsroute.push(req.params.id);
  res.send("subscribed "+req.params.id);
});

/*var server = socketio(httpserver);

var datastream;
*/
/*datastream = fs.createReadStream('data/data.csv');
    datastream
        .pipe(parse({delimiter: ','}))
        .on('data', (csvrow) => {
          //all.push(csvrow);
        })
        .on('end', () => {
          datastream.destroy();
          console.log(count);
});*/
/*
var socket;

server.on('connection', socket => {
  this.socket = socket;
});

app.get('/stopsimulation', (req, res) => {
  if(isSimulationEnabled == false)
  {
    return res.send("Not Started");
  }
  datastream.destroy();
  //server.close();
  isSimulationEnabled = false;
  res.send("Stopped");
});

app.get('/startsimulation', (req, res) => {

  if(isSimulationEnabled == true)
  {
    res.send("Simulation is already Enabled");
    return;
  }

  isSimulationEnabled = true;
  count = 0;
  server = socketio(httpserver);

  server.on('connection', socket => {
    console.log("Log:Client Connected...");

    datastream = fs.createReadStream('data/data.csv');
    datastream
        .pipe(parse({delimiter: ','}))
        .on('data', (csvrow) => {
          setTimeout(() => {
            if(count < 1)
            {
              console.log(csvrow);
            } else {
              socket.emit(csvrow[0], { 'trip_id': csvrow[1], 'gps_datetime': csvrow[2], 'location': csvrow[3], 'dtd': csvrow[4], 'corridor': csvrow[5], 'longitude': csvrow[6], 'latitude': csvrow[7], 'speed': csvrow[8], 'course': csvrow[9], 'color': csvrow[10]});
            }
            count++;
            //console.log(count);
          }, 10000);
        })
        .on('end', () => {
          isSimulationEnabled = false;
          datastream.destroy();
          console.log(count);
      });

      socket.on('message', data => {
        console.log("Data : "+data);
      });
    });

    res.send("Success");
});
*/

httpserver.listen(8082, () => {
  console.log("Rest Server Started...");
});
