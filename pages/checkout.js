import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const checkoutPage = css`
  width: 100vw;

  .checkoutForm {
    width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    input {
      float: right;
    }
    label {
      margin-bottom: 15px;
    }
  }
`;

export default function Checkout() {
  return (
    <div css={checkoutPage}>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout and confirm order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form className="checkoutForm">
          <label>
            First Name
            <input data-test-id="checkout-first-name" />
          </label>
          <label>
            Last Name
            <input data-test-id="checkout-last-name" />
          </label>
          <label>
            E-Mail
            <input data-test-id="checkout-email" type="email" />
          </label>
          <label>
            Address
            <input data-test-id="checkout-address" />
          </label>
          <label>
            City
            <input data-test-id="checkout-city" />
          </label>
          <label>
            Postal Code
            <input data-test-id="checkout-postal-code" />
          </label>
          <label>
            Country
            <input data-test-id="checkout-country" />
          </label>
          <label>
            Credit Card No.
            <input
              data-test-id="checkout-credit-card"
              type="number"
              maxLength={12}
            />
          </label>
          <label>
            Credit Card Expiration Date
            <input
              data-test-id="checkout-expiration-date"
              type="number"
              maxLength={4}
              placeholder="MM/YY"
            />
          </label>
          <label>
            Security Code
            <input data-test-id="checkout-security-code" type="password" />
          </label>
        </form>
        <button>
          <Link href="/thankyou">Confirm order</Link>
        </button>
      </main>
    </div>
  );
}
