import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';

const headerStyles = css`
  margin: 15px;
  padding: 8px 16px;
  background: #98fb98;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
  }
  div > a + a {
    margin-left: 10px;
  }
`;
function Header() {
  return (
    <header css={headerStyles}>
      <h1>
        <Link href="/">🤙 supermegaawesomestore.</Link>
      </h1>
      <div>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products" data-test-id="products-link">
          Products
        </Link>
        <Link href="/cart">🛒 {/* 0 is placeholder for items in cart*/}</Link>{' '}
      </div>
    </header>
  );
}

export default Header;
