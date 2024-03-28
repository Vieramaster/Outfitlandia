import { useState } from "react";
import ClothingButton from "../ClothingButton/ClothingButton";
import { defaultGarmentButtons } from "./defaultGarmentButtons";

/**
 * 💡 `modifiedButtons` era una funcion que:
 * 1. Devolvia un componente, por lo que tiene que ser un componente.
 * 2. No usaba nada dentro del hook `useCustomButtonClothes` por lo que tiene que estar afuera.
 *
 * Agregue esto para tener mejor autocompletado, removelo si te hace mucho ruido:
 * @param {{
 *   item: (typeof defaultGarmentButtons)[number]
 *   property: keyof item
 *   onClick: import("react").MouseEventHandler<"button">
 * }} props
 */
const ModifiedButton = ({ item, property, onClick }) => (
  <ClothingButton
    css={item.css}
    src={item.src ?? item.image}
    id={item[property]}
    buttonName={item.buttonName}
    onClick={onClick}
  />
);

// 💡 Por las observaciones que vas a ver adentro del hook, Rodo estaba en lo correcto que quizas
// no necesitas un custom hook para esto, porque es solo un `useState` y un par de functiones
// que si te hacen mucho ruido dentro del componente se pueden tener sueltas, pero no hay
// necesidad de teneras en un hook.
export default function useCustomButtonClothes() {
  const [garmentButtons, setGarmentButtons] = useState(defaultGarmentButtons);

  //reinicio de los botones
  const resetButtons = () => setGarmentButtons(defaultGarmentButtons);

  /**
   * Estructura para botones de ropa principales.
   *
   * 💡 Esta funcion podria moverse fuera del hook, y hace practicamente lo
   * mismo que `secondModifiedButton` pero filtra por CssType primero.
   *
   * Agregue esto para tener mejor autocompletado, removelo si te hace mucho ruido:
   * @param {keyof (typeof defaultGarmentButtons)[number]} idProperty
   * @param {(typeof defaultGarmentButtons)[number]["css"]} CssType
   * @param {import("react").MouseEventHandler<"button">} onClick
   */
  const firstModifiedButton = (idProperty, CssType, onClick) =>
    garmentButtons
      .filter(({ css }) => css === CssType)
      .map((item, index) => (
        <ModifiedButton
          item={item}
          key={index + item.name}
          property={idProperty}
          onClick={onClick}
        />
      ));

  /**
   * Estructura para botonesde ropa secundarios.
   *
   * 💡 Esta funcion se podria mover afuera del hook porque no usa nada de este contexto.
   *
   * Agregue esto para tener mejor autocompletado, removelo si te hace mucho ruido:
   * @param {typeof defaultGarmentButtons} incomingInfo
   * @param {keyof (typeof defaultGarmentButtons)[number]} idProperty
   * @param {import("react").MouseEventHandler<"button">} onClick
   */
  const secondModifiedButton = (incomingInfo, idProperty, onClick) =>
    incomingInfo.map((item, index) => (
      <ModifiedButton
        item={item}
        key={index + item.name}
        property={idProperty}
        onClick={onClick}
      />
    ));

  // Esta función toma como entrada la prenda y la URL correspondiente. Luego, modifica los botones principales y agrega la imagen donde coincida con la prenda especificada.

  const imageUpdate = (chosenGarment, chosenColor) => {
    const fafa = () => {
      const newGarmet = JSON.parse(JSON.stringify(garmentButtons));

      const itemFound = newGarmet.find(item => item.garment === chosenGarment);
      itemFound ? (itemFound.src = chosenColor) : null;
      return newGarmet;
    };

    console.log(fafa());
  };

  return [
    firstModifiedButton,
    imageUpdate,
    resetButtons,
    secondModifiedButton,
    setGarmentButtons,
  ];
}
