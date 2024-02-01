import "./SelectionClothes.css";
import React from "react";
import ClothingButton from "../ClothingButton/ClothingButton"


const SelectionClothes = ({arrayFiltered, onClothesClick}) => {



  return (
    <div className="SelectionClothes">
      <div className="SelectionClothes--box">
      {arrayFiltered.map(item => {
         
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
      <div className="SelectionClothes--color"></div>
    </div>
  );
};

export default SelectionClothes;
