import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';

// import { countItemsInCart } from '../util/cartFunctions';

// import { getParsedCookie } from '../util/cookies';

const headerStyles = css`
  margin: 15px;
  padding: 16px 24px;
  background: #90e8e8;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  h1 {
    margin-left: 30px;
  }
  h1:hover {
    cursor: pointer;
  }

  .navContainer {
    display: flex;
    align-items: center;
    margin-right: 30px;
    width: 400px;
    justify-content: space-around;
    a {
      color: black;
      text-decoration: none;
      font-size: 24px;
      font-weight: bolder;
      text-align: center;
    }
    a:hover {
      color: white;
      border-bottom: 3px white dotted;
    }
  }
`;
// Function to count items in cart and display it in header
// const cartCount = () => {
//   try {
//     return getParsedCookie('cart');
//   } catch (err) {
//     return;
//   }
// };

// const itemsInCart = cartCount();

// const totalItemsInCart =
//   typeof itemsInCart === 'undefined' ? 0 : countItemsInCart(cartCount());

function Header() {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <h1>🤙 supermegaawesomestore.</h1>
      </Link>

      <div className="navContainer">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products" data-test-id="products-link">
          Products
        </Link>
        <Link href="/cart">🛒 </Link>
      </div>
    </header>
  );
}

export default Header;
