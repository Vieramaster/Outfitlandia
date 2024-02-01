import "./SelectionGarment.css";
import React from "react";
import ClothingButton from "../ClothingButton/ClothingButton";

interface garmentButtons {
  css: string;
  src: string;
  name: string;
  garment: string;
  nameButton: string;
  key: string;
  
}

interface SelectionGarmentProps {


  onGarmentClick: (id: string) => void;
  garmentButtons: garmentButtons[];
}
const SelectionGarment: React.FC<SelectionGarmentProps>  = ({garmentButtons,  onGarmentClick}) => {


  return (
    <div className="SelectionGarment">
      {garmentButtons.map((item: garmentButtons) => {
        if (item.css === "big") {
          return (
            <div className="inventory--big" key={item.key}>
              <ClothingButton
                onClick={onGarmentClick}
                css={item.css}
                src={item.src}
                garment={item.garment}
                nameButton={item.nameButton}
              />
            </div>
          );
        }
      })}
      <div className="SelectionGarment--small">
        {garmentButtons.map((item: garmentButtons) => {
          if (item.css === "small") {
            return (
              <ClothingButton
                onClick={onGarmentClick}
                css={item.css}
                src={item.src}
                key={item.key}
                garment={item.garment}
                nameButton={item.nameButton}
              />
            );
          }
        })}
      </div>
    </div>
  );
  
};

export default SelectionGarment;
