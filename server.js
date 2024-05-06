const express = require("express");
const http = require("http");
const { connectDB } = require("./dbConnection");
const cardRouter = require("./routers/router");
const socketIo = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server);

connectDB()
  .then(() => {
    app.use(express.static(__dirname + '/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/api/cards', cardRouter);

    io.on('connection', (socket) => {
      console.log('a user connected');
      
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  
      setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
      }, 1000);
    });

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  });
