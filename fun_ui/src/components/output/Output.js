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
        {/* {stocks.map((stocks, index) => (
            <Card
              className="m-3 rounded shadow-lg main-students-show"
              style={{ width: "22em" }}
            >
              <Card.Img variant="top" src={stock.image} /> 

              <Card.Body>
                <Card.Title>{stocks.stockName}</Card.Title>
                <Card.Text> {stocks.ticker} </Card.Text>
                <Card.Text> {stocks.price} </Card.Text>
                <Card.Text> {stocks.valuation} </Card.Text>

                <Link className="btn btn-primary mr-2" to={`/${stock.id}`}>
                  Full Detail
                </Link>
              </Card.Body>
            </Card>
          ))} */}

        {/* {stocks.map((stocks, index) => (
          <div class="flex-container">
            <div class="flex-items">
              <div className="flexi-container" key={index}>
                {/* <tr key={}></tr> 
                <div className="flexi-items">{stocks.StockName}</div>
                {/* <div className="flexi-items">{stocks.Ticker}</div> 
                <div className="flexi-items">{stocks.StockPrice}</div>
                <div className="flexi-items">{stocks.Valuation}</div>
                <div className="flexi-items">
                  <button
                    className="output-btn"
                    onClick={() => openprofile(stocks.StockName)}
                  >
                    Full Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))} */}

        <table className="flex-container">
          <tr className="flex-items t">
            <div className="flexi-container">
              <th className="flexi-items">Stock Name</th>
              <th className="flexi-items">Price</th>
              <th className="flexi-items">Valuation</th>
              <th className="flexi-items">Detail Analysis</th>
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
                      Full Detail
                    </button>
                  </td>
                </tr>
              </div>
            );
          })}
        </table>

        <div class="flex-container">
          <div class="flex-items">
            <div className="flexi-container">
              <div className="flexi-items">Stockname</div>
              <div className="flexi-items">ticker</div>
              <div className="flexi-items">price</div>
              <div className="flexi-items">valuation</div>
              <div className="flexi-items">
                <Link className="output-btn" to="/detail">
                  Full Detail{" "}
                </Link>
              </div>
            </div>
          </div>
          <div class="flex-items">dsfsfsdf</div>
          <div class="flex-items">sdfsdfsdf</div>
          <div class="flex-items">ggsrgrege</div>
          <div class="flex-items">rgergergerg</div>
          <div class="flex-items">ergergergergeg</div>
          <div class="flex-items">ergergerg</div>
          <div class="flex-items">egergerge</div>
        </div>
      </div>
    </div>
  );
  // export const str = stocks.stockName;
};
// export str;
export default Output;
