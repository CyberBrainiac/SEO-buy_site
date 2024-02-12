import React, { useEffect, useState } from 'react';
import style from './calculator.module.scss';

interface CalculatorProps {
  pricePerRequest: number;
}

const Calculator: React.FC<CalculatorProps> = ({ pricePerRequest }) => {
  const [inputVal, setInputVal] = useState('');
  const [result, setResult] = useState(0);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const result = pricePerRequest * +value;

    if (+value < 0 || +value > 10_000_000 || +value % 1 !== 0) {
      event.target.style.borderColor = '#ff0000';
      setResult(0);
      return;
    }

    event.target.style.borderColor = '#6a87ca';
    setInputVal(value);
    setResult(+result.toFixed(4));
    return;
  }

  useEffect(() => {
    const initialInputValue = '1000';
    setInputVal(initialInputValue);
    setResult(pricePerRequest * +initialInputValue);
  }, [pricePerRequest]);

  return (
    <section className="calculator">
      <div className={style.container}>
        <div className={style.container_decore}></div>
        <div className={style.contentWrap}>
          <h4>Calculate Cost</h4>
          <h6>per 1 keyword</h6>
          <label htmlFor="countUrl">Urls count:</label>
          <input
            onChange={handleInput}
            id="countUrl"
            type="number"
            min={0}
            max={1_000_000}
            value={inputVal}
          ></input>
          <div className={style.resultWrap}>
            <div className={style.result}>
              Cost: <span>{result}</span>$
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
