// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

// your first API endpoint...
app.get("/api/timestamp/:date?", function (req, res) {
    let dateString = req.params.date;
    if (dateString) {
        let dateNumber = Date.parse(dateString);
        if (dateNumber) {
            let date = new Date(dateNumber);
            if (date instanceof Date && !isNaN(date.getTime())) {
                res.json({
                    "unix": dateNumber,
                    "utc": date.toUTCString(),
                });
            }
            return;
        }
        dateNumber = new Date(dateString * 1);
        if (dateNumber instanceof Date && !isNaN(dateNumber.getTime())) {
            let date = new Date(dateNumber);
            res.json({
                "unix": dateString,
                "utc": date.toUTCString(),
            });
            return;
        }

        res.json({
            "error": "Invalid Date"
        });

    } else {
        res.json({
            "unix": new Date.now(),
            "utc": new Date().toUTCString(),
        });
    }
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
