import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Detail.css";
import Embed from "./Embed";
import ON from "../assets/images/ONGC.png";

const Detail = () => {
  const [image, setImage] = useState([]);

  const [searchparams] = useSearchParams();
  const name = searchparams.get("name");
  const price = searchparams.get("price");
  const valuation = searchparams.get("valuation");

  const fetchImage = async () => {
    const url = "http://localhost:8000/technical/";
    const furl = url.concat(name);
    console.log("hello");
    console.log(name);
    console.log(furl);
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
        <h1 className="output-title">{name}</h1>
        <table className="flex-container">
          <div class="flex-items">
            <tr className="flexi-container">
              <td className="flexi-items">{name}</td>
              <td className="flexi-items">{price}</td>
              <td className="flexi-items">{valuation}</td>
            </tr>
          </div>
        </table>
        {/* <h1 className="output-title">{image.name}</h1> */}
        <Embed name={name} />
        <img
          variant="top"
          className="image"
          // src={require(`./media/${name}.png`)}
          // src={require("/media/ONGC.png")}
          src={require({ ON })}
        />
        {/* {images.map(({ name }) => (
          <img className="image" src={require(`./media/${name}.png`)} />
        ))} */}
        {/* `/uploads/${img.img.path}` */}
      </div>
    </div>
  );
};

export default Detail;
