import { render } from "@testing-library/react";
import React, { Component } from "react";
import { Route, Router, Routes, Link } from "react-router-dom";
import axios from "axios";

import "./landing.css";

//  const Landing = () =>{
class Landing extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    let data;

    axios
      .get("http://localhost:8000/wel/")
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {});
  }
  render() {
    return (
      <div className="test">
        <div className="title">
          <h1>FunStock</h1>
        </div>
        <div className="para">
          <div className="obj">
            <h2>Objectives</h2>
            <div className="obj-items">
              Research and implement the optimal machine learning techniques for
              Stock Market Prediction
            </div>
            <div className="obj-items">
              To pick the optimal stocks according to user's risk appetite
            </div>
            <div className="obj-items">
              To facilitate better investment decisions in the market
            </div>
          </div>
        </div>
        <div className="landing-btnn">
          <Link className="landing-btn" to="/input">
            Get Started
          </Link>
        </div>
        {/* <div>
            {this.state.details.map((detail, id) =>  (
            <div key={id}>
            <div >
                  <div >
                        <h1>{detail.capital} </h1>
                        <footer >--- by
                        <cite title="Source Title">
                        {detail.years}</cite>
                        </footer>
                  </div>
            </div>
            </div>
            )
        )}
      </div> */}
      </div>
    );
  }
}

export default Landing;
