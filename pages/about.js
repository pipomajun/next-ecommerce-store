import { css } from '@emotion/react';
import Head from 'next/head';

const aboutStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function About() {
  return (
    <div>
      <Head>
        <title>About this app</title>
        <meta
          name="description"
          content="This page tells you more about this app."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div css={aboutStyles}>
          <h1>About this app</h1>
          This e-commerce store is a fictional store as part of a learning
          project for the UpLeveled bootcamp.
        </div>
      </main>
    </div>
  );
}
