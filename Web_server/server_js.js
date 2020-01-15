const WebSocket = require("ws");
const http      = require("http");

const port = 8000

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {

    ws.on("message", function received(message) {
        var ledValue = message["led_value"]
        if(ledValue) {
            console.log("ledValue : "+ledValue);
        }
    });

    ws.send("nothing");
});

server.listen(port, () => {
    console.log("server listening on port : "+port)
});