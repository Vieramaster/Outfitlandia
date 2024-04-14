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
  const [firstButton, setFirstButton] = useState({});

  const [addColorButtonCombine, setAddColorButtonCombine] = useState(false);

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
      let shoesColor;

      const pickStyle = ( ) => {

        let findColors = dataColor.filter(
          (item) => item.combineClothes[idGarment] === garmentColor
        );

        let randomCombineColor = randomNumber(findColors);

        let { combineShoes } = randomCombineColor;

        shoesColor = combineShoes;

        const filteredColors = (obj) => {
          let searchColor = randomCombineColor.combineClothes[obj];
          let findGarments = matchingItems.filter(
            (item) => item.garment === obj
          );
          let findColor = findGarments.filter((item) =>
            item.colors.some((color) => color.colorName === searchColor)
          );
          return filteredObjects(findColor, searchColor);
        };

        let firstObject = filteredColors(partResults[0]);
        let secondObject = filteredColors(partResults[1]);

        let outfitFilter = firstObject.concat(secondObject);

        const groupedByStyle = outfitFilter.reduce((acc, item) => {
          item.style.forEach((style) => {
            if (!acc[style]) {
              acc[style] = [];
            }
            acc[style].push(item);
          });
          return acc;
        }, {});

        const weatherFilter = (array) => {
          let result = null;

          for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
              if (
                array[i].weather.some((weather) =>
                  array[j].weather.includes(weather)
                )
              ) {
                result = [array[i], array[j]];
                break;
              }
            }
            if (result) break;
          }
          return result;
        };

        let selectedItems = [];

        for (let style of Object.keys(groupedByStyle)) {
          selectedItems[style] = [];

          for (let style of Object.keys(groupedByStyle)) {
            selectedItems[style] = [];

            for (let garment of partResults) {
              let returnItem = [];
              let items = groupedByStyle[style].filter(
                (item) => item.garment === garment
              );
              if (items.length === 0) {
                returnItem = null;
              } else if (items.length === 1) {
                returnItem = items[0];
              } else if (items.length > 1) {
                returnItem = randomNumber(items);
              }
              selectedItems[style].push(returnItem);
            }

            if (selectedItems[style].includes(null)) {
              delete selectedItems[style];
            }
          }
          if (Object.keys(selectedItems).length === 0) {
            return pickStyle();
          } else if (Object.keys(selectedItems).length === 1) {
            let key = Object.keys(selectedItems)[0];
            let result = selectedItems[key];
            let weather = weatherFilter(result);

            if (weather !== null) {
              return [style, result];
            } else pickStyle();
          } else if (Object.keys(selectedItems).length > 1) {
            let randomStyle = randomNumber(Object.keys(selectedItems));

            let weather2 = weatherFilter(selectedItems[randomStyle]);

            if (weather2 !== null) {
              return [randomStyle, selectedItems[randomStyle]];
            } else pickStyle();
          }
        }
      };

      const filteredClothes = pickStyle();
      console.log(filteredClothes);
      const styleClothes = filteredClothes[0];
      const clothes = filteredClothes[1];

      const finishClothes = [...clothes, firstButton];
      const findAcc = (attempt = 0) => {
        const maxAttempts = 20;

        if (attempt === maxAttempts) {
          return null;
        }

        let findShoes = dataJson.filter((item) => item.garment === "shoes");

        let styleResult = findShoes.filter((item) => {
          return item.style.includes(styleClothes);
        });

        let searchWeather = styleResult.filter((item) =>
          garmentWeather.every((val) => item.weather.includes(val))
        );

        let finishShoes = filteredObjects(searchWeather, shoesColor);

        if (finishShoes.length === 0) {
          return findAcc(attempt + 1);
        } else if (finishShoes.length === 1) {
          return finishShoes[0];
        } else if (finishShoes.length > 1) {
          let random = randomNumber(finishShoes);

          let pants = finishClothes.find((item) => item.garment === "pants");

          if (random.color.colorName !== pants.color.colorName) {
            return random;
          } else {
            let blackShoes = finishShoes.find(
              (shoe) =>
                shoe.color.colorName === "black" ||
                shoe.color.colorName === "white"
            );

            return blackShoes;
          }
        }
      };

      const shoes = findAcc();
      const pushShoes = [...finishClothes, shoes];

      const searchBelt = () => {
        let colorshoes = shoes.color.colorName;
        let searchBelt = dataJson.filter((item) => item.garment === "belt");
        let filteredStyle = searchBelt.filter((item) =>
          item.style.includes(styleClothes)
        );

        let filteredColor = filteredObjects(filteredStyle, colorshoes);
        let randomBelt = randomNumber(filteredColor);
        let pants = finishClothes.find((item) => item.garment === "pants");

        if (pants.name === "joggin" || pants.name === "bermuda joggin") {
          return null;
        } else if (randomBelt === null) {
          return filteredStyle.filter((item) =>
            item.color.includes((el) => el.colorName === "black")
          );
        } else return randomBelt;
      };
      const belt = searchBelt();

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
      const buttonsOufit = buttonsCopy.map((button) => {
        const matchingClothes = clothesArray.find(
          (clothes) => clothes && clothes.garment === button.garment
        );
        return matchingClothes || { ...button, src: "" };
      });

      setInfoGarment(buttonsOufit);
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
