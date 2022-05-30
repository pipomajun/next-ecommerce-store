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
