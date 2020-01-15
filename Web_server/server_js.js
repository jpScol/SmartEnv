const WebSocket = require("ws");
const http      = require("http");

const port = 8000

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const clientsWS = {
    "joueur": null,
    "jeu": null,
    "arduino": null 
};

wss.on("connection", function connection(ws, req) {

    ws.on("message", function received(message) {
        let client = message["ID"]
        clientsWS[client] = client

        let ledValue = message["led_value"]
        if(ledValue) {
            console.log("ledValue : "+ledValue);
        }
    });

    ws.send("nothing");
});

server.listen(port, () => {
    console.log("server listening on port : "+port)
});