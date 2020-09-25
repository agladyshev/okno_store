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

    c.products = sortProducts(c.products, c.sort_type);

    if (c.products.length) {
      acc.push(c);
    }
    return acc;
  }, []);
};

export const sortProducts = function (products, sortType) {
  const sortLookUp = {
    3: { field: "created_at", reverse: true, variants: false },
    4: { field: "created_at", reverse: false, variants: false },
    5: { field: "price", reverse: true, variants: true },
    6: { field: "price", reverse: false, variants: true },
    7: { field: "position", reverse: false, variants: false },
  };
  let { field = "position", reverse = "false", variants = "false" } =
    sortLookUp[sortType] || sortLookUp[7];
  if (!reverse) {
    return products.sort((a, b) => {
      if (variants) {
        return a.variants[0][field] - b.variants[0][field];
      } else if (field == "created_at") {
        return new Date(a[field]) - new Date(b[field]);
      } else {
        return a[field] - b[field];
      }
    });
  } else {
    return products.sort((a, b) => {
      if (variants) {
        return b.variants[0][field] - a.variants[0][field];
      } else if (field == "created_at") {
        return new Date(b[field]) - new Date(a[field]);
      } else {
        return a[field] - b[field];
      }
    });
  }
};
