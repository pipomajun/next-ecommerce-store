import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const mainHeroStyles = css`
  display: flex;
  width: 100vw;
  justify-content: space-evenly;
  .heroImgContainer {
    width: 50%;
    height: 50%;
    padding: 40px;
    img {
      border-radius: 100px;
      opacity: 0.7;
    }
  }
  .heroTextContainer {
    width: 50%;
    height: 50%;
    padding: 40px;
    p {
      border: 1px grey solid;
      border-radius: 100px;
      margin: 0 auto;
      width: 500px;
      padding: 10px;
      font-size: 24px;
      text-align: center;
    }
    p:hover {
      background-color: #90e8e8;
      cursor: pointer;
    }
  }
`;
export default function Home() {
  return (
    <div>
      <Head>
        <title>E-Commerce Store</title>
        <meta
          name="description"
          content="This is a fake online-store for products"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Do i want to make /home a landing page?*/}
      <main css={mainHeroStyles}>
        <div className="heroImgContainer">
          <Image
            src="/../public/images/heroImage.jpg"
            alt="refreshing picture"
            width="2520"
            height="1418"
          />
        </div>
        <div className="heroTextContainer">
          <h1>Welcome at supermegaawesomestore. </h1>
          <h2>You're supermegaawesome for being here!</h2>
          <div>
            Dive into the world of smoke-free, tar-free and ash-free
            alternatives to conventional nicotine products.
            <br />
            <br />
            Originating from Scandinavia, we offer nicotine pouches without
            tobacco and original Snus with tobacco.
            <br />
            <br />
            An alternative you can enjoy anywhere at any time.
          </div>
          <br />
          <br />
          <br />
          <Link href="/products">
            <p>Checkout our line of product brands →</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
