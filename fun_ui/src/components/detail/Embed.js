import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AdvancedChart } from "react-tradingview-embed";

function Embed(props) {
  const name = props.name;

  return <AdvancedChart widgetProps={{ theme: "light", symbol: name }} />;
}
export default Embed;
