import "./Detail.css";
import React, { useState, useEffect } from "react";

function Image(props) {
  const name = props.name;

  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setShowComponent(!showComponent);
    }, 110000);
  }, []);

  return (
    <>
      {" "}
      {showComponent && (
        <img
          variant="top"
          className="image"
          src={require(`../media/${name}.png`)}

          //   src={require("../media/ONGC.png")}
          // src={require({ ON })}
        />
      )}
    </>
  );
}

export default Image;
