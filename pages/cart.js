import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { countItemsInCart, countTotalSum } from '../util/calculateTotals';
import { addItemToCart, removeItemFromCart } from '../util/cartFunctions';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';

// import { setStringifiedCookie } from '../util/cookies';

const emptyCart = css`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  p {
    border: 1px grey solid;
    border-radius: 100px;
    margin: 30 auto;
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
      width: 1000px;
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
          font-size: 24px;
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
        .cartInfo {
          p {
            font-size: 20px;
          }
        }
      }
    }
  }
  .preCheckout {
    display: flex;
    width: 1000px;
    justify-content: space-between;
    align-items: center;
    p {
      margin: 0;
    }
    p + p {
      font-weight: bolder;
    }
    .proceedToCheckout {
      font-family: inherit;
      border: 1px grey solid;
      border-radius: 100px;
      padding: 5px 10px;
      width: 400px;
      height: 60px;
      font-size: 20px;

      margin-left: auto;
      /* margin-right: auto; */
      /* align-self: center; */
    }
    .proceedToCheckout:hover {
      border-color: white;
      cursor: pointer;
      background-color: #90e8e8;
      font-weight: bolder;
    }
    button {
      font-size: 24px;
      align-self: center;
      border: none;
      border-radius: 50px;
      height: 40px;
      width: 40px;
      margin: 0 10px;
      background-color: white;
    }
    button:hover {
      cursor: pointer;
      background: #f2f2f2;
    }
  }
`;

export default function Cart(props) {
  const [productCart, setProductCart] = useState(props.currentCart);
  const totalSum = countTotalSum(productCart);
  const totalCount = countItemsInCart(productCart);
  console.log(props.currentCookies);
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
            <h1>You're current total is {totalSum}...</h1>
            <h2>Seems like your cart is empty!</h2>

            <Link href="/products">
              <p>Take a look at our products ???</p>
            </Link>
          </div>
        ) : (
          <div css={cartStyles}>
            <div>
              <h1>Items in cart</h1>
            </div>
            <div className="cartContainer">
              {productCart.map((product) => {
                return (
                  <div
                    className="cartProductContainer"
                    key={`product-item-${product.id}`}
                    data-test-id={`cart-product-${product.id}`}
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="cartProductImgInfo">
                        <div className="productImageContainer">
                          <Image
                            src={`/images/${product.brand}.webp`}
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
                        id="remove"
                        title="Remove"
                        onClick={() => {
                          // onClick change quantity of items in cookie array
                          const newCookie = removeItemFromCart(product.id);
                          props.setItemsInCookieCart(newCookie);

                          // onClick change quantity of items in product array
                          const newCartCounter =
                            product.cartCounter > 1
                              ? product.cartCounter - 1
                              : 0;
                          const updatedCart = productCart.map((items) =>
                            items.id === product.id
                              ? { ...items, cartCounter: newCartCounter }
                              : items,
                          );
                          setProductCart(updatedCart);
                        }}
                      >
                        {/* <button
                        title="Remove"
                        onClick={() => {
                          // onClick change quantity of items in cookie array
                          const newCookie = removeItemFromCart(product.id);
                          props.setItemsInCookieCart(newCookie);

                          // onClick change quantity of items in product array
                          let updatedCart;
                          const newCartCounter =
                            product.cartCounter > 1
                              ? product.cartCounter - 1
                              : (product.cartCounter = 0);
                          if (newCartCounter) {
                            updatedCart = productCart.map((items) =>
                              items.id === product.id
                                ? { ...items, cartCounter: newCartCounter }
                                : items,
                            );
                          } else {
                            const updateArray = productCart.filter(
                              (productDelete) =>
                                productDelete.cartCounter !== 0,
                            );
                            setProductCart(updateArray);
                            const currentCart = getParsedCookie('cart');
                            const currentProduct = currentCart.find(
                              (productInCart) =>
                                product.id === productInCart.id,
                            );
                            currentProduct.cartCounter = 0;
                            updatedCart = currentCart.filter(
                              (currentProductInCart) =>
                                currentProductInCart.cartCounter !== 0,
                            );
                          }

                          setProductCart(updatedCart);
                        }}
                      > */}
                        -
                      </button>
                      <div className="cartInfo">
                        <p data-test-id={`cart-product-quantity-${product.id}`}>
                          Quantity: {product.cartCounter}
                        </p>
                        <p>Total: {product.price * product.cartCounter}</p>
                      </div>
                      <button
                        title="Add"
                        onClick={() => {
                          // onClick change quantity of items in cookie array
                          const newCookie = addItemToCart(product.id);
                          props.setItemsInCookieCart(newCookie);

                          // onClick change quantity of items in product array
                          const newCartCounter = product.cartCounter + 1;
                          const updatedCart = productCart.map((items) =>
                            items.id === product.id
                              ? { ...items, cartCounter: newCartCounter }
                              : items,
                          );
                          setProductCart(updatedCart);
                        }}
                      >
                        +
                      </button>
                      <button
                        title="Delete item from cart"
                        className="removeItemButton"
                        data-test-id={`cart-product-remove-${product.id}`}
                        onClick={() => {
                          product.cartCounter = 0;

                          const updateArray = productCart.filter(
                            (productDelete) => productDelete.cartCounter !== 0,
                          );

                          // 1. update the state
                          setProductCart(updateArray);
                          // 2. cookies begin
                          const currentCart = getParsedCookie('cart');
                          // 3. get the products from the cookies
                          const currentProduct = currentCart.find(
                            (productInCart) => product.id === productInCart.id,
                          );
                          // 4. update the quantity to 0
                          currentProduct.cartCounter = 0;
                          // 5. create new cart
                          const updatedCart = currentCart.filter(
                            (currentProductInCart) =>
                              currentProductInCart.cartCounter !== 0,
                          );
                          // 6. set the new cookie update after deleting
                          props.setItemsInCookieCart(updatedCart);
                          setStringifiedCookie('cart', updatedCart);
                        }}
                      >
                        ???
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="preCheckout">
              <div className="totals">
                <p>Total items in cart: {totalCount}</p>
                <p data-test-id="cart-total">Total price: {totalSum}</p>
              </div>

              <Link href="/checkout">
                <button
                  className="proceedToCheckout"
                  data-test-id="cart-checkout"
                >
                  Proceed to checkout
                </button>
              </Link>
              <button
                className="clearCartButton"
                title="Clear cart"
                onClick={() => {
                  setProductCart([]);
                  props.setItemsInCookieCart([]);
                }}
              >
                ???????
              </button>
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
