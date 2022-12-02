import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Detail.css";
import Embed from "./Embed";

const Detail = () => {
  const [image, setImage] = useState([]);

  const [searchparams] = useSearchParams();
  const state = searchparams.get("id");

  const fetchImage = async () => {
    const url = "http://localhost:8000/technical/";
    const furl = url.concat(state);
    // const result = await axios.get("http://localhost:8000/technical/", {
    //   params: { state },
    // });
    const result = await axios.get(furl);
    // console.log(url);

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
        <h1 className="output-title">{state}</h1>
        {/* <h1 className="output-title">{image.name}</h1> */}
        <Embed name={state} />
        <img variant="top" src={image.image} />
      </div>
    </div>
  );
};

export default Detail;
