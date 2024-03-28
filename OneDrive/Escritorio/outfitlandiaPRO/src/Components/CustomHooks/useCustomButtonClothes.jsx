import { useState } from "react";
import ClothingButton from "../ClothingButton/ClothingButton";
import { defaultGarmentButtons } from "./defaultGarmentButtons";

export default function useCustomButtonClothes() {
  const [infoGarment, setInfoGarment] = useState(defaultGarmentButtons);

  const modifiedButton = (item, index, idProperty, customClick) => {
    return (
      <ClothingButton
        css={item.css}
        src={item.src || item.image}
        id={item[idProperty]}
        buttonName={item.buttonName}
        key={index + item.name}
        onClick={customClick}
      />
    );
  };

  //reinicio de los botones
  const resetButtons = () => {
    setInfoGarment(defaultGarmentButtons);
  };

  //estructura para botones de ropa principales
  const firstModifiedButton = (idProperty, CssType, customClick) => {
    return infoGarment.map((item, index) => {
      return item.css === CssType ?
          modifiedButton(item, index, idProperty, customClick)
        : null;
    });
  };
  //estructura para botonesde ropa secundarios
  const secondModifiedButton = (incomingInfo, idProperty, customClick) => {
    return incomingInfo.map((item, index) => {
      return modifiedButton(item, index, idProperty, customClick);
    });
  };

  //Esta función toma como entrada la prenda y la URL correspondiente. Luego, modifica los botones principales y agrega la imagen donde coincida con la prenda especificada.

  const imageUpdate = (chosenGarment, chosenColor) => {
    const fafa = () => {
      const newGarmet = JSON.parse(JSON.stringify(infoGarment));

      const itemFound = newGarmet.find(item => item.garment === chosenGarment);
      itemFound ? (itemFound.src = chosenColor) : null;
      return newGarmet;
    };

    console.log(fafa());
  };

  return [
    firstModifiedButton,
    secondModifiedButton,
    imageUpdate,
    resetButtons,
    setInfoGarment,
  ];
}
