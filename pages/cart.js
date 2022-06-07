import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  addItemToCart,
  countItemsInCart,
  countTotalSum,
  removeItemFromCart,
} from '../util/cartFunctions';

// import { setStringifiedCookie } from '../util/cookies';

// import { productsDatabase } from '../util/database';
const emptyCart = css`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  p {
    border: 1px grey solid;
    border-radius: 100px;
    margin: 0 auto;
    width: 500px;
    padding: 10px;
    font-size: 24px;
    text-align: center;
    transition: transform 0.2s;
  }
  p:hover {
    border-color: white;
    background-color: #90e8e8;
    cursor: pointer;
    transform: scale(1.1);
  }
`;
const cartStyles = css`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  .cartContainer {
    display: flex;
    flex-direction: column;

    .cartProductContainer {
      display: flex;
      width: 800px;
      justify-content: space-between;
      border-bottom: 2px #90e8e8 solid;
      margin: 40px 0px;
      .cartProductImgInfo:hover {
        cursor: pointer;
      }
      .cartProductImgInfo {
        display: flex;
        align-items: center;
        .productImageContainer {
          margin-right: 50px;
        }
        p {
          margin: 0;
          font-weight: bolder;
        }
        p + p {
          font-weight: normal;
        }
      }
      .cartButtonContainer {
        display: flex;
        align-items: center;
        div {
          width: 40%;
          p {
            margin: 0;
          }
        }
        button {
          font-size: 24px;
          background-color: #90e8e8;
          border: none;
          border-radius: 50px;
          height: 40px;
          width: 40px;
          margin: 0 20px;
        }
        button.removeItemButton {
          background-color: white;
          font-size: 12px;
        }
        button:hover {
          cursor: pointer;
          background: #f2f2f2;
        }
      }
    }
  }
  .preCheckout {
    display: flex;
    width: 30%;
    justify-content: space-between;
    p {
      margin: 0;
    }
    p + p {
      font-weight: bolder;
    }
    p.proceedToCheckout {
      border: 1px grey solid;
      border-radius: 100px;
      padding: 10px;
      width: 350px;
      font-size: 20px;
      text-align: center;
      align-self: center;
    }
    p.proceedToCheckout:hover {
      border-color: white;
      cursor: pointer;
      background-color: #90e8e8;
    }
  }
`;

export default function Cart(props) {
  const [cart, setCart] = useState(props.currentCart);
  const totalSum = countTotalSum(cart);
  const totalCount = countItemsInCart(cart);

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
  // console.log(props.currentCart);
  return (
    <div>
      <Head>
        <title>Your shopping cart</title>
        <meta name="description" content="Checkout the items in your cart!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {totalCount === 0 ? (
          <div css={emptyCart}>
            <h1>Oh no! Seems like your cart is empty!</h1>
            <Link href="/products">
              <p>Keep browsing through our products →</p>
            </Link>
          </div>
        ) : (
          <div css={cartStyles}>
            <h1>Items in cart</h1>
            <div className="cartContainer">
              {cart.map((product) => {
                return (
                  <div
                    className="cartProductContainer"
                    key={`product-item-${product.id}`}
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="cartProductImgInfo">
                        <div className="productImageContainer">
                          <Image
                            src={product.image}
                            width={100}
                            height={100}
                            alt={product.name}
                          />
                        </div>
                        <div className="productInfoContainer">
                          <p>{product.brand}</p>
                          <p>{product.type}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="cartButtonContainer">
                      <button
                        onClick={() => {
                          // setIsInCart(props.singleProduct.cartCounter);
                          // setCartCounter(removeItemFromCart(props.singleProduct.id));
                          // decrease();
                          removeItemFromCart(product.id);
                        }}
                      >
                        -
                      </button>
                      <div>
                        <p>Amount: {product.cartCounter}</p>
                        <p>Total: {product.price * product.cartCounter}</p>
                      </div>
                      <button
                        onClick={() => {
                          // setCartCounter(addItemToCart(props.singleProduct.id));
                          // setIsInCart(props.singleProduct.cartCounter);
                          // increase();
                          addItemToCart(product.id);
                        }}
                      >
                        +
                      </button>
                      <button className="removeItemButton">❌</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="preCheckout">
              <div className="totals">
                <p>Total items in cart: {totalCount}</p>
                <p>Total price: {totalSum}</p>
              </div>

              <Link href="/checkout">
                <p className="proceedToCheckout">Proceed to Checkout</p>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getProducts } = await import('../util/database');
  const products = await getProducts();
  const currentCookies = context.req.cookies.cart
    ? JSON.parse(context.req.cookies.cart)
    : [];
  const currentCart = currentCookies.map((item) => {
    const itemInCart = products.find((product) => product.id === item.id);
    return { ...itemInCart, ...item };
  });
  return {
    props: { currentCart },
  };
}
// // get the value of the product from cookies
// const currentCookies = JSON.parse(context.req.cookies.cart || '[]');
// // const products = productsDatabase.find((p) => {
// //   return p.id === context.query.productId;
// // });
// const currentCart = currentCookies.map((product) => {
//   const cartItem = productsDatabase.find((p) => p.id === product.id);

//   return {
//     id: cartItem.id,
//     brand: cartItem.brand,
//     type: cartItem.type,
//     price: cartItem.price,
//     image: cartItem.image,
//     description: cartItem.description,
//   };
// });

// return {
//   props: { productsDatabase, currentCart, currentCookies },
// };
