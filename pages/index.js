import { css } from '@emotion/react';
import Head from 'next/head';

const heroStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
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
      <main>
        <div css={heroStyles}>
          <h1>Welcome at supermegaawesomestore. </h1>
          <h2>You're supermegaawesome for being here!</h2>
        </div>
      </main>
    </div>
  );
}
