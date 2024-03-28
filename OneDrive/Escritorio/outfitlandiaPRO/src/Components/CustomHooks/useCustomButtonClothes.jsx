import { useState } from "react";
import ClothingButton from "../ClothingButton/ClothingButton";

let defaultGarmentButtons = [
  {
    css: "big",
    src: "/src/images/default/defaultTop.webp",
    name: "default-top",
    garment: "top",
    buttonName: "parte superior",
    key: "default-top",
  },
  {
    css: "big",
    src: "/src/images/default/defaultCoat.webp",
    name: "default-coat",
    garment: "coat",
    buttonName: "abrigo",
    key: "default-coat",
  },
  {
    css: "big",
    src: "/src/images/default/defaultPants.webp",
    name: "default-pants",
    garment: "pants",
    buttonName: "pantalones",
    key: "default-pants",
  },

  {
    css: "small",
    src: "/src/images/default/watch.webp",
    name: "default-watch",
    garment: "watch",
    buttonName: "reloj",
    key: "default-watch",
  },
  {
    css: "small",
    src: "/src/images/default/belt.webp",
    name: "default-belt",
    garment: "belt",
    buttonName: "cinturón",
    key: "default-belt",
  },
  {
    css: "shoes",
    src: "/src/images/default/shoes.webp",
    name: "default-shoes",
    garment: "shoes",
    buttonName: "calzado",
    key: "default-shoes",
  },
];

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
      return item.css === CssType
        ? modifiedButton(item, index, idProperty, customClick)
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

      const itemFound = newGarmet.find(
        (item) => item.garment === chosenGarment
      );
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
