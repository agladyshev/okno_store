import { fetchCollectionOrder, fetchProducts } from "./fetchers.js";

export const filterProducts = function(product) {
  return (
    product.available &&
    !product.is_hidden &&
    product.images.length &&
    product.variants[0].quantity
  );
};

export const filterCollections = function(collection) {
  // Check if collection is not hidden
  // Remove parent collection
  // Remove empty collections
  return (
    !collection.is_hidden && collection.position && collection.products.length
  );
};

export const addProductsPositions = function(collection) {
  // Get ordered list of products' ids for each collection
  return fetchCollectionOrder(collection.id).then(products =>
    Object.assign(collection, { products })
  );
};

export const findMissingProducts = function(ids) {
  return fetchProducts()
    .then(json => json.filter(filterProducts))
    .then(available => {
      return ids.filter(id => {
        return !available.find(item => item.id == id);
      });
    });
};
