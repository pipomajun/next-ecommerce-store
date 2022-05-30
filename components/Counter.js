import { css } from '@emotion/react';
import { React, useState } from 'react';

const counterContainer = css`
  display: flex;
  width: 40%;
  height: 60px;
  margin: 5px auto;
  justify-content: space-around;
  align-items: center;
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

export default function Counter() {
  const [counter, setCounter] = useState(0);

  // increase counter
  const increase = () => {
    setCounter((count) => count + 1);
  };

  // decrease counter
  const decrease = () => {
    if (counter > 0) {
      setCounter((count) => count - 1);
    }
  };

  return (
    <div css={counterContainer}>
      <button onClick={decrease}>-</button>
      <p>{counter}</p>
      <button onClick={increase}>+</button>
    </div>
  );
}
