const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const port = 8080;

const { Server } = require("socket.io");
const io = new Server(server);

const ejs = require("ejs");
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");

io.on('connection', (socket,req,res) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

app.use(express.static("public"));
app.set("src", "path/to/views");

app.get("/", (req, res, err) => {

res.render(__dirname + "/src/pages/index.ejs");
console.log("Sayfaya giriş yapıldı");    

});
app.get("*", (req,res)=>{
res.render(__dirname + "/src/pages/error.ejs");  
});
server.listen(port, () => {
console.log(port, " Portu dinleniyor");
});
