

export let defaultGarmentButtons = [
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

// Genera un nuevo objeto utilizando el color asignado en la combinación, eliminando los demás colores y ajustándolo para que sea compatible con los botones.
export function filteredObjects(array, arrayColor) {
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
}

export function OutfitCreator(
  infoGarment,
  idGarment,
  showClothes,
  garmentColor,
  firstButton,
  dataJson,
  dataColor
) {
  //prevenir el spam del click


  const partGarments = ["top", "pants", "coat"];
  // funcion generica para elegir objetos aleatoriamente
  const randomNumber = (value) => {
    if (value.length === 0) {
      return null;
    }
    const result = Math.floor(Math.random() * (value.length));
    return value[result];
  };
  

  //  Función genérica en la que verificamos que todos tengan una clave en común.
  const keyFilter = (array, key) => {
    let result = null;

    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (!array[i][key].some((item) => array[j][key].includes(item))) {
          return null;
        } else {
          result = [array[i], array[j]];
        }
      }
    }

    return result;
  };

  //si se hace click sobre el abrigo, superior o pantalones

  //Selecciono la prenda elegida y la utilizo para buscar el resto de prendas en los datos disponibles.
  const partResults = partGarments.filter((item) => item !== idGarment);

  const garmentFilter = dataJson.filter((item) =>
    partResults.includes(item.garment)
  );

  // Extraigo las claves de la prenda elegida para utilizarlas como filtros más adelante.
  const [{ style: garmentStyle, weather: garmentWeather }] = showClothes;

  const matchingItems = garmentFilter.filter((item) =>
    item.style.some(
      (element) =>
        garmentStyle.includes(element) &&
        item.weather.some((element) => garmentWeather.includes(element))
    )
  );
  // Dejo una variable sin declarar para utilizarla más adelante en la función pickStyle().
  let shoesColor;

  const pickStyle = (attempt = 0) => {
    if (attempt === 200) {
      alert("No se encontrado ningun outfit");
    }

    // Identificamos el color de la prenda y seleccionamos uno al azar.
    let findColors = dataColor.filter(
      (item) => item.combineClothes[idGarment] === garmentColor
    );

    let randomCombineColor = randomNumber(findColors);



    let { combineShoes } = randomCombineColor;

    shoesColor = combineShoes;

    // Busqueda de objetos mediante las prendas restantes, para luego crear un solo array.
    const filteredColors = (obj) => {
      let searchColor = randomCombineColor.combineClothes[obj];
      let searchGarmentOutfit = matchingItems.filter(
        (item) => item.garment === obj
      );
      let findColor = searchGarmentOutfit.filter((item) =>
        item.colors.some((color) => color.colorName === searchColor)
      );
      return filteredObjects(findColor, searchColor);
    };

  
    let firstObject = filteredColors(partResults[0]);
    let secondObject = filteredColors(partResults[1]);

    let outfitFilter = firstObject.concat(secondObject);


    // Organizamos los estilos según el style de las prendas.”
    const groupedByStyle = outfitFilter.reduce((acc, item) => {
      item.style.forEach((style) => {
        if (!acc[style]) {
          acc[style] = [];
        }
        acc[style].push(item);
      });
      return acc;
    }, {});

    //  Funcion generica del cual me otorga el style en común.
    const styleFilter = (array) => {
      let commonStyles = array[0].style;

      for (let i = 1; i < array.length; i++) {
        commonStyles = commonStyles.filter((style) =>
          array[i].style.includes(style)
        );
      }

      return commonStyles.length > 0 ? commonStyles[0] : null;
    };


    // Identificamos los estilos que tienen las dos partes y, si hay varios, elegimos uno al azar.
    let selectedItems = [];

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

      //Aplicamos filtros de estilo y clima para asegurarnos de que todo coincida y para evitar errores. En caso de que algo falle, volvemos a ejecutar la función principal pickStyle().
      if (Object.keys(selectedItems).length === 0) {
        return pickStyle(attempt + 1);
      } else if (Object.keys(selectedItems).length === 1) {
        let key = Object.keys(selectedItems)[0];

        let updateoutfit = [...selectedItems[key], firstButton];

        let weather = keyFilter(updateoutfit, "weather");
        let style = keyFilter(updateoutfit, "style");
        let styleName = styleFilter(updateoutfit);
        if (weather !== null && style !== null && updateoutfit !== undefined) {

          return [styleName, updateoutfit];
        } else pickStyle(attempt + 1);
      } else if (Object.keys(selectedItems).length > 1) {
        let randomStyle = randomNumber(Object.keys(selectedItems));
        let updateoutfit2 = [...selectedItems[randomStyle], firstButton];
        let weather2 = keyFilter(updateoutfit2, "weather");
        let style2 = keyFilter(updateoutfit2, "style");

        let styleName2 = styleFilter(updateoutfit2 , "2 ");

        if (
          weather2 !== null &&
          style2 !== null &&
          updateoutfit2 !== undefined
        ) {

          return [styleName2, updateoutfit2];
        } else pickStyle(attempt + 1);
      }
    
  };

  // Volvemos a ejecutar la funcion en caso de que salga algun tipo de error.
  let filteredClothes;
  do {
    filteredClothes = pickStyle();
  } while (!filteredClothes || (filteredClothes[0] === undefined && filteredClothes[1] === undefined));
  


  // Sustraemos del array el estilo y las prendas.
  let styleClothes = filteredClothes[0];

  let finishClothes = filteredClothes[1];

  // Se elimina el abrigo en el caso de que sean prendas de verano
  if (keyFilter(finishClothes, "weather") === "heat") {
    finishClothes = finishClothes.filter((item) => item.garment !== "coat");
  }

  // Con la información previa, procedemos a buscar el calzado adecuado.
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
      // Realizamos una selección para asegurarnos de que el color del calzado no coincida con el del pantalón.
      if (random.color.colorName !== pants.color.colorName) {
        return random;
      } else {
        let blackShoes = finishShoes.find(
          (shoe) =>
            shoe.color.colorName === "white" || shoe.color.colorName === "black"
        );

        return blackShoes;
      }
    }
  };

  const shoes = findAcc();

  const pushShoes = [...finishClothes, shoes];

  //Por ultimo, buscamos el cinturón.
  const searchBelt = () => {
    let colorshoes = shoes.color.colorName;
    let searchBelt = dataJson.filter((item) => item.garment === "belt");
    let filteredStyle = searchBelt.filter((item) =>
      item.style.includes(styleClothes)
    );

    let filteredColor = filteredObjects(filteredStyle, colorshoes);
    let randomBelt = randomNumber(filteredColor);
    let pants = finishClothes.find((item) => item.garment === "pants");
    // Verificamos si es necesario llevar el cinturón con la prenda.
    if (pants.name === "joggin" || pants.name === "bermuda joggin") {
      return null;
    } else if (randomBelt === null) {
      return filteredStyle.filter((item) =>
        item.color.includes(el => el.colorName === "black")
      );
    } else return randomBelt;
  };
  const belt = searchBelt();

  //Pusheamos la ultima parte para obtener el outfit completo.
  const outfitComplete = { ...pushShoes, belt };

  // Realizamos ajustes al atuendo para asegurarnos de que sea compatible con los botones y así mostrarlo en pantalla
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

  // Realizamos una copia de los botones anteriores, los reemplazamos con los nuevos y actualizamos la prenda en consecuencia.
  const buttonsCopy = JSON.parse(JSON.stringify(infoGarment));
  const buttonsOufit = buttonsCopy.map((button) => {
    const matchingClothes = clothesArray.find(
      (clothes) => clothes && clothes.garment === button.garment
    );
    return matchingClothes || { ...button, src: "/src/images/emply-img.webp" };
  });

  return buttonsOufit
}
