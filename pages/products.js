import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { productsDatabase } from '../util/database';

const mainProductsStyles = css`
  width: 100vw;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: center;
    padding-bottom: 50px;
  }
  .productsDisplay {
    display: flex;
    justify-content: space-evenly;
    .productItem {
      padding: 10px;
      border: 4px #90e8e8 dotted;
      transition: transform 0.2s;
    }
    .productItem:hover {
      background-color: #f2f2f2;
      cursor: pointer;
      transform: scale(1.2);
    }
    p {
      margin: 10px auto;
      text-align: center;
      max-width: 200px;
      font-size: 24px;
      font-weight: bolder;
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
        <h1>All Products</h1>
        <div className="productsDisplay">
          {props.products.map((product) => {
            return (
              <Link
                href={`/products/${product.id}`}
                key={`product-${product.id}`}
              >
                <div className="productItem">
                  <Image
                    src={product.image}
                    alt={`${product.brand} ${product.type}`}
                    width="279"
                    height="280"
                  />
                  <p>{`${product.brand} ${product.type}`}</p>
                </div>
              </Link>
            );
          })}
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
