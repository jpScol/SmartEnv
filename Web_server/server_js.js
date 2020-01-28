const WebSocket = require("ws");
const http       = require("http");
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const fs         = require("fs");

const port = 8880

var lampStatus = 0;

const parameters = {
    Y_Gamer : 0,
    Ymin_Gap : 0,
    Ymax_Gap : 0
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
        console.log("lampChanged");
        res.send();
        return;
    }
    if(req.body.lampStatus == 1) {
        res.json({lampStatus : lampStatus});
        return;
    }
    // console.log("request received !\n" + req.body.GETPOSITION);
    if(req.body.GETPOSITION == 1) {
        // console.log("request received !\n" + req.body.GETPOSITION);
        // res.set('Content-Type', 'application/json');
        res.json(parameters);
    }
    // else if(req.body.GETPOSITION == 0) {
    //     lampStatus = req.bodys.LIGHTUP;
    // }
});

app.get('/', function (req, res) {
    //arduino.write("255,125,000");
    fs.readFile('./jeu.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});


const server = http.createServer(app);

server.listen(port, () => {
    console.log("server listening on port : "+port)
});