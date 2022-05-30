import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useState } from 'react';
// import Counter from '../../components/Counter';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { productsDatabase } from '../../util/database';

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
    margin-left: 40px;

    .addToCartContainer {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .addToCart {
      border: none;
      border-radius: 100px;
      background-color: #90e8e8;
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
  const [isInCart, setIsInCart] = useState('cartCounter' in props.product);
  const [cartCounter, setCartCounter] = useState(
    props.product.cartCounter || 0,
  );
  // Handle add to cart
  const handleAddToCart = () => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    let newCart;
    if (
      currentCart.find((productInCart) => props.product.id === productInCart.id)
    ) {
      newCart = currentCart.filter(
        (productInCart) => productInCart !== props.product.id,
      );
      setIsInCart(false);
      setCartCounter(0);
    } else {
      newCart = [...currentCart, { id: props.product.id, cartCounter: 0 }];
      setIsInCart(true);
    }

    setStringifiedCookie('cart', newCart);
  };

  // variables needed for +/- counter
  const [counter, setCounter] = useState(0);

  // increase counter
  const increase = () => {
    setCounter((count) => count + 1);
  };
  const addItemToCart = () => {
    setCartCounter(cartCounter + 1);
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    const productInCurrentCart = currentCart.find(
      (productInCart) => props.product.id === productInCart.id,
    );
    productInCurrentCart.cartCounter += 1;
    setStringifiedCookie('cart', currentCart);
  };
  // decrease counter
  const decrease = () => {
    if (counter > 0) {
      setCounter((count) => count - 1);
    }
  };

  return (
    <div css={mainSingleProductStyles}>
      <div css={productItemStyle}>
        <div className="productImgContainer">
          <Image width="479" height="480" src={props.product.image} alt="img" />
        </div>
        <div className="productTextContainer">
          <h1>{props.product.brand}</h1>
          <h2>{props.product.type}</h2>
          <h3>Price: {props.product.price}</h3>
          <div className="productDescription">{props.product.description}</div>
          <div css={counterContainer}>
            <button onClick={decrease}>-</button>
            <p>{counter}</p>
            <button onClick={(increase, addItemToCart)}>+</button>
          </div>
          <div className="addToCartContainer">
            <button className="addToCart" onClick={handleAddToCart}>
              Add to cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  // get the value of the product from cookies
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  // get id from url and match it with product id
  const product = productsDatabase.find((p) => {
    return p.id === context.query.productId;
  });
  // find object that matches the product in url
  const productInCurrentCart = currentCart.find(
    (productInCart) => product.id === productInCart.id,
  );
  // create new object and addthe properties from the cookie to the products in database
  const superProduct = { ...product, ...productInCurrentCart };
  return {
    props: {
      product: superProduct,
    },
  };
}
