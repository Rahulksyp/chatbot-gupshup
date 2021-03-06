const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var lastMessageRecived = ""

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', {root: __dirname});
});

app.get('/get', (req, res) => {
    res.send(`Last Message Received --> ${lastMessageRecived}`);
});

app.get('/validation-redirect', (req, res) => {
    res.send({ permission: true});
});


app.post('/send', (req, res, next) => {
    const reqBody = JSON.parse(req.body.messageobj)
    const asked = reqBody.text.toLowerCase()
    var reply = ""

    if (asked == "hi") {
        reply = 'Yo dude!'
    } else if (asked == "hello") {
        reply = 'Yo bro!'
    } else {
        reply = 'I cant understand :('
    }

    lastMessageRecived = asked
    res.send(reply);
});

app.listen(process.env.PORT || 8080, function(){
    console.log("Server started");
  });