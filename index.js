import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
const app = express();

const httpServer = new createServer(app);

const io = new Server(httpServer, { cors: { origin: "*" } });

const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {


  // displaying message of join via id when user connect to the chat...

  socket.broadcast.emit("Join",{id:socket.id,mssg:`${socket.id} User joined the chat`,alert:true})

  socket.on("hello", (data) => {
    console.log(`data-> ${data}`);
    socket.broadcast.emit("acknowledge",{id:socket.id,mssg:data,alert:false});
    socket.emit("acknowledge",{id:socket.id,mssg:data,alert:false});
    
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    socket.broadcast.emit("user-disconnected", {id:socket.id,mssg:`${socket.id} User left the chat`,alert:true});
  });
  
});


httpServer.listen(PORT, (err) => {
  if (!err) console.log(`server is running on PORT: ${PORT}`);
});
