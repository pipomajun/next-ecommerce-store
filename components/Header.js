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
  div > a + a {
    margin-left: 10px;
  }
`;
function Header() {
  return (
    <header css={headerStyles}>
      <h1>🤙 supermegaawesomestore.</h1>
      <div>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
      </div>
    </header>
  );
}

export default Header;
