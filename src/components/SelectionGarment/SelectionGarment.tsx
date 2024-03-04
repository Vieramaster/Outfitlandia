import "./SelectionGarment.css";
import ClothingButton from "../ClothingButton/ClothingButton";



type garmentButtonsType ={
  css: string;
  src: string;
  name: string;
  garment: string;
  buttonName: string;
  key: string;
}

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
                buttonName={item.buttonName}
              />
            </div>
          );
        }
      })}
      <div className="SelectionGarment--small">
        {garmentButtons.map((item ) => {
          if (item.css === "small" || item.css === "shoes") {
            return (
              <ClothingButton
                onClick={onGarmentClick}
                css={item.css}
                src={item.src}
                key={item.key}
                garment={item.garment}
                buttonName={item.buttonName}
              />
            );
          }
        })}
      </div>
    </div>
  );
  
};

export default SelectionGarment;
/* */