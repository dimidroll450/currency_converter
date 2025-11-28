const express = require('express'),
    http = require('http'),
    app = express(),
    cors = require('cors'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    port = 3006,
    delay = 1000;

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const currenciesPath = './mocks/nbu.currency.json';

function readMockFile(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
} 

app.get('/NBUStatService/v1/statdirectory/exchange', (req, res) => {
    setTimeout(() => {
        const data = readMockFile(currenciesPath);
        res.status(200).send(data);
        // res.status(500).send(); // Failed
    }, delay);
});


server.listen(port, "0.0.0.0", () => {
    console.log(`Server is listening on port ${port}`)
})