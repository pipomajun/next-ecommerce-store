import { css } from '@emotion/react';
import React from 'react';

const footerStyles = css`
  margin: 15px;
  padding: 16px 24px;
  background: #90e8e8;
  border-radius: 100px;
  div {
    width: 30%;
    margin: 0 auto;
    text-align: center;
  }
`;

function Footer() {
  return (
    <footer css={footerStyles}>
      <div>© This is a supermegaawesome footer with copyright and stuff.</div>
    </footer>
  );
}

export default Footer;
