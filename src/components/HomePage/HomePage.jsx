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
    const partGarments = ["top", "pants", "coat"];
    const randomNumber = (value) => {
      if (value.length === 0) {
        return null;
      }
      const result = Math.floor(Math.random() * value.length);
      return value[result];
    };

    const filteredObjects = (array, arrayColor) => {
      return array.flatMap((obj) => {
        return obj.colors
          .filter((color) => arrayColor?.includes(color.colorName))
          .map((color) => {
            return {
              garment: obj.garment,
              name: obj.name,
              image: color.imageColor,
              css: obj.css,
              style: obj.style,
              weather: obj.weather,
              color: color,
            };
          });
      });
    };

    //si se hace click sobre abrigo, superior o pantalones
    if (partGarments.includes(idGarment)) {
      const partResults = partGarments.filter((item) => item !== idGarment);

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

      const { combine: outfitColor, combineShoes: shoesColor } =
        randomNumber(arrayColorResult);

      const outfitFilter = filteredObjects(matchingItems, outfitColor);

      const groupedByStyle = outfitFilter.reduce((acc, item) => {
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
                styleItems = null;
                break;
              }
            }
          }

          if (
            styleItems !== null &&
            !Object.values(styleItems).includes(undefined)
          ) {
            selectedItems[style] = styleItems;
          }
        }

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
      const finishClothes = styles[randomKey];

      const findAcc = (attempt = 0) => {
        const maxAttempts = 15;

        if (attempt >= maxAttempts) {
          return null;
        }

        const findShoes = dataJson.filter((item) => item.garment === "shoes");

        let styleResult = findShoes.filter((item) => {
          return item.style.includes(randomKey);
        });

        let searchWeather = styleResult.filter((item) =>
          garmentWeather.every((val) => item.weather.includes(val))
        );

        let finishShoes = filteredObjects(searchWeather, shoesColor);

        if (finishShoes.length === 0) {
          return findAcc(attempt + 1);
        } else if (finishShoes.length === 1) {
          return finishShoes;
        } else if (finishShoes.length > 1) {
          return randomNumber(finishShoes);
        }
      };

      const shoes = findAcc();

      const searchBelt = () => {
        const colorshoes = shoes.color.colorName;
        const searchBelt = dataJson.filter((item) => item.garment === "belt");
        const filteredStyle = searchBelt.filter((item) =>
          item.style.includes(randomKey)
        );

        const filteredColor = filteredObjects(filteredStyle, colorshoes);
        const randomBelt = randomNumber(filteredColor);
        const pants = finishClothes.pants.name;


        if(pants === "joggin" || pants === "bermuda joggin"){
          return null
        }else if( randomBelt === null){
          return filteredStyle.filter((item) =>
          item.color.includes((el) => el.colorName === "black")
        );
        }else return randomBelt
      };
      const belt = searchBelt();
      const pushShoes = { ...finishClothes, shoes };
      const outfitComplete = { ...pushShoes, belt };
      const quitNames = Object.values(outfitComplete);

      const clothesArray = quitNames.map((item) => {
        if (item === null) {
          return null;
        } else {
          return {
            css: item.css,
            src: item.color.imageColor,
            name: item.name,
            garment: item.garment,
            buttonName: item.name,
            key: item.garment,
          };
        }
      });

      const buttonsCopy = JSON.parse(JSON.stringify(infoGarment));
      const buttonsOufit = buttonsCopy.find(item =>{
          clothesArray.map(clothes =>{

            if(clothes.garment === item.garment){
              return 
            }
          })
      })
      /*
         

      const itemFound = newGarmet.find((item) => item.garment === idGarment);
      itemFound ? (itemFound.src = imageColor) : null;
      return newGarmet;
      */
    }
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
