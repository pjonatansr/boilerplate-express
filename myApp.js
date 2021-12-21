var express = require('express');
var app = express();

console.log("Hello World");


app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";

  res.sendFile(absolutePath);

});

app.get("/json", (req, res) => {
  const mySecret = process.env['MESSAGE_STYLE'];

  if (mySecret === "uppercase") {
    res.send ({"message": "Hello json".toUpperCase()});
  } else {
    res.send( {"message": "Hello json"} );
  }

});

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

































module.exports = app;
