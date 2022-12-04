const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./routes");
const http = require("http").Server(app);
const io = require("socket.io")(http);

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("socketio", io);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to test task application." });
});

mongoose
  .connect(`${process.env.MONGO_DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

routes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const initial = () =>
  app.listen(PORT, () => {
    console.log(`listen post ${PORT}`);
  });

io.on("connection", (socket) => {
  socket.on("test", (user) => {
    console.log("test", user);
    io.emit("message", "Welcome");
  });
});
