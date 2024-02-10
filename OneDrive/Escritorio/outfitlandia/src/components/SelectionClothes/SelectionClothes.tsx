import "./SelectionClothes.css";
import React from "react";
import ClothingButton from "../ClothingButton/ClothingButton";
import ColorButton from "../ColorButton/ColorButton";
import {newColors,dataJsonTypes} from "../arrayHooks/arrayHooks"


type selectionTypes ={
  garmentCards: dataJsonTypes[];
  onClothesClick:(id: string) => void;
  colorsElection: newColors[];
  onColorsClick:(id: string) => void;
  showClothesButton: boolean
}



const SelectionClothes = ({
  garmentCards,
  onClothesClick,
  colorsElection,
  onColorsClick,
  showClothesButton,
}:
(selectionTypes)) => {
  return (
    <div className="SelectionClothes">
      <div className="SelectionClothes--box" key="SelectionClothes--box">
        {showClothesButton &&
          garmentCards.map((item) => {
            return (
              <ClothingButton
                onClick={onClothesClick}
                css={item.css}
                src={item.image}
                key={item.name}
                garment={item.name}
                buttonName={item.name}
              />
            );
          })}
      </div>
      <div className="SelectionClothes--color">
        {!showClothesButton &&
          colorsElection.map((item) => {
            return (
              <ColorButton
                color={item.hex}
                name={item.title}
                buttonName={item.colorName}
                onClick={onColorsClick}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SelectionClothes;
