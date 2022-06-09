import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const mainSingleProductStyles = css`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const productItemStyle = css`
  display: flex;
  align-items: center;

  .productTextContainer {
    width: 400px;
    margin-left: 80px;

    .addToCartContainer {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .addToCart,
    .proceedToCart {
      border: none;
      border-radius: 100px;
      background-color: #90e8e8;
      font-family: 'Roboto Mono', sans-serif;
      font-size: 20px;
      padding: 5px 10px;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
    }
    .addToCart:hover {
      cursor: pointer;
      background: #f2f2f2;
    }
  }
`;
const counterContainer = css`
  display: flex;
  width: 40%;
  height: 60px;
  margin: 5px auto;
  justify-content: space-around;
  align-items: center;
  button {
    font-size: 24px;
    background-color: #90e8e8;
    border: none;
    border-radius: 50px;
    height: 40px;
    width: 40px;
  }
  button:hover {
    cursor: pointer;
    background: #f2f2f2;
  }
`;

export default function Product(props) {
  // Set useState for for isInCart and cartCounter
  const [isInCart, setIsInCart] = useState(
    'cartCounter' in props.singleProduct,
  );
  console.log(isInCart);
  const [cartCounter, setCartCounter] = useState(
    props.singleProduct.cartCounter || 0,
  );
  console.log(cartCounter);
  // useState for +/- counter
  const [counter, setCounter] = useState(1);

  // Increase counter
  const increase = () => {
    setCounter((count) => count + 1);
  };

  // Decrease counter
  const decrease = () => {
    if (counter > 0) {
      setCounter((count) => count - 1);
    }
  };
  // Handle add to cart
  const handleAddToCart = () => {
    const currentCart = props.itemsInCookieCart;
    let newCart;
    if (
      currentCart.find(
        (productInCart) => props.singleProduct.id === productInCart.id,
      )
    ) {
      newCart = currentCart.map((item) => {
        if (item.id === props.singleProduct.id) {
          return { ...item, cartCounter: counter };
        }
        return item;
      });
      setCartCounter(props.singleProduct.cartCounter);
    } else {
      newCart = [
        ...currentCart,
        { id: props.singleProduct.id, cartCounter: counter },
      ];
      setIsInCart(true);
    }
    props.setItemsInCookieCart(newCart);
  };

  return (
    <div css={mainSingleProductStyles}>
      <div css={productItemStyle}>
        <div className="productImgContainer">
          <Image
            width="479"
            height="480"
            src={props.singleProduct.image}
            alt="img"
            data-test-id="product-image"
          />
        </div>
        <div className="productTextContainer">
          <h1>{props.singleProduct.brand}</h1>
          <h2>{props.singleProduct.type}</h2>
          <h3 data-test-id="product-price">
            Price: {props.singleProduct.price}
          </h3>
          <div className="productDescription">
            {props.singleProduct.description}
          </div>
          <div css={counterContainer}>
            <button
              onClick={() => {
                decrease();
              }}
            >
              -
            </button>
            <p data-test-id="product-quantity">{counter}</p>
            <button
              onClick={() => {
                increase();
              }}
            >
              +
            </button>
          </div>
          <div className="addToCartContainer">
            <button
              className="addToCart"
              data-test-id="product-add-to-cart"
              onClick={() => {
                handleAddToCart();
              }}
            >
              Add to cart 🛒
            </button>
            <Link href="/cart">
              <button className="addToCart">View cart →</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { getProducts } = await import('../../util/database');
//   const products = await getProducts();
//   const currentCookies = context.req.cookies.cart
//     ? JSON.parse(context.req.cookies.cart)
//     : [];
//   const currentCart = currentCookies.map((item) => {
//     const itemInCart = products.find((product) => product.id === item.id);
//     return { ...itemInCart, ...item };
//   });
//   return {
//     props: { currentCart },
//   };
// }
export async function getServerSideProps(context) {
  const { getSingleProduct } = await import('../../util/database');
  const singleProduct = await getSingleProduct(context.query.productId);
  return {
    props: { singleProduct },
  };
}
//
//
// // get the value of the product from cookies
// const currentCookies = JSON.parse(context.req.cookies.cart || '[]');
// // get id from url and match it with product id
// const product = productsDatabase.find((p) => {
//   return p.id === context.query.productId;
// });
// // find object that matches the product in url
// const currentProductInCart = currentCookies.find(
//   (productInCart) => singleProduct.id === productInCart.id,
// );
// // create new object and addthe properties from the cookie to the products in database
// const superProduct = { ...product, ...currentProductInCart };
// return {
//   props: {
//     product: superProduct,
//   },
// };
