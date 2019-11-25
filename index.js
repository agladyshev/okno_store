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
            res.collections = json.filter(collection => (!collection.is_hidden && collection.parent_id));

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

var addOrder = function (req, res, next) {
    console.log(req);
    let { variant_id, quantity = 1, name, email = "", phone, address = "", delivery = "2217458", payment = "968309" } = req.headers;
    const body = {
        "order": {
            "order_lines_attributes": [
                {
                    "variant_id": variant_id,
                    "quantity": quantity
                }
            ],
            "client": {
                "name": name,
                "email": email,
                "phone": phone
            },
            "shipping_address_attributes": {
                "address": address
            },
            "delivery_variant_id": delivery,
            "payment_gateway_id": payment
        }
    }

    fetch('http://08dc48a4dbcd3a4e4b1ede809fe9e676:4172a97218461e722ed8fba3bb8f866d@myshop-yq315.myinsales.ru/admin/orders.json', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            res.json = json;
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

app.post('/addOrder', addOrder, function (req, res, next) {
    res.send(res.json)
})

app.listen(port, () => console.log(`Listening`));