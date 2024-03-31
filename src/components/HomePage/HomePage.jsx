import "./HomePage.css";
import SelectionGarment from "../SelectionGarment/SelectionGarment";
import SelectionClothes from "../SelectionClothes/SelectionClothes";
import Weather from "../Weather/Weather";

import { useState } from "react";
import useDataJson from "../CustomHooks/useDataJson";

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

    const  newImageButton = () => {
      const newGarmet = JSON.parse(JSON.stringify(infoGarment));

      const itemFound = newGarmet.find((item) => item.garment === idGarment);
      itemFound ? (itemFound.src = imageColor) : null;
      return newGarmet;
    };
    setInfoGarment(newImageButton())
  };

  return (
    <section className="HomePage">
      <SelectionGarment onClickGarment={onClickGarment} infoGarment={infoGarment}/>
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
