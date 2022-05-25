import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { productsDatabase } from '../util/database';

const mainProductsStyles = css`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    text-align: center;
    padding-bottom: 50px;
  }
`;
const displayProductsStyle = css`
  max-width: 80%;
  display: flex;
  /* margin: 0 auto; */
  justify-content: space-around;
  .productItem {
    p {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
  }
`;

export default function Products(props) {
  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="description" content="Check out what's new!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainProductsStyles}>
        <h1>Newly in stock!</h1>
        <div className="displayProductsStyle" css={displayProductsStyle}>
          {props.products.map((product) => {
            return (
              <div className="productItem" key={`product-${product.id}`}>
                <Image
                  src={product.image}
                  alt={`${product.brand} ${product.type}`}
                  width="479"
                  height="480"
                />
                <p>{`${product.brand} ${product.type}`}</p>
              </div>
            );
          })}

          {/* <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
            <li>Product 4</li>
            <li>Product 5</li>
            <li>Product 6</li> */}
        </div>
      </main>
    </div>
  );
}

export function getServerSideProps() {
  return {
    props: {
      products: productsDatabase,
    },
  };
}
