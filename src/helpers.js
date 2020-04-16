export const populateCollections = function (collections, products) {
  if (!collections.length || !products.length) {
    return [];
  }
  return collections.reduce((acc, c) => {
    c.products = c.products.reduce((acc, p) => {
      let product = products.find((prod) => prod.id == p.product_id);
      if (product) {
        acc.push(Object.assign(p, product));
      }
      return acc;
    }, []);
    if (c.products.length) {
      acc.push(c);
    }
    return acc;
  }, []);
};
