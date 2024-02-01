import "./SelectionClothes.css";
import React from "react";
import ClothingButton from "../ClothingButton/ClothingButton";
import ColorButton from "../ColorButton/ColorButton";

type garmentCardType = {
  css: string;
  image: string;
  key: string;
  name: string;
  nameButton: string;
}

type ColorButton = {
  colorName: string;
   hex: string; 
   imgColor: string
}

const SelectionClothes = ({
  garmentCards,
  onClothesClick,
  garmentElection,
  onColorsClick,
}) => {
  console.log(garmentElection);

  return (
    <div className="SelectionClothes">
      <div className="SelectionClothes--box" key="SelectionClothes--box">
        {garmentCards.map(
          (item: garmentCardType ) => {
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
          }
        )}
      </div>
      <div className="SelectionClothes--color">
        {garmentElection.map((item: any) => {
          return item.colors.map(
            (color: ColorButton) => {
              return (
                <ColorButton
                  color={color.hex}
                  name={color.colorName}
                  onClick={onColorsClick}
                />
              );
            }
          );
        })}
      </div>
    </div>
  );
};

export default SelectionClothes;
