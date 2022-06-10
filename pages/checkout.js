import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { countItemsInCart, countTotalSum } from '../util/calculateTotals';

const checkoutStyles = css`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  // checkout info section
  .checkoutInfo {
    display: flex;
    flex-direction: column;
    align-self: center;
    padding-top: 30px;
    p {
      margin: 5px;
    }
  }
  // checkout form section
  .checkoutForm {
    width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    input {
      float: right;
      width: 65%;
      height: 30px;
      font-size: 20px;
    }
    label {
      margin-bottom: 15px;
    }
    .personalDetails {
      display: flex;
      flex-direction: column;
    }
    .shippingDetails {
      display: flex;
      flex-direction: column;
    }
    .creditCardDetails {
      display: flex;
      flex-direction: column;
    }
  }
  // confirm order section
  .checkoutConfirm {
    align-self: center;
    border: 1px #90e8e8 solid;
    border-radius: 100px;
    padding: 10px;
    width: 700px;
    font-size: 24px;
    text-align: center;
    background-color: #90e8e8;
    margin-top: 25px;
    a {
      text-decoration: none;
      font-weight: 500;
      color: black;
      font-family: 'Roboto Mono', sans-serif;
    }
  }
  .checkoutConfirm:hover {
    border-color: grey;
    cursor: pointer;
    background-color: #f2f2f2;
    a {
      font-weight: 700;
    }
  }
`;

export default function Checkout(props) {
  const [checkoutCart, setCheckoutCart] = useState(props.currentCart);
  const totalCount = countItemsInCart(checkoutCart);
  const totalSum = countTotalSum(checkoutCart);
  return (
    <div>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout and confirm order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div css={checkoutStyles}>
          <div className="checkoutInfo">
            <p>
              You have {totalCount} items in your supermegaawesome checkout cart
            </p>
            <p>The total price is {totalSum}!</p>
          </div>
          <div className="checkoutFormWrapper">
            <form className="checkoutForm">
              <div className="personalDetails">
                <h2>👤 Personal Details</h2>
                <label>
                  First Name
                  <input
                    placeholder="Harl"
                    data-test-id="checkout-first-name"
                  />
                </label>
                <label>
                  Last Name
                  <input
                    placeholder="Korky"
                    data-test-id="checkout-last-name"
                  />
                </label>
                <label>
                  E-Mail
                  <input
                    placeholder="harl.korky@example.com"
                    data-test-id="checkout-email"
                    type="email"
                  />
                </label>
              </div>
              <div className="shippingDetails">
                <h2>🛳️ Shipping Details</h2>
                <label>
                  Address
                  <input
                    placeholder="Markhofgasse 19"
                    data-test-id="checkout-address"
                  />
                </label>
                <label>
                  City
                  <input placeholder="Vienna" data-test-id="checkout-city" />
                </label>
                <label>
                  Postal Code
                  <input
                    placeholder="1030"
                    data-test-id="checkout-postal-code"
                  />
                </label>
                <label>
                  Country
                  <input
                    placeholder="Austria"
                    data-test-id="checkout-country"
                  />
                </label>
              </div>
              <div className="creditCardDetails">
                <h2>💳 Payment Information</h2>
                <label>
                  Credit Card No.
                  <input
                    placeholder="1234 5678 1234 5678"
                    data-test-id="checkout-credit-card"
                    type="number"
                    maxLength={12}
                  />
                </label>
                <label>
                  Expiration Date
                  <input
                    data-test-id="checkout-expiration-date"
                    type="number"
                    maxLength={4}
                    placeholder="MM/YY"
                  />
                </label>
                <label>
                  Security Code
                  <input
                    placeholder="123"
                    data-test-id="checkout-security-code"
                    type="password"
                  />
                </label>
              </div>
            </form>
          </div>
          <button className="checkoutConfirm">
            <Link href="/thankyou">Confirm Order</Link>
          </button>
        </div>
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
