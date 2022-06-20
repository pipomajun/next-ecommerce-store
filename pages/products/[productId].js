import { css } from '@emotion/react';
// import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// import { getSingleProduct } from '../../util/database';
// import { queryParamToNumber } from '../../util/queryParams';
// import { CookiesType, ProductType } from '../../util/types';

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
    margin-left: 80px;
    .productPrice {
      font-size: 28px;
      font-weight: bolder;
    }
    .productDescription {
      margin-top: 15px;
    }

    .addToCartContainer {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .addToCart,
    .proceedToCart {
      border: none;
      border-radius: 100px;
      background-color: #90e8e8;
      font-family: 'Roboto Mono', sans-serif;
      font-size: 20px;
      padding: 5px 10px;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
    }
    .addToCart:hover,
    .proceedToCart:hover {
      cursor: pointer;
      background: #f2f2f2;
    }
  }
`;
const counterContainer = css`
  display: flex;
  width: 40%;
  height: 60px;
  margin: 5px auto;
  justify-content: space-around;
  align-items: center;
  input {
    border: none;
    width: 50px;
    text-align: center;
    font-size: 24px;
    font-family: inherit;
  }
  button {
    font-size: 24px;
    background-color: #90e8e8;
    border: none;
    border-radius: 50px;
    height: 40px;
    width: 40px;
  }
  button:hover {
    cursor: pointer;
    background: #f2f2f2;
  }
`;
// type Props = {
//   singleProduct: ProductType; // double-check with Lukas
//   itemsInCookieCart: CookiesType[];
//   setItemsInCookieCart: any;
// };

export default function Product(props) {
  // // Set useState for for isInCart and cartCounter
  // const [isInCart, setIsInCart] = useState(
  //   'cartCounter' in props.singleProduct,
  // );
  // console.log(isInCart);
  // useState for +/- counter
  const [counter, setCounter] = useState(1);
  const [cartCounter, setCartCounter] = useState(counter);
  console.log(cartCounter);
  if (!props.singleProduct) {
    return (
      <div css={mainSingleProductStyles}>
        <Head>
          <title>Product not found</title>
          <meta
            name="description"
            content="Unfortunately, we have had trouble locating the product you're looking for. Better luck next time."
          />
        </Head>

        <h1>
          Oops! It seems like we have troubles locating the requested product...
        </h1>
      </div>
    );
  }
  // Increase counter
  const increase = () => {
    setCounter((count) => count + 1);
  };

  // Decrease counter
  const decrease = () => {
    if (counter > 0) {
      setCounter((count) => count - 1);
    }
  };
  // Handle add to cart
  const handleAddToCart = () => {
    const currentCart = props.itemsInCookieCart;
    let newCart;
    if (
      currentCart.find(
        (productInCart) => props.singleProduct.id === productInCart.id,
      )
    ) {
      newCart = currentCart.map((item) => {
        if (item.id === props.singleProduct.id) {
          return { ...item, cartCounter: counter };
        }
        return item;
      });
      setCartCounter(props.singleProduct.cartCounter);
    } else {
      newCart = [
        ...currentCart,
        { id: props.singleProduct.id, cartCounter: counter },
      ];
      // setIsInCart(true);
    }
    props.setItemsInCookieCart(newCart);
  };

  return (
    <div>
      <Head>
        <title>{props.singleProduct.brand}</title>
        <meta name="description" content={props.singleProduct.type} />
      </Head>
      <div css={mainSingleProductStyles}>
        <div css={productItemStyle}>
          <div className="productImgContainer">
            <Image
              width="479"
              height="480"
              src={`/images/${props.singleProduct.brand}.webp`}
              alt={props.singleProduct.brand}
              data-test-id="product-image"
            />
          </div>
          <div className="productTextContainer">
            <h1>{props.singleProduct.brand}</h1>
            <h2>{props.singleProduct.type}</h2>
            <div className="productPrice" data-test-id="product-price">
              Price:{' '}
              <span data-test-id="product-price">
                {props.singleProduct.price}
              </span>
            </div>
            <div className="productDescription">
              {props.singleProduct.description}
            </div>
            <div css={counterContainer}>
              <button
                onClick={() => {
                  decrease();
                }}
              >
                -
              </button>
              <input data-test-id="product-quantity" readOnly value={counter} />
              {/* <p>{counter}</p> */}
              <button
                onClick={() => {
                  increase();
                }}
              >
                +
              </button>
            </div>
            <div className="addToCartContainer">
              <button
                className="addToCart"
                data-test-id="product-add-to-cart"
                onClick={() => {
                  handleAddToCart();
                }}
              >
                Add to cart 🛒
              </button>
              <Link href="/cart">
                <button className="proceedToCart">View cart →</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { getProducts } = await import('../../util/database');
//   const products = await getProducts();
//   const currentCookies = context.req.cookies.cart
//     ? JSON.parse(context.req.cookies.cart)
//     : [];
//   const currentCart = currentCookies.map((item) => {
//     const itemInCart = products.find((product) => product.id === item.id);
//     return { ...itemInCart, ...item };
//   });
//   return {
//     props: { currentCart },
//   };
// }
//
//
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const productId = queryParamToNumber(context.query.id);
//   const singleProduct = await getSingleProduct(productId);
//   if (!singleProduct) {
//     context.res.statusCode = 404;
//   }

//   return {
//     props: {
//       product: singleProduct || null,
//     },
//   };
// }
//
//
export async function getServerSideProps(context) {
  const { getSingleProduct } = await import('../../util/database');
  const singleProduct = await getSingleProduct(context.query.productId);
  return {
    props: { singleProduct },
  };
}
