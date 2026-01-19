import WebSocket, { WebSocketServer } from "ws";
import http from "http";
const server = http.createServer((request, response) => {
    console.log((new Date) + 'request received for' + request.url);
    response.end("hi there");
});
const wss = new WebSocketServer({ server });
wss.on('connection', function connection(socket) {
    //this 2 are event registers
    socket.on('error', console.error);
    socket.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    //simple msg
    socket.send('Hello! Message From Server!!');
});
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});
//# sourceMappingURL=index.js.map