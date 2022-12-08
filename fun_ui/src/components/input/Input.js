import { Route, Router, Routes, Link } from "react-router-dom";
import "./Input.css";
import React, { Component } from "react";

const Input = () => {
  return (
    <div className="input-cont">
      <div className="text">
        <h2>Fill the Details</h2>
        <p>
          Fill the basic details of your investment to get tailored stock
          suggestions
        </p>
      </div>

      <div className="choice">
        <Link className="btn-inputt" to="/form">
          Fill Details
        </Link>
        {/* <Link className='btn-input' to="/ex">Enough Experience</Link>  */}
      </div>
      <div className="padding"></div>
      <div className="choice">
        <Link className="btn-input" to="/">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Input;
