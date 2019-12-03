import { basket, productsRaw } from './stores.js'

export const productById = function (id, variantId = undefined) {
    if (!variantId) {
        let p;
        productsRaw.subscribe(products => {
            p = products.find(p => p.id == id)
        })
        return p;
    }
}

export const toggleBasket = function (product, added) {
    basket.update(basket => {
        if (added) {
            basket.delete(product.id);
            return basket;
        } else {
            return basket.set(product.id, product);
        }
    });
}

export const addToBasket = function (id) {
    let product = (productById(id));
    if (product) {
        basket.update(basket => {
            return basket.set(product.id, product)
        })
    } else {
        return null;
    }
}

export const deleteProduct = function (id) {
    basket.update(basket => {
        basket.delete(id);
        return basket;
    })
}