import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
// import { useState } from 'react';
// import { countItemsInCart, countTotalSum } from '../util/cartFunctions';
import { productsDatabase } from '../util/database';

const cartStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  .itemInCart {
    display: flex;
    align-items: center;
    width: 500px;
    text-align: center;
    justify-content: space-around;
    input {
      width: 30px;
    }
  }
`;

export default function Cart(/* {props}*/) {
  // const [cart, setCart] = useState(props.currentCart);
  // const totalSum = countTotalSum(cart);
  // const totalCount = countItemsInCart(cart);

  return (
    <div>
      <Head>
        <title>Your shopping cart</title>
        <meta name="description" content="Checkout your items in your cart!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div css={cartStyles}>
          <h1>Items in cart</h1>
          <div className="itemInCart">
            <div className="qtyCounter">
              <button className="removeItem">-</button>
              <input type="number" placeholder="0" />
              <button className="addItem">+</button>
            </div>
            <p>Placeholder-item Price</p> <button>Remove item</button>
          </div>
          <button>
            <Link href="/checkout">Proceed to Checkout</Link>
          </button>
        </div>
      </main>
    </div>
  );
}

export function getServerSideProps(context) {
  // get the value of the product from cookies
  const currentCookies = JSON.parse(context.req.cookies.cart || '[]');
  // const products = productsDatabase.find((p) => {
  //   return p.id === context.query.productId;
  // });
  const currentCart = currentCookies.map((product) => {
    const cartItem = productsDatabase.find((p) => p.id === product.id);

    return {
      id: cartItem.id,
      brand: cartItem.brand,
      type: cartItem.type,
      price: cartItem.price,
      image: cartItem.image,
      description: cartItem.description,
    };
  });

  return {
    props: { productsDatabase, currentCart, currentCookies },
  };
}
