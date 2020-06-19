var path = require("path");
const port = 3281;
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile("index.html", getOptions());
})

//route params
app.get('/example/:name/:age', (req, res) => {
    console.log(req.params);
    console.log(req.query);
    res.send(`example with route params NAME: ${req.params.name}, AGE: ${req.params.age}, QUERYSTR: ${req.query}`);
})

app.post('/', (req, res) => {
    console.log(req.body);
   //Do anything like save to DB
    res.send("sucessfully posted data");
})

app.use(express.static('static', getOptions()));


app.use(function (req, res, next) {
    res.status(404).sendFile("404.html");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).sendFile("500.html");
});

//start server
app.listen(port, (args) => {
    if (args)
        console.log(args);
    console.log(`SERVER IS RUNING ON PORT ${port}`);
})

function getOptions() {
    return {
        root: path.join(__dirname, 'static'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
}

