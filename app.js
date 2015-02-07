'use strict';

var fs = require ('fs');
var express = require('express');
var app = express();
var async = require('async');

var global = {
  port: process.argv[2] ? process.argv[2] : 4000,
  rows: {}
};

async.series([
  loadJSON,
  startServer,
  expressSetup
]);

function loadJSON(callback){
  fs.readFile(__dirname + '/site/static/resources/rows.json', function(err, data){
    if(err){
      console.log('error reading JSON file');
      console.log(err);
      process.exit();
    }
    try{
      JSON.parse(data);
    } catch(err){
      if(err){
        console.log('error parsing JSON file');
        console.log(err);
        process.exit();
      }
    }
    global.rows = data;
    callback();
  })
}

function startServer(callback){
  if(!global.port){
    console.error('no port provided, exiting');
    process.exit();
  }
  var server = app.listen(global.port, function(err){
    if(err){
      console.log('error starting server');
      console.log(err);
      process.exit();
    }
    console.log('serving on port: ' + global.port);
    console.log('server started');
    callback();
  });
}

function expressSetup(callback){
  app.use(express.static(__dirname + '/site'));
  app.use(express.static(__dirname + '/bower_components/angular'));
  app.use(express.static(__dirname + '/bower_components/angular-route'));
  app.use(express.static(__dirname + '/bower_components/bootstrap/dist'));
  app.use(express.static(__dirname + '/bower_components/jquery/dist'));
  app.get('/api/data', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(global.rows);
  });
  callback();
}
