import { css } from '@emotion/react';
import Image from 'next/image';
import { productsDatabase } from '../../util/database';

const mainSingleProductStyles = css`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const productItemStyle = css`
  display: flex;
  align-items: center;

  .productTextContainer {
    width: 400px;
    margin-left: 40px;
    button {
      margin-top: 30px;
    }
  }
`;
export default function Product(props) {
  return (
    <div css={mainSingleProductStyles}>
      <div css={productItemStyle}>
        <div className="productImgContainer">
          <Image width="479" height="480" src={props.product.image} alt="img" />
        </div>
        <div className="productTextContainer">
          <h1>{props.product.brand}</h1>
          <h2>{props.product.type}</h2>
          <h3>Price: {props.product.price}</h3>
          <div>{props.product.description}</div>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const product = productsDatabase.find((p) => {
    return p.id === context.query.productId;
  });
  return {
    props: {
      product: product,
    },
  };
}
