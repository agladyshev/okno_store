import { fetchCollections, fetchProducts, fetchDelivery, fetchPromo, fetchPayment, postOrder } from './fetchers.js'
import { addProductsArray, filterEmptyProducts } from './helpers.js'


export const getCollections = function (req, res, next) {
    fetchCollections()
        .then(collections => {
            return Promise.all(collections.map(addProductsArray));
        })
        .then(json => {
            // Check if collection is not hidden
            // Remove parent collection
            // Remove empty collections
            return json.filter(
                collection => (!collection.is_hidden && collection.position && collection.products.length)
            );
        })
        .then(collections => {
            res.collections = collections;
            next();
        })
        .catch(error => console.log(error));
};

export const getProducts = function (req, res, next) {
    fetchProducts()
        .then(json => json.filter(filterEmptyProducts))
        .then(filtered => {
            res.products = filtered;
            next();
        })
        .catch(error => console.log(error));
};

export const checkAvailability = function (req, res, next) {
    let { ids } = req.body;
    fetchProducts()
        .then(json => json.filter(filterEmptyProducts))
        .then(available => {
            return ids.filter(id => {
                return !available.find(item => item.id == id);
            });
        })
        .then(notAvailable => {
            if (notAvailable.length) {
                res.send({ status: "missing_items", items: notAvailable });
            } else {
                next();
            }
        });
};



export const getDelivery = function (req, res, next) {
    fetchDelivery()
        .then(json => {
            res.delivery = json;
            next();
        })
        .catch(error => console.log(error));
};

export const getPayment = function (req, res, next) {
    fetchPayment()
        .then(json => {
            res.payment = json;
            next();
        })
        .catch(error => console.log(error));
};

export const getPromo = function (req, res, next) {
    fetchPromo()
        .then(json => {
            res.promo = json.find(article => article.pinned);
            next();
        })
        .catch(error => console.log(error));
};




export const addOrder = function (req, res, next) {
    let {
        products,
        name,
        // email = "",
        phone,
        address,
        deliveryOption = "2217458",
        paymentOption = "968309"
    } = req.body;

    const body = {
        order: {
            order_lines_attributes: products,
            client: {
                name: name,
                // email: email,
                phone: phone
            },
            shipping_address_attributes: {
                address: address
            },
            delivery_variant_id: deliveryOption,
            payment_gateway_id: paymentOption
        }
    };
    postOrder()
        .then(order => {
            res.order = order;
            next();
        });
    // .catch(error => {
    //   res.json = error;
    //   next();
    // });
};