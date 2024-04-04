const partGarments = ["top", "pants", "coat"];
const randomNumber = (value) => {
  if (value.length === 0) {
    return null;
  }
  const result = Math.floor(Math.random() * value.length);
  return value[result];
};


const filteredObjects = (array, arrayColor) => {
  let filter = array.reduce((acc, obj) => {
    let filteredColors = obj.colors.filter((color) =>
      arrayColor.includes(color.colorName)
    );
    if (filteredColors.length > 0) {
      acc.push({ ...obj, colors: filteredColors });
    }
    return acc;
  }, []);
  return filter;
};

//si se hace click sobre abrigo, superior o pantalones
if (partGarments.includes(idGarment)) {
  
  const partResults = partGarments.filter(
    (item) => item !== idGarment
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

  const { combine: outfitColor, combineShoes } =

  randomNumber(arrayColorResult);

  const outfitFilter = filteredObjects(matchingItems, outfitColor);

  console.log(outfitColor);

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
  const finishClothes = styles[randomKey];

  const findAcc = () => {
    const findShoes = dataJson.filter((item) => item.garment === "shoes");

    const colorResult = findShoes.map((item) => {
      item.style.includes(randomKey);
    });

    const searchWeather = searchStyle.filter((item) =>
      garmentWeather.every((val) => item.weather.includes(val))
    );

    filteredObjects(searchWeather, combineShoes);
    filteredMap(filteredObjects);
    return filteredMap.length > 0 ? filteredMap : findAcc();
  };
}


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
  return filteredMap.length > 0 ? filteredMap : pickStyle();
};

console.log("-----------------")
console.log(fafa());
console.log(randomKey)