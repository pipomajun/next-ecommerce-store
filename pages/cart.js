import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

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

export default function Cart() {
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
