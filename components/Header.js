import { css } from '@emotion/react';
import Link from 'next/link';

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
    width: 500px;
    justify-content: space-around;
    a {
      color: black;
      text-decoration: none;
      font-size: 28px;
      font-weight: bolder;
      text-align: center;
    }
    a:hover {
      color: white;
      border-bottom: 3px white dotted;
    }
    div:hover {
      cursor: pointer;
      color: white;
      border-bottom: 3px white dotted;
    }
  }
`;

function Header(props) {
  // Function to calculate total items in cookie cart
  const totalItemsInCart = props.itemsInCookieCart.reduce(function (
    acc,
    current,
  ) {
    return acc + current.cartCounter;
  },
  0);

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
        <Link href="/cart" data-test-id="cart-link">
          <div data-test-id="cart-count">🛒 {totalItemsInCart}</div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
