import { fetchCollectionOrder } from './fetchers.js'

export const filterEmptyProducts = function (product) {
    return (
        product.available &&
        !product.is_hidden &&
        product.images.length &&
        product.variants[0].quantity
    );
};

export const addProductsArray = function (collection) {
    // Get ordered list of products' ids for each collection
    return fetchCollectionOrder(collection.id)
        .then(products => Object.assign(collection, { products }))
};