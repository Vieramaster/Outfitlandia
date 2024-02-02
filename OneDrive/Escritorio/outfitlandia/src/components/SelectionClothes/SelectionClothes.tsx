import "./SelectionClothes.css";
import React, { useState, useEffect } from "react";
import ClothingButton from "../ClothingButton/ClothingButton";
import ColorButton from "../ColorButton/ColorButton";
import { clothesType } from "../HomePage/HomePage";

type SelectionClothesTypes = {
  garmentCards: clothesType[];
  onClothesClick: (id: string) => void;
  clothesElection: clothesType[];
  onColorsClick: (colorName: string) => void;
  showClothesButton:boolean;

};
const SelectionClothes = ({
  garmentCards,
  onClothesClick,
  clothesElection,
  onColorsClick,
  showClothesButton, 

}: SelectionClothesTypes) => {
 

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
                nameButton={item.name}
              />
            );
          })}
      </div>
      <div className="SelectionClothes--color">
        {!showClothesButton &&
          clothesElection.map((item) => {
            return item.colors.map((color) => {
              return (
                <ColorButton
                  color={color.hex}
                  name={color.colorName}
                  onClick={onColorsClick}
                  key={color.colorName}
                />
              );
            });
          })}
      </div>
    </div>
  );
};

export default SelectionClothes;
