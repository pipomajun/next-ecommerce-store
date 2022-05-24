import { css, Global } from '@emotion/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
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
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
