import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';
import { ProductType } from './types';

setPostgresDefaultsOnHeroku();

config();
// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}
// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// Get all products from database

export async function getProducts() {
  const products = await sql<ProductType[]>`
  SELECT * FROM products
  `;
  return products.map((product) => camelcaseKeys(product));
}

// Get single product from database
export async function getSingleProduct(id: number | undefined) {
  if (!id) return undefined;
  const [product] = await sql<[ProductType | undefined]>`
  SELECT * FROM products WHERE id=${id}
  `;
  return product && camelcaseKeys(product);
}
export const productsDatabase = [
  {
    id: '1',
    brand: 'G.4',
    type: 'Deep Freeze All White Slim',
    price: 6,
    image: '/../public/images/G4.webp',
    description:
      'G.4 DEEP FREEZE has a light and spicy character with clear elements of eucalyptus and menthol.',
  },
  {
    id: '2',
    brand: 'LOOP',
    type: 'Habanero Mint Extra Strong',
    price: 5,
    image: '/../public/images/Loop.webp',
    description:
      'LOOP Habanero Mint has, as the name suggests, a hot taste of the habanero chili interspersed with a fresh taste of mint.',
  },
  {
    id: '3',
    brand: 'FEDRS',
    type: 'Ice Cool Mint Hard',
    price: 5,
    image: '/../public/images/Fedrs.webp',
    description:
      'FEDRS Ice Cool Mint Hard have a combination of frosty freshness with a high nicotine content. The high concentration of active ingredients in Mint Hard will be a real discovery for experienced Fedrs lovers.',
  },
  {
    id: '4',
    brand: 'Kapten',
    type: 'Vit White Portion',
    price: 4,
    image: '/../public/images/Kapten.webp',
    description:
      'Kapten White Portion is in many ways very similar to other Kapten products; a very round, well-balanced taste of tobacco in a large pouch for a good experience.',
  },

  {
    id: '5',
    brand: 'Nick and Johnny',
    type: 'Americana Xtra Strong Portion',
    price: 6,
    image: '/../public/images/NickAndJohnny.webp',
    description:
      'A dark and spicy flavour of tobacco with clear hints of cherry, almond, wintergreens and raspberry. A well-balanced variant from Nick & Johnn which is relatively strong and offers large portions.',
  },
  {
    id: '6',
    brand: 'Thunder',
    type: 'Frosted Slim All White',
    price: 4,
    image: '/../public/images/Thunder.webp',
    description:
      'Thunder Frosted Slim All White is a powerful snus in a slim format, with a taste of mint.',
  },
];
