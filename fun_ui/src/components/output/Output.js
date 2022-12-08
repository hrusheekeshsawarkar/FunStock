import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import "./Output.css";

const Output = () => {
  const [stocks, setStocks] = useState([]);

  const fetchStocks = async () => {
    const result = await axios.get("http://localhost:8000/fundamental/");
    // const fresult = JSON.parse(result.data);
    // console.log(JSON.parse(fresult));

    console.log("raw");
    console.log(result.data);
    setStocks(result.data);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const navigate = useNavigate();

  function openprofile(stockName, Price, Valuation) {
    navigate({
      pathname: "/detail",
      search: createSearchParams({
        name: stockName,
        price: Price,
        valuation: Valuation,
      }).toString(),
    });
  }
  const str = stocks.stockName;
  return (
    <div>
      <div className="output-cont">
        <h1 className="output-title">Stock Recommendations</h1>
        <p>Stock Recommendations based on your investment plan</p>

        <table className="flex-container">
          <tr className="flex-items t">
            <div className="flexi-container">
              <th className="flexi-items">Stock Name</th>
              <th className="flexi-items">Price</th>
              <th className="flexi-items">Valuation</th>
              <th className="flexi-items">Further Analysis</th>
            </div>
          </tr>
          {stocks.map((stocks, index) => {
            return (
              <div className="flex-items">
                <tr key={index} className="flexi-container">
                  <td className="flexi-items">{stocks.StockName}</td>
                  <td className="flexi-items">{stocks.StockPrice}</td>
                  <td className="flexi-items">{stocks.Valuation}</td>
                  <td className="flexi-items">
                    <button
                      className="output-btn flexi-items"
                      onClick={() =>
                        openprofile(
                          stocks.StockName,
                          stocks.StockPrice,
                          stocks.Valuation
                        )
                      }
                    >
                      Further Analysis
                    </button>
                  </td>
                </tr>
              </div>
            );
          })}
        </table>
      </div>
    </div>
  );
  // export const str = stocks.stockName;
};
// export str;
export default Output;
