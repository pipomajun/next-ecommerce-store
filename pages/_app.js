import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';

const cookieBannerStyles = (cookiesAccepted) => css`
  height: ${cookiesAccepted ? '30px' : 0};
  overflow: hidden;
  transition: all 200ms ease-in;
  background-color: lightgrey;
  font-size: 20px;
  text-align: center;
`;
function MyApp({ Component, pageProps }) {
  // useEffect and useState to update cart in header and solve hydration issues - because server side only!!
  // this is first render only
  const [itemsInCookieCart, setItemsInCookieCart] = useState([]);
  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setItemsInCookieCart(currentCart);
  }, []);
  // this useEffect is after first render (whenever quantity changes)
  useEffect(() => {
    setStringifiedCookie('cart', itemsInCookieCart);
  }, [itemsInCookieCart]);

  // useEffect, useState and handleCookies function to accept cookies
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  function handleCookies() {
    // 2. set the value for the cookieBanner
    setLocalStorage('cookiesAccepted', true);
    setCookiesAccepted(true);
  }

  useEffect(() => {
    // 1. we need to check if there is already a value for the cookieBanner
    if (getLocalStorage('cookiesAccepted')) {
      setCookiesAccepted(getLocalStorage('cookiesAccepted'));
    }
  }, []);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            height: 100vh;
            font-size: 24px;
            margin: 0;
            padding: 0;
            font-family: Roboto Mono, -apple-system, BlinkMacSystemFont,
              Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
              Helvetica Neue, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          *,
          ::before,
          ::after {
            box-sizing: border-box;
          }
        `}
      />
      <div css={cookieBannerStyles(!cookiesAccepted)}>
        Would you like to accept supermegaawesome cookies?{' '}
        <button
          onClick={() => {
            handleCookies();
          }}
        >
          Yes
        </button>{' '}
        <button
          onClick={() => {
            handleCookies();
          }}
        >
          Yes
        </button>
      </div>
      <Layout
        itemsInCookieCart={itemsInCookieCart}
        setItemsInCookieCart={setItemsInCookieCart}
      >
        <Component
          {...pageProps}
          itemsInCookieCart={itemsInCookieCart}
          setItemsInCookieCart={setItemsInCookieCart}
        />
      </Layout>
    </>
  );
}

export default MyApp;
