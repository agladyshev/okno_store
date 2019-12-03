export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

export const addProductsArray = function(collection) {
  collection.products = [];
  return collection;
};

export const populateCollections = function(collections, products) {
  if (!collections.length || !products.length) {
    return {};
  }
  return products.reduce((obj, product) => {
    let ids = product.collections_ids;
    ids.forEach(id => {
      if (obj[id]) {
        obj[id].products.push(product);
      }
    });
    return obj;
  }, arrayToObject(collections.map(addProductsArray), "id"));
};

export const filterEmptyCollections = function(col) {
  return col.products.length;
};

