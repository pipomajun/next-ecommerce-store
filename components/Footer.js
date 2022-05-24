import { css } from '@emotion/react';
import React from 'react';

const footerStyles = css`
  width: 100vw;
  margin: 15px;
  padding: 8px 16px;
  background: #98fb98;
  border-radius: 6px;
  div {
    width: 30%;
    margin: 0 auto;
    text-align: center;
  }
`;

function Footer() {
  return (
    <footer css={footerStyles}>
      <div>This is a supermegaawesome footer with copyright and stuff.</div>
    </footer>
  );
}

export default Footer;
