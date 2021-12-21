var express = require('express');
var app = express();
var bodyParser = require('body-parser');

console.log("Hello World");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    res.send(
      { "message": "Hello json".toUpperCase() }
    );
  } else {
    res.send(
      { "message": "Hello json" }
    );
  }
});

const getTime = () => new Date().toString();

app.get('/now', function(req, res, next) {
  req.time = getTime();
  next();
}, function(req, res) {
  console.log(req.time);
  res.send(
    { time: req.time }
  );
});

app.get("/:word/echo", (req, res) => {
  res.send({
    echo: req.params.word
  });
});

app
  .route("/name")
  .get((req, res, next) => {
    res.send(
      {
        name:
          `${req.query.first} ${req.query.last}`
      }
    );
    next();
  })
  .post((req, res) => {
    res.send(
      {
        name:
          `${req.body.first} ${req.body.last}`
      }
    )
  });



// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

































module.exports = app;
