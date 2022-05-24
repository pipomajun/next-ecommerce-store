import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>E-Commerce Store</title>
        <meta
          name="description"
          content="This is a online-store for products"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to my store! </h1>

        <div>Some div</div>
      </main>

      <footer>
        <h2>This is a footer.</h2>
      </footer>
    </div>
  );
}
