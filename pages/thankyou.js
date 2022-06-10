import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const thankyouStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    font-family: inherit;
    border: 1px grey solid;
    border-radius: 100px;
    padding: 5px 10px;
    width: 400px;
    height: 60px;
    font-size: 20px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
    a {
      text-decoration: none;
      color: black;
    }
  }
  button:hover {
    border-color: white;
    cursor: pointer;
    background-color: #90e8e8;
    font-weight: bolder;
  }
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Thank You</title>
        <meta name="description" content="Thank you for your order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Do i want to make /home a landing page?*/}
      <main css={thankyouStyles}>
        <h1>Thank you for your order!</h1>
        <h2>You're supermegaawesome.</h2>
        <h2>Cheers to you!</h2>
        <button>
          <Link href="/products">Continue shopping!</Link>
        </button>
      </main>
    </div>
  );
}
