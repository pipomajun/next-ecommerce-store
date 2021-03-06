import { css } from '@emotion/react';
import React from 'react';

const footerStyles = css`
  margin: 50px 45px 15px;
  padding: 16px 24px;
  background: #90e8e8;
  border-radius: 100px;
  div {
    width: 60%;
    margin: 0 auto;
    font-size: 18px;
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
