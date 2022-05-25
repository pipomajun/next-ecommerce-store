import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const thankyouStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
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
