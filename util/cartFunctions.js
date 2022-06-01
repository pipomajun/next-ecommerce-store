import Cookies from 'js-cookie';
import { getParsedCookie, setStringifiedCookie } from './cookies';

export function countItemsInCart(cart) {
  return cart
    .map((product) => product.itemCount)
    .reduce((totalCount, currentCount) => totalCount + currentCount, 0);
}

export function countTotalSum(cart) {
  return cart.reduce((accumulator, product) => {
    return accumulator + product.price * product.itemCount;
  }, 0);
}

export function addItemToCart(id) {
  const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  const productInCart = currentCart.find((product) => product.id === id);
  if (productInCart) {
    productInCart.cartCounter += 1;
  } else {
    currentCart.push({ id: id, cartCounter: 1 });
  }
  setStringifiedCookie('cart', currentCart);
  return currentCart;
}

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
  setStringifiedCookie('cart', currentCart);
  return currentCart;
}
