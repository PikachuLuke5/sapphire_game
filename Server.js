const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
            return res.status(500).send('Error reading HTML file');
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
