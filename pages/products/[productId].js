import { productsDatabase } from '../../util/database';

export default function Product(props) {
  return (
    <div>
      <h1>{props.product.brand}</h1>
      <h2>{props.product.type}</h2>
      <div>{props.product.price}</div>
      <div>{props.product.description}</div>
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
