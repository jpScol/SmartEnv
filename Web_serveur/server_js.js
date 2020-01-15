const WebSocket = require("ws");
const http      = require("http");

const port = 8000

const server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {

    ws.on("message", function received(message) {
        console.log(message);
    });

    ws.send("nothing");
});

wss.on("open", function opening() {
    console.log("WebSocket started");
});

server.listen(port, () => {
    console.log("server open...")
});