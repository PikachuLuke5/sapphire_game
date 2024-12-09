var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
};

// Create a service (the app object is just a callback).
var app = express();

// Endpoint to save the object
app.post('/save-object', (req, res) => {
    const objectData = req.body; // Get the object from the request body

    // Save the object to a file (or database)
    fs.writeFile('data.json', JSON.stringify(objectData, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving data');
        }
        res.send('Data saved successfully');
    });
});

// Serve Console.html using fs
app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'Console.html'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error');
        }
        res.send(data); // Send the HTML content as a response
    });
});

// Serve StickyCity.html
app.get('/stickycity', (req, res) => {
    fs.readFile(path.join(__dirname, 'StickyCity.html'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error');
        }
        res.send(data);
    });
});

// Create an HTTP service.
http.createServer(app).listen(1305);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(3002);
