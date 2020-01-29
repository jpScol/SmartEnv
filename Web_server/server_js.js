const WebSocket = require("ws");
const http       = require("http");
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const fs         = require("fs");
const request    = require("request");

const port = 8880
const urlON = "http://127.0.0.1:1880/on"
const urlOFF = "http://127.0.0.1:1880/off"

var lampStatus = 0;

const parameters = {
    Y_center_piece : 0,
    Y_center_obstacle : 0
}

// const wss = new WebSocket.Server({ server });

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/', (req, res) => {
    // console.log("RECU :\n"+ JSON.stringify(req.body));
    // res.send(parameters);
    if(req.body.changeLamp) {
        lampStatus = req.body.changeLamp;
        console.log("lampChanged : "+lampStatus);
        res.send();
        return;
    }
    if(req.body.lampStatus == 1) {
        parameters.Y_center_piece = req.body.Y_center_piece;
        parameters.Y_center_obstacle = req.body.Y_center_obstacle;
        console.log(parameters);
        res.json({lampStatus : lampStatus});
        return;
    }
    // console.log("request received !\n" + req.body.GETPOSITION);
    if(req.body.GETPOSITION == 1) {
        // console.log("request received !\n" + req.body.GETPOSITION);
        // res.set('Content-Type', 'application/json');
        res.json(parameters);
        return;
    }
    if(req.body.LIGHTUP == 1) {
        lampStatus = 1;
        request.get(urlON);
        res.send({});
        return;
    }
    if(req.body.LIGHTDOWN == 1) {
        lampStatus = 0;
        request.get(urlOFF);
        res.send({});
        return;
    }
});

app.get('/', function (req, res) {
    fs.readFile('../jeu.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});


const server = http.createServer(app);

server.listen(port, () => {
    console.log("server listening on port : "+port)
});