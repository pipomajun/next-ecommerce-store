import Cookies from 'js-cookie';
import { getParsedCookie, setStringifiedCookie } from './cookies';

// Calculate the total amount of items in cart
export function countItemsInCart(currentCart) {
  return currentCart
    .map((product) => product.cartCounter)
    .reduce((totalCount, currentCount) => totalCount + currentCount, 0);
}
// Calculate total sum of items in cart
export function countTotalSum(currentCart) {
  return currentCart.reduce((accumulator, product) => {
    return accumulator + product.price * product.cartCounter;
  }, 0);
}

// Add one unit of one item to cart
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

// Remove one unit of one item from cart
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

// Remove all units from one item from cart
export function removeAllItemsFromCart(id) {
  const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  const productInCart = currentCart.find((product) => product.id !== id);
  setStringifiedCookie('cart', currentCart);
  return productInCart;
  // setShoppingCart(newCookieValue);
}
