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

      let finishClothes, coatColor, topColor;
      let selectedItems, randomKey;

      do {
        selectedItems = pickStyle();
        let keys = Object.keys(selectedItems);
        randomKey = randomNumber(keys);
        let finishRandom = selectedItems[randomKey];
        finishClothes = { ...finishRandom, firstButton };

        for (let key in finishClothes) {
          if (finishClothes[key].garment === "coat") {
            coatColor = finishClothes[key].color.colorName;
          } else if (finishClothes[key].garment === "top") {
            topColor = finishClothes[key].color.colorName;
          }
        }
      } while (coatColor === topColor);

      const findAcc = (attempt = 0) => {
        const maxAttempts = 20;

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
          return finishShoes[0];
        } else if (finishShoes.length > 1) {
          let random = randomNumber(finishShoes);
          if (
            random.color.colorName !== finishClothes["pants"].color.colorName
          ) {
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
      console.log(shoes);
      const pushShoes = { ...finishClothes, shoes };

      const searchBelt = () => {
        const colorshoes = shoes.color.colorName;
        const searchBelt = dataJson.filter((item) => item.garment === "belt");
        const filteredStyle = searchBelt.filter((item) =>
          item.style.includes(randomKey)
        );

        const filteredColor = filteredObjects(filteredStyle, colorshoes);
        const randomBelt = randomNumber(filteredColor);
        const pants = finishClothes.pants.name;

        if (pants === "joggin" || pants === "bermuda joggin") {
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
