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
  garmentButtons: garmentButtons[];
  onGarmentClick: (id: string) => void;
}

const SelectionGarment: React.FC<SelectionGarmentProps> = ({garmentButtons,  onGarmentClick}) => {

  const garmentClick = (id: string) => {
    onGarmentClick(id)
  };

  return (
    <div className="SelectionGarment">
      {garmentButtons.map((item) => {
        if (item.css === "big") {
          return (
            <div className="inventory--big" key={item.key}>
              <ClothingButton
                onClick={garmentClick}
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
        {garmentButtons.map((item) => {
          if (item.css === "small") {
            return (
              <ClothingButton
                onClick={garmentClick}
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
