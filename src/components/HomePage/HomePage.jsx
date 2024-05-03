import "./HomePage.css";
import SelectionGarment from "../SelectionGarment/SelectionGarment";
import SelectionClothes from "../SelectionClothes/SelectionClothes";
import Weather from "../Weather/Weather";
import { useState, useEffect } from "react";
import useDataJson from "../../CustomHooks/useDataJson";
import {
  filteredObjects,
  OutfitCreator,
  defaultGarmentButtons,
} from "../../CustomHooks/OutfitCreator";

export default function HomePage() {
  const [infoGarment, setInfoGarment] = useState(defaultGarmentButtons);
  const [idGarment, setIdGarment] = useState("");
  const [showGarments, setShowGarments] = useState([]);
  const [showClothes, setShowClothes] = useState({});
  const [garmentColor, setGarmentColor] = useState("");
  const [showColors, setShowColors] = useState({});
  const [divSwap, setDivSwap] = useState(false);
  const [firstButton, setFirstButton] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [addColorButtonCombine, setAddColorButtonCombine] = useState(false);
  const { dataJson, dataColor } = useDataJson();
  const [mobile, setMobile] = useState(window.innerWidth <= 800);
  const [showMobileClothes, setShowMobileClothes] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const findGarments = (data, garment, search) => {
    return data.filter((item) => item[search] === garment);
  };

  // Ingresa el ID para identificar la parte específica de la prenda que debemos buscar. Luego, reiniciamos todos los useState para evitar posibles errores, y finalmente almacenamos la prenda en un estado (useState).
  const onClickGarment = (id) => {
    setDivSwap(false);
    setShowClothes({});
    setShowColors({});
    setIdGarment(id);
    setInfoGarment(defaultGarmentButtons);
    setAddColorButtonCombine(false);
    setFirstButton({});
    const newGarmet = findGarments(dataJson, id, "garment");
    setShowGarments(newGarmet);
    setShowMobileClothes(false);
  };

  //Ingresas el ID, que corresponde al nombre de la prenda seleccionada. Luego, buscamos los colores asociados a esa prenda y los almacenamos en un estado (useState). Además, creamos un estado booleano para alternar entre mostrar las prendas o los colores en la misma sección.
  const OnClickClothes = (id) => {
    const chosenGarment = findGarments(dataJson, id, "name");
    setShowClothes(chosenGarment);
    const [{ colors }] = chosenGarment;
    setShowColors(colors);
    setDivSwap(true);
  };

  // El ID proporciona el nombre del color, lo que nos permite buscar su imagen correspondiente y mostrarla en los botones principales. Así se logra la asociación visual entre los colores y las prendas.
  const onClickColor = (id) => {
    setGarmentColor(id);
    const imageButton = showColors.find((item) => item.colorName === id);

    const filterForButton = filteredObjects(showClothes, imageButton.colorName);

    setFirstButton(filterForButton[0]);

    const newImageButton = () => {
      const newGarmet = JSON.parse(JSON.stringify(infoGarment));

      const foundItem = newGarmet.find((item) => item.garment === idGarment);
      foundItem ? (foundItem.src = filterForButton[0].image) : null;
      return newGarmet;
    };

    setInfoGarment(newImageButton());
    setAddColorButtonCombine(true);
    setShowMobileClothes(true);
  };

  const onClickCombine = () => {
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 500);

    setInfoGarment(
      OutfitCreator(
        infoGarment,
        idGarment,
        showClothes,
        garmentColor,
        firstButton,
        dataJson,
        dataColor
      )
    );
  };

  return (
    <section className="HomePage">
      <SelectionGarment
        {...{
          onClickGarment,
          infoGarment,
          onClickCombine,
          addColorButtonCombine,
          buttonDisabled,
        }}
      />
      <Weather />

      <SelectionClothes
        {...{
          showGarments,
          OnClickClothes,
          showColors,
          divSwap,
          onClickColor,
          mobile,
          showMobileClothes,
        }}
      />
    </section>
  );
}
