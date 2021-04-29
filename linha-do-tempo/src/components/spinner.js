import React from "react";

const spinner = () => (
  <div className="container">
    <p style={{ textAlign: "center" }}>Getting individual report</p>
    <div className="loader" style={{ display: "inlineBlock" }} />
  </div>
);

export default spinner;
