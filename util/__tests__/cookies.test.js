import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
} from '../cookies';

test('CRUD the cookies', () => {
  // declare an example cookie "cart"
  const cookie = { key: 'cart', value: [{ id: 1, quantity: 1 }] };
  // get the cookies
  expect(getParsedCookie(cookie.key)).toStrictEqual([]);
  // set cookies without error
  expect(() => setStringifiedCookie(cookie.key, cookie.value)).not.toThrow();
  // after getting it, the array should not be empty
  expect(getParsedCookie(cookie.key)).toStrictEqual([{ id: 1, quantity: 1 }]);
  // when quantity changed, the quantity should be matched and no errors should be thrown
  expect(() =>
    setStringifiedCookie(cookie.key, [{ id: 1, quantity: 3 }]),
  ).not.toThrow();
  expect(getParsedCookie(cookie.key)).toStrictEqual([{ id: 1, quantity: 3 }]);
  // delete the cookies
  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toStrictEqual([]);
});
