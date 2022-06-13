import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
    text-decoration: none;
    font-weight: 500;
    color: black;
    font-family: 'Roboto Mono', sans-serif;
  }
  .checkoutConfirm:hover {
    border-color: grey;
    cursor: pointer;
    background-color: #f2f2f2;
    font-weight: 700;
  }
`;

export default function Checkout(props) {
  const totalCount = countItemsInCart(props.currentCart);
  const totalSum = countTotalSum(props.currentCart);
  // useRouter - Link component in the button would not handleSubmit
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setItemsInCookieCart([]);
    router.push('/thankyou').catch(() => {});
  };
  console.log(props.itemsInCookieCart);
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
            <form className="checkoutForm" onSubmit={handleSubmit}>
              <div className="personalDetails">
                <h2>👤 Personal Details</h2>
                <label>
                  First Name
                  <input
                    placeholder="Harl"
                    data-test-id="checkout-first-name"
                    required
                  />
                </label>
                <label>
                  Last Name
                  <input
                    placeholder="Korky"
                    data-test-id="checkout-last-name"
                    required
                  />
                </label>
                <label>
                  E-Mail
                  <input
                    placeholder="harl.korky@example.com"
                    data-test-id="checkout-email"
                    type="email"
                    required
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
                    required
                  />
                </label>
                <label>
                  City
                  <input
                    placeholder="Vienna"
                    data-test-id="checkout-city"
                    required
                  />
                </label>
                <label>
                  Postal Code
                  <input
                    placeholder="1030"
                    data-test-id="checkout-postal-code"
                    required
                  />
                </label>
                <label>
                  Country
                  <input
                    placeholder="Austria"
                    data-test-id="checkout-country"
                    required
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
                    required
                    maxLength="12"
                  />
                </label>
                <label>
                  Expiration Date
                  <input
                    data-test-id="checkout-expiration-date"
                    type="number"
                    maxLength="4"
                    placeholder="MM/YY"
                    required
                  />
                </label>
                <label>
                  Security Code
                  <input
                    placeholder="123"
                    maxLength="3"
                    data-test-id="checkout-security-code"
                    type="password"
                    required
                  />
                </label>
              </div>
              <button
                data-test-id="checkout-confirm-order"
                className="checkoutConfirm"
              >
                Confirm Order
              </button>
            </form>
          </div>
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
