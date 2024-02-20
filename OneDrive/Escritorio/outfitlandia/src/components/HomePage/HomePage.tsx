import "./HomePage.css";
import { useState } from "react";
import {
  dataJsonTypes,
  useDataBase,
  colorData,
  useColorsData,
} from "../arrayHooks/ArrayHooks";
import SelectionClothes from "../SelectionClothes/SelectionClothes";
import SelectionGarment from "../SelectionGarment/SelectionGarment";
import Weather from "../Weather/Weather";

const HomePage = () => {
  const defaultGarmentButtons = [
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
  const [garmentId, setGarmentId] = useState("");
  const [garmentCards, setGarmentCards] = useState<dataJsonTypes[]>([]);
  const [garmentObject, setGarmentObject] = useState<
    dataJsonTypes | undefined
  >();
  const [colorsElection, setColorsElection] = useState<colorData[]>([]);
  const [showClothesButton, setShowButtonsBUtton] = useState(false);
  const [garmentColor, setGarmentColor] = useState<string | undefined>();

  const [filteredGarmentButtons, setFilteredGarmentButtons] = useState(
    defaultGarmentButtons
  );
 
  const { data } = useDataBase();

  //con el ID se prepara para buscar y mandar la nueva informacion a su segundo hijo, pero si se hace nuevamente click, reinicia gameCards
  const onGarmentClick = (id: string) => {
    setGarmentId(id);
    setTimeout(() => {
      setFilteredGarmentButtons(defaultGarmentButtons);
      setGarmentColor(undefined);
      setShowButtonsBUtton(true);
      setGarmentCards(data.filter((item) => item.garment === id));
    }, 200);
  };

  const garmentCard = (value: string) => {
    return defaultGarmentButtons.map((item) =>
      item.garment === garmentId ? { ...item, src: value } : item
    );
  };

  // con el ID se busca el objeto del array y sus colores, se usa la parte "colors" para buscar info de dataColor y que devuelta nueva informacion, y con eso llevarla al segundo hijo nuevamente
  const onClothesClick = (id: string) => {
    setTimeout(() => {
      setShowButtonsBUtton(false);
      const garmentChoise = data.find((item) => item.name === id);
      if (!garmentChoise || typeof garmentChoise.colors === "string") return;

      setGarmentObject(garmentChoise);
      setColorsElection(garmentChoise.colors);
      setFilteredGarmentButtons(garmentCard(garmentChoise.image));
    }, 200);
  };

  //se utiliza la nueva informacion para actualizar las cards de selectionGarment segun el color que se elija,  se unifica las 2 busquedas para crear un objetos con los 2 resultados (prenda y color) para hacer la busqueda de combinaciones.
  const onColorsClick = (id: string) => {
    const newCardGarmentColor = colorsElection.find(
      (item) => item.title === id
    );

    if (!newCardGarmentColor) return;

    setGarmentColor(newCardGarmentColor.colorName);
    setFilteredGarmentButtons(garmentCard(newCardGarmentColor.imageColor));
  };
  // habilita el boton para combinar


  const validButton = Boolean( garmentObject && garmentColor)

  const { arrayColorsData } = useColorsData();

  //genera las combinaciones de ropa

  const onCombineClothes = () => {
    if (garmentObject && garmentColor) {
      garmentObject.colors = garmentColor;
      //busca los que coincidan con style y weather
      const arrayGarmentResults = data.filter((item) => {
        let styleMatch = item.style.some((style) =>
          garmentObject.style.includes(style)
        );
        let weatherMatch = item.weather.some((weather) =>
          garmentObject.weather.includes(weather)
        );
        return (
          item.garment !== garmentObject.garment && styleMatch && weatherMatch
        );
      });
      //usa el color que se eligio para buscar en el json de colores las combinaciones
      const arrayColorResult = arrayColorsData.filter((item) =>
        item.includes(garmentColor)
      );
      //devuelve lo
      const findMatchingColors = (
        {colors, ...item}: (typeof arrayGarmentResults)[number] ,
        colorArray: string[]
      ) => {
        const matchingColors = Array.isArray(colors)?colors.filter((color) =>
          colorArray.includes(color.colorName)
        ):[]
        return { ...item, colors: matchingColors };
      };

      const result = arrayColorResult.map((colorArray) =>
        arrayGarmentResults
          .map((item) => findMatchingColors(item, colorArray))
          .filter((item) => item.colors.length > 0)
      );

      const fafa = result.map((item) => {});
      console.log(result);
    }
  };

  return (
    <section className="HomePage">
      <div className="HomePage--box">
        <SelectionGarment
          garmentButtons={filteredGarmentButtons}
          onGarmentClick={onGarmentClick}
        />
        <Weather
          onCombineClothes={onCombineClothes}
          onValidButton={validButton}
        />
        <SelectionClothes
          garmentCards={garmentCards}
          onClothesClick={onClothesClick}
          colorsElection={colorsElection}
          onColorsClick={onColorsClick}
          showClothesButton={showClothesButton}
        />
      </div>
    </section>
  );
};

export default HomePage;
