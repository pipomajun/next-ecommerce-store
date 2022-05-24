import { css } from '@emotion/react';
import Head from 'next/head';

const displayProductsStyle = css`
  width: 100vw;
  h1 {
    text-align: center;
  }
  ul {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto 50px;
    li {
      list-style: none;
    }
  }
`;

export default function Products() {
  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="description" content="Check out what's new!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div css={displayProductsStyle}>
          <h1>Newly in stock!</h1>
          <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
            <li>Product 4</li>
            <li>Product 5</li>
            <li>Product 6</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
