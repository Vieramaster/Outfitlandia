import "./SelectionGarment.css";
import React from "react";
import ClothingButton from "../ClothingButton/ClothingButton";
import {garmentButtonsType} from "../HomePage/HomePage"


type SelectionGarmentType = {

  onGarmentClick: (id: string) => void;
  garmentButtons: garmentButtonsType[];
}
const SelectionGarment = ({garmentButtons,  onGarmentClick}: SelectionGarmentType) => {


  return (
    <div className="SelectionGarment">
      {garmentButtons.map((item) => {
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
        {garmentButtons.map((item ) => {
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
