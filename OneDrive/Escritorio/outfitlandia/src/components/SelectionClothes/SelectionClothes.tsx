import "./SelectionClothes.css";

import ClothingButton from "../ClothingButton/ClothingButton";
import ColorButton from "../ColorButton/ColorButton";
import  {colorData ,dataJsonTypes} from "../arrayHooks/arrayHooks"


type selectionTypes ={
  garmentCards: dataJsonTypes[];
  onClothesClick:(id: string) => void;
  colorsElection: colorData[];
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
                key={item.title}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SelectionClothes;
