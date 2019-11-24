const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();

let baseURL = `https://${process.env.INSALES_KEY}:${process.env.INSALES_PASSWORD}@${process.env.INSALES_HOSTNAME}`

app.use('/', express.static('public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    next();
});

var getCollections = function (req, res, next) {
    fetch(new URL('/admin/collections.json', baseURL))
        .then(res => res.json())
        .then((json) => {
            // Check if collection is not hidden
            // Remove parent collection
            res.collections = json.filter(collection => !(collection.is_hidden || collection.position == 0));
            next();
        })
        .catch(error => console.log(error));
}

var getProducts = function (req, res, next) {
    fetch(new URL('/admin/products.json', baseURL))
        .then(res => res.json())
        .then((json) => {
            res.products = json;
            next();
        })
        .catch(error => console.log(error));
}

app.get('/getCollections', getCollections, function (req, res, next) {
    res.send(res.collections);
});

app.get('/getProducts', getProducts, function (req, res, next) {
    res.send(res.products);
});

app.listen(port, () => console.log(`Listening`)); 
