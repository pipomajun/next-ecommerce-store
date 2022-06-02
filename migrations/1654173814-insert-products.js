const products = [
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
      'A dark and spicy flavour of tobacco with clear hints of cherry, almond, wintergreens and raspberry. A well-balanced variant from Nick & Johnny which is relatively strong and offers large portions.',
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

exports.up = async (sql) => {
  await sql`
		INSERT INTO products ${sql(
      products,
      'brand',
      'type',
      'price',
      'image',
      'description',
    )}
	`;
};

exports.down = async (sql) => {
  for (const product of products) {
    await sql`
DELETE FROM
    products
  WHERE
  type = ${product.type}
	`;
  }
};
