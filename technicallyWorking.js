// // Set useState for for isInCart and cartCounter
// const [isInCart, setIsInCart] = useState('cartCounter' in props.singleProduct);
// console.log(isInCart);
// const [cartCounter, setCartCounter] = useState(props.product.cartCounter || 0);
// console.log(cartCounter);
// // useState for +/- counter
// const [counter, setCounter] = useState(0);

// // Increase counter
// const increase = () => {
//   setCounter((count) => count + 1);
// };

// // Decrease counter
// const decrease = () => {
//   if (counter > 0) {
//     setCounter((count) => count - 1);
//   }
// };
// // Handle add to cart
// const handleAddToCart = () => {
//   const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
//   let newCart;
//   if (
//     currentCart.find((productInCart) => props.product.id === productInCart.id)
//   ) {
//     newCart = currentCart.filter(
//       (productInCart) => productInCart !== props.product.id,
//     );
//     setIsInCart(false);
//     setCartCounter(0);
//   } else {
//     newCart = [...currentCart, { id: props.product.id, cartCounter: counter }];
//     setIsInCart(true);
//   }

//   setStringifiedCookie('cart', newCart);
// };
