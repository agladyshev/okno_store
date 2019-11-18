const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();

let baseURL = `https://${process.env.INSALES_KEY}:${process.env.INSALES_PASSWORD}@${process.env.INSALES_HOSTNAME}`
    
app.use('/', express.static('public'));

var getCollections = function (req, res, next) {
    fetch(new URL('/admin/collections.json', baseURL))
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
}

var getProducts = function (req, res, next) {
    fetch(new URL('/admin/products.json', baseURL))
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
}

app.get('/getCollections', getCollections, function (req, res, next) {
    res.send(res.categories);
});

app.listen(port, () => console.log(`Listening`)); 
