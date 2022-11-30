import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Detail.css";
import Embed from "./Embed";

const Detail = () => {
  const [image, setImage] = useState([]);

  const fetchImage = async () => {
    const result = await axios.get("http://localhost:8000/technical/");

    console.log(result.data);
    setImage(result.data);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  //   const goToDetail = () => {
  //     alert("detail page");
  //   };

  return (
    <div>
      <div className="output-cont">
        <h1 className="output-title">Stockname</h1>
        {/* <h1 className="output-title">{image.name}</h1> */}

        <Embed />

        <img variant="top" src={image.image} />
      </div>
    </div>
  );
};

export default Detail;
