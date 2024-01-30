import "./header.css";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="header--logo">
        <h1>outfilandia</h1>
      </div>
      <button className="header--button">Ingresar</button>
    </header>
  );
};

export default Header;
