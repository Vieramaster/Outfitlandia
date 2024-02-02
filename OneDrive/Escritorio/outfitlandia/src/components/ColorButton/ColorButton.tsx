import "./ColorButton.css";

import React from "react";

export type ColorButtonType = {
  color: string;
  name: string;
  onClick: (id: string) => void;
};

const ColorButton = ({ color, name, onClick }: ColorButtonType) => {
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

export default ColorButton;
