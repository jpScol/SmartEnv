const WebSocket = require("ws");
const http       = require("http");
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();

const port = 8880

// const wss = new WebSocket.Server({ server });

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/', (req, res) => {
    console.log("request received !\n"+req.body)
    res.send("salut !");
});


const server = http.createServer(app);

server.listen(port, () => {
    console.log("server listening on port : "+port)
});