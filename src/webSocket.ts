import ws from "ws";
import { Server } from "http";
import jwt from "jsonwebtoken";

interface IDecoded {
  _id: string;
  username: string;
  iat: number;
}

let wss: ws.Server<ws.WebSocket> | null;

export const webSocket = (server: Server) => {
  wss = new ws.Server({ server });

  wss.on("connection", (ws, req) => {
    console.log("A new client Connected!");
    const token = req.url?.split("/")[1];
    if (!token) {
      const data = JSON.stringify({ code: 400, message: "Error: Bad token provided!" });
      ws.send(data);
      return ws.terminate();
    }
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string) as IDecoded;
    const data = JSON.stringify({ code: 200, message: `Welcome New Client ${decoded.username}!` });
    ws.send(data);
  });
};

export const pushNotification = (data: string) => {
  wss?.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
};
