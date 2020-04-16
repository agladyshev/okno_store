import { basket, productsRaw } from "./stores.js";

export const productById = function (id, variantId = undefined) {
  if (!variantId) {
    let p;
    productsRaw.subscribe((products) => {
      p = products.find((p) => p.id == id);
    });
    return p;
  }
};

export const addOne = function (productId, variantId = null) {
  let product = productById(productId);
  let variant = variantId
    ? product.variants.find((v) => (v.id = variantId))
    : product.variants[0];
  if (product) {
    basket.update((basket) => {
      let quantityMax = variant.quantity;
      let { quantity = 0, ...rest } = basket.get(variant.id) || {};
      let nextQuantity = quantity < quantityMax ? quantity + 1 : quantity;
      return basket.set(variant.id, {
        variantId: variant.id,
        productId: product.id,
        quantity: nextQuantity,
      });
    });
  } else {
    return null;
  }
};

export const removeOne = function (productId, variantId = null) {
  let product = productById(productId);
  let variant = variantId
    ? product.variants.find((v) => (v.id = variantId))
    : product.variants[0];
  if (product) {
    basket.update((basket) => {
      let { quantity, variantId, productId } = basket.get(variant.id);
      if (quantity == 1 || !quantity) {
        basket.delete(variantId);
      } else {
        basket.set(variantId, {
          variantId,
          productId,
          quantity: quantity - 1,
        });
      }
      return basket;
    });
  } else {
    return null;
  }
};

export const deleteVariant = function (productId, variantId = null) {
  let product = productById(productId);
  let variant = variantId
    ? product.variants.find((v) => (v.id = variantId))
    : product.variants[0];
  basket.update((basket) => {
    basket.delete(variant.id);
    return basket;
  });
};
