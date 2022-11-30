import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AdvancedChart } from "react-tradingview-embed";

const Embed = () => (
  <AdvancedChart widgetProps={{ theme: "dark", symbol: "ADANIPORTS" }} />
);

export default Embed;
