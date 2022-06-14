import Cookies from 'js-cookie';
import { getParsedCookie } from './cookies';

// Add one unit of one item to cart
export function addItemToCart(id) {
  const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  const productInCart = currentCart.find((product) => product.id === id);
  if (productInCart) {
    productInCart.cartCounter += 1;
  } else {
    currentCart.push({ id: id, cartCounter: 1 });
  }
  return currentCart;
}

// Remove one unit of one item in cart
export function removeItemFromCart(id) {
  const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  const productInCart = currentCart.find((product) => product.id === id);
  if (productInCart.cartCounter > 1) {
    productInCart.cartCounter -= 1;
  } else {
    const removeIndex = currentCart
      .map(function (item) {
        return item.id;
      })
      .indexOf(id);
    currentCart.splice(removeIndex, 1);
  }
  return currentCart;
}
