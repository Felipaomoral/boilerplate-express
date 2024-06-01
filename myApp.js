let express = require('express');
let app = express();
require('dotenv').config();

// #1
console.log("Hello World");

// #2
/*app.get("/", (req, res) => {
  res.send("Hello Express");
});*/

// #4
app.use("/public", express.static(__dirname + "/public"));

//#3
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/* #5
app.get("/json", (req, res) => {
  res.json({message: "Hello json"});
}); */

// #7 Middleware de log
app.use((req, res, next) => {
    const log = `${req.method} ${req.path} - ${req.ip}`;
    console.log(log);
    next();
});

// #6
app.get('/json', (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase();
    }
    res.json({ "message": message });
});

// #8 Middleware para adicionar a hora atual
// Rota GET /now com middleware encadeado
const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.json({
    time: req.time
  });
});


































 module.exports = app;
