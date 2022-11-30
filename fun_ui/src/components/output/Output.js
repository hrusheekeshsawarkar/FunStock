import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Output.css";

const Output = () => {
  const [stock, setStocks] = useState([]);

  const fetchStocks = async () => {
    const result = await axios.get("http://localhost:8000/fundamental/");

    console.log(result.data);
    setStocks(result.data);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const goToDetail = () => {
    alert("detail page");
  };

  return (
    <div>
      <div className="output-cont">
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

        <div class="flex-container">
          <div class="flex-items">sdfsdfsdfd</div>
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
};

export default Output;
