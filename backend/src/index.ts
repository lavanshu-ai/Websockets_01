import WebSocket,{WebSocketServer} from "ws";
import http, { IncomingMessage, ServerResponse } from "http";

const server =http.createServer((request:IncomingMessage,response:ServerResponse)=>{
 console.log((new Date)+'request received for' + request.url)
 response.end("hi there")
})

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});