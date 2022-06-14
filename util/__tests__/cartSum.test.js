import { countTotalSum } from '../calculateTotals';
test('calculate the total sum of the cart', () => {
  const currentCart = [
    { id: 3, cartCounter: 7, price: 5 },
    { id: 5, cartCounter: 5, price: 6 },
  ];

  expect(countTotalSum(currentCart)).toBe(65);
});
