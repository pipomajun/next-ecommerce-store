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
