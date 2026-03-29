import React, { useEffect, useState } from "react";
import "./Currency.css";
import { GoArrowSwitch } from "react-icons/go";
import axios from "axios";

function Currency() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(0);
  const [currencies, setCurrencies] = useState([]);

  const exchange = async () => {
    try {
      const res = await axios.get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.toLowerCase()}.json`,
      );

      const rates = res.data[fromCurrency.toLowerCase()];

      const rate = rates[toCurrency.toLowerCase()];

      const converted = (Number(amount) * rate).toFixed(2);

      setResult(converted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      const res = await axios.get(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json",
      );

      const currencyList = Object.keys(res.data)
        .filter((cur) => cur.length === 3)
        .map((cur) => cur.toUpperCase());

      setCurrencies(currencyList);
    };

    fetchCurrencies();
  }, []);

  return (
    <div className="currency-card">
      <h1>Currency Converter</h1>

      <div className="currency-row">
        <div className="input-group left-group">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Amount"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies?.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <button className="switch-btn" onClick={handleSwitch}>
          <GoArrowSwitch size={16} />
        </button>

        <div className="input-group right-group">
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies?.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
          <input value={result} type="number" placeholder="Amount" readOnly />
        </div>
      </div>

      <div>
        <button onClick={exchange} className="convert-btn">
          Convert
        </button>
      </div>
    </div>
  );
}

export default Currency;
