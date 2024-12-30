var express = require('express');
var app = express();
var cors = require('cors');
var indexRouter = require('./routes')
var db = require('./db.js');
var PORT = 4003;
var cron = require('node-cron');
var morgan = require('morgan');

/*
cron.schedule('*\/5 * * * * *', function() {
    console.log('Running function every 5 seconds');
});
*/

function Format(tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,  and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});

app.use(cors());
app.use(express.json());
app.use(morgan(Format));
app.use('/', indexRouter);

/*
if we have another set of routes we do the same as above
app.use("/users", usersRoute )
*/
