var express = require('express');
var app = express();

console.log("Hello World");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
});

app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";

  res.sendFile(absolutePath);

});

app.get("/json", (req, res) => {
  const mySecret = process.env['MESSAGE_STYLE'];

  if (mySecret === "uppercase") {
    res.send({ "message": "Hello json".toUpperCase() });
  } else {
    res.send({ "message": "Hello json" });
  }
});

const getTime = () => new Date().toString();

app.get('/now', function(req, res, next) {
  req.time = getTime();
  next();
}, function(req, res) {
  console.log(req.time);
  res.send({time: req.time});
});



// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

































module.exports = app;
