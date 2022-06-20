import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  margin: 45px;
  padding: 16px 24px;
  background: #90e8e8;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  p {
    margin-left: 30px;
    font-size: 36px;
    font-weight: bold;
  }
  p:hover {
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
    p {
      font-size: 24px;
      margin-left: -30px;
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
        <p>🤙 supermegaawesomestore.</p>
      </Link>

      <div className="navContainer">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/products">
          <a data-test-id="products-link">Products</a>
        </Link>
        <Link href="/cart">
          <a data-test-id="cart-link">🛒 </a>
        </Link>
        <p data-test-id="cart-count">{totalItemsInCart}</p>
      </div>
    </header>
  );
}

export default Header;
