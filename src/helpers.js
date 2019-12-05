export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});


export const populateCollections = function (collections, products) {
  if (!collections.length || !products.length) {
    return [];
  }
  return collections.map(c => {
    c.products = c.products.map(p => {
      return Object.assign(p, products.find(prod => prod.id == p.product_id))
    })
    return c;
  })

};

export const filterEmptyCollections = function (col) {
  return col.products.length;
};

