import "./HomePage.css";
import SelectionGarment from "../SelectionGarment/SelectionGarment";
import SelectionClothes from "../SelectionClothes/SelectionClothes";
import Weather from "../Weather/Weather";
import { useState } from "react";
import useDataJson from "../../CustomHooks/useDataJson";
import { defaultGarmentButtons } from "../../CustomHooks/defaultGarmentButtons";

export default function HomePage() {
  const { dataJson, dataColor } = useDataJson();
  const [infoGarment, setInfoGarment] = useState(defaultGarmentButtons);
  const [idGarment, setIdGarment] = useState("");
  const [showGarments, setShowGarments] = useState([]);
  const [showClothes, setShowClothes] = useState({});
  const [garmentColor, setGarmentColor] = useState("");
  const [showColors, setShowColors] = useState({});
  const [divSwap, setDivSwap] = useState(false);
  const [newImageSrc, setNewImageSrc] = useState("");
  const [addColorButtonCombine, setAddColorButtonCombine] = useState(false);

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
    setAddColorButtonCombine(false);
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
    setGarmentColor(id);
    const imageButton = showColors.filter((item) => item.colorName === id);
    const [{ imageColor }] = imageButton;
    setNewImageSrc(imageColor);

    const newImageButton = () => {
      const newGarmet = JSON.parse(JSON.stringify(infoGarment));

      const itemFound = newGarmet.find((item) => item.garment === idGarment);
      itemFound ? (itemFound.src = imageColor) : null;
      return newGarmet;
    };
    setAddColorButtonCombine(true);
    setInfoGarment(newImageButton());
  };

  const onClickCombine = () => {
    const partResults = ["top", "pants", "coat"].filter(
      (elemento) => elemento !== idGarment
    );

    const garmentFilter = dataJson.filter((item) =>
      partResults.includes(item.garment)
    );

    const [{ style: garmentStyle, weather: garmentWeather }] = showClothes;

    const matchingItems = garmentFilter.filter((item) =>
      item.style.some(
        (element) =>
          garmentStyle.includes(element) &&
          item.weather.some((element) => garmentWeather.includes(element))
      )
    );

    const arrayColorResult = dataColor.filter((item) =>
      item.combine.includes(garmentColor)
    );

    const randomNumber = (value) => {
      if (value.length === 0) {
        return null;
      }
      const result = Math.floor(Math.random() * value.length);
      return value[result];
    };

    const { combine: outfitColor, combineShoes } =
      randomNumber(arrayColorResult);

    const filteredObjects = matchingItems.map((obj) => {
      let filteredColors = obj.colors.filter((color) =>
        outfitColor?.includes(color.colorName)
      );
      return { ...obj, colors: filteredColors };
    });

    const filteredMap = filteredObjects.flatMap((item) => {
      return item.colors.map((color) => {
        return {
          garment: item.garment,
          name: item.name,
          image: color.imageColor,
          css: item.css,
          style: item.style,
          weather: item.weather,
          color: color,
        };
      });
    });

    const groupedByStyle = filteredMap.reduce((acc, item) => {
      item.style.forEach((style) => {
        if (!acc[style]) {
          acc[style] = [];
        }
        acc[style].push(item);
      });
      return acc;
    }, {});

    const pickStyle = () => {
      let selectedItems = [];
      for (let style of Object.keys(groupedByStyle)) {
        let styleItems = [];

        for (let garment of partResults) {
          let items = groupedByStyle[style].filter(
            (item) => item.garment === garment
          );
          if ((items.length = 2)) {
            let randomItem = randomNumber(items);
            if (randomItem !== null) {
              styleItems[garment] = randomItem;
            } else {
              // Si no hay suficientes objetos nos lo salteamos
              styleItems = null;
              break;
            }
          }
        }
        //agregamos los definidos
        if (
          styleItems !== null &&
          !Object.values(styleItems).includes(undefined)
        ) {
          selectedItems[style] = styleItems;
        }
      }
      // Eliminamos los estilos vacios
      for (let style in selectedItems) {
        if (Object.keys(selectedItems[style]).length === 0) {
          delete selectedItems[style];
        }
      }
      return selectedItems;
    };
    const styles = pickStyle();
    const keys = Object.keys(styles);
    const randomKey = randomNumber(keys);
    const keysResult = styles[randomKey];

    const findShoes = dataJson.filter((item) => item.garment === "shoes");
    const findBelt = dataJson.filter((item) => item.garment === "belt");

    const fafa = () => {
      let searchStyle = findShoes.filter((item) =>
        item.style.includes(randomKey)
      );

      
      let searchWeather = searchStyle.filter((item) =>
        garmentWeather.every((val) => item.weather.includes(val))
      );
    
      let filtered = searchWeather.map((obj) => {
        let filteredColors = obj.colors.filter((color) =>
          combineShoes?.includes(color.colorName)
        );
        return { ...obj, colors: filteredColors };
      });
      const filteredMap = filtered.flatMap((item) => {
        return item.colors.map((color) => {
          return {
            garment: item.garment,
            name: item.name,
            image: color.imageColor,
            css: item.css,
            style: item.style,
            weather: item.weather,
            color: color,
          };
        });
      });
      return filteredMap.length > 0 ? filteredMap : null;
    };
    

    console.log(fafa());
    console.log(randomKey)
  };

  return (
    <section className="HomePage">
      <SelectionGarment
        onClickGarment={onClickGarment}
        infoGarment={infoGarment}
      />
      <Weather
        onClickCombine={onClickCombine}
        addColorButtonCombine={addColorButtonCombine}
      />
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
