import "./ColorButton.css";

import React from "react";

const ColorButton = ({ color, name, onClick }:{color:string, name: string, onClick:(id:string)=> string}) => {
  
  return (
        <button
        className="colorButton"
        style={{ backgroundColor: color }}
        aria-label={name}
        id={name}
        onClick={(event) => onClick(event.currentTarget.id)}
        />
  );
  
};



export default ColorButton


