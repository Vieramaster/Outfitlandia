import "./HomePage.css";
import SelectionGarment from "../SelectionGarment/SelectionGarment";
import SelectionClothes from "../SelectionClothes/SelectionClothes";
import Weather from "../Weather/Weather";

import { useState } from "react";
import useDataJson from "../CustomHooks/useDataJson";
import { defaultGarmentButtons } from "../CustomHooks/defaultGarmentButtons";

export default function HomePage() {
  const { dataJson } = useDataJson();
  const [infoGarment, setInfoGarment] = useState(defaultGarmentButtons);
  const [idGarment, setIdGarment] = useState("");
  const [showGarments, setShowGarments] = useState([]);
  const [showClothes, setShowClothes] = useState({});
  const [showColors, setShowColors] = useState({});
  const [divSwap, setDivSwap] = useState(false);
  const [newImageSrc, setNewImageSrc] = useState("");

  const findGarments = (garment, search) => {
    return dataJson.filter((item) => item[search] === garment);
  };

  // Ingresa el ID para identificar la parte específica de la prenda que debemos buscar. Luego, reiniciamos todos los useState para evitar posibles errores, y finalmente almacenamos la prenda en un estado (useState).
  const onClickGarment = (id) => {
    setDivSwap(false);
    setShowClothes({});
    setShowColors({});
    setNewImageSrc("");
    setIdGarment(id);
    setInfoGarment(defaultGarmentButtons);
    const newGarmet = findGarments(id, "garment");
    setShowGarments(newGarmet);
  };

  //Ingresas el ID, que corresponde al nombre de la prenda seleccionada. Luego, buscamos los colores asociados a esa prenda y los almacenamos en un estado (useState). Además, creamos un estado booleano para alternar entre mostrar las prendas o los colores en la misma sección.
  const OnClickClothes = (id) => {
    const chosenGarment = findGarments(id, "name");
    setShowClothes(chosenGarment);
    const [{ colors }] = chosenGarment;
    setShowColors(colors);
    setDivSwap(true);
  };

  // El ID proporciona el nombre del color, lo que nos permite buscar su imagen correspondiente y mostrarla en los botones principales. Así se logra la asociación visual entre los colores y las prendas.
  const onClickColor = (id) => {
    const imageButton = showColors.filter((item) => item.colorName === id);
    const [{ imageColor }] = imageButton;
    setNewImageSrc(imageColor);

    const newImageButton = () => {
      const newGarmet = JSON.parse(JSON.stringify(infoGarment));

      const itemFound = newGarmet.find((item) => item.garment === idGarment);
      itemFound ? (itemFound.src = imageColor) : null;
      return newGarmet;
    };
    setInfoGarment(newImageButton());
  };

  return (
    <section className="HomePage">
      <SelectionGarment
        onClickGarment={onClickGarment}
        infoGarment={infoGarment}
      />
      <Weather />
      <SelectionClothes
        showGarments={showGarments}
        OnClickClothes={OnClickClothes}
        showColors={showColors}
        divSwap={divSwap}
        onClickColor={onClickColor}
      />
    </section>
  );
}
