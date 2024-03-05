import "./HomePage.css";
import React, { useState } from "react";
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
  const [randomColorStrings, setRandomColorStrings] = useState<string[]>();
  const { data } = useDataBase();
  const [finishArray, setFinishArray] = useState <object[]>()

  //con el ID se prepara para buscar y mandar la nueva informacion a su segundo hijo, pero si se hace nuevamente click, reinicia gameCards
  const onGarmentClick = (id: string) => {
    setGarmentId(id);
    setFilteredGarmentButtons(defaultGarmentButtons);
    setGarmentColor(undefined);
    setShowButtonsBUtton(true);
    setGarmentCards(data.filter((item) => item.garment === id));
  };

  const garmentCard = (value: string) => {
    return defaultGarmentButtons.map((item) =>
      item.garment === garmentId ? { ...item, src: value } : item
    );
  };

  // con el ID se busca el objeto del array y sus colores, se usa la parte "colors" para buscar info de dataColor y que devuelta nueva informacion, y con eso llevarla al segundo hijo nuevamente
  const onClothesClick = (id: string) => {
    setShowButtonsBUtton(false);
    const garmentChoise = data.find((item) => item.name === id);
    if (!garmentChoise || typeof garmentChoise.colors === "string") return;

    setGarmentObject(garmentChoise);
    setColorsElection(garmentChoise.colors);
    setFilteredGarmentButtons(garmentCard(garmentChoise.image));
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

  const validButton = Boolean(garmentObject && garmentColor);

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
      //
  
      // Crea numeros aleatorios en base a los objetos de los array
      const randomNumber = (objectArray) => {
        return Math.floor(Math.random() * objectArray.length);
      };
  
      // busca una combinacion de colores aleatoria en base al elegido
      const randomColor = () => {
        let colorCombination = arrayColorsData.filter((item) =>
          item.includes(garmentColor)
        );
        let random = randomNumber(colorCombination);
        let color = colorCombination[random];
        return color;
      };
      setRandomColorStrings(randomColor());
  
      const finishProduct = () => {
        //filtra los colores en base a las combinaciones
        const filteredObjects = arrayGarmentResults.map((obj) => {
          let filteredColors = obj.colors.filter((color) =>
            randomColorStrings?.includes(color.colorName)
          );
          return { ...obj, colors: filteredColors };
        });
        // se crea un nuevo objeto por cada color
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
        // se agrupa en estilos para armar el conjunto
        const groupedByStyle = filteredMap.reduce(
          (acc, item) => {
            item.style.forEach((style) => {
              if (!acc[style]) {
                acc[style] = [];
              }
              acc[style].push(item);
            });
            return acc;
          },
          {}
        );
  
            const pickStyle = ()=>{
              const garmentsFilter = ['coat', 'pants', 'belt', 'shoes', 'top'].filter(item => item !== garmentId);
              let selectedItems = {};
        
              for (let style of Object.keys(groupedByStyle)) {
                selectedItems[style] = {};
                for (let garment of garmentsFilter) {
                  let items = groupedByStyle[style].filter(item => item.garment === garment);
                  if (items.length > 0) {
                    selectedItems[style][garment] = items[randomNumber(items)];
                  }
                }
              }
              return selectedItems
                
            }
            const keys = Object.keys(pickStyle());
            const randomKey = keys[randomNumber(keys)];

          
          const watch = () =>{
            const fafa = data.filter( item => item.garment === "watch")
            const fafa2 = randomKey.filter( item => item.garment === "shoes")

            

          }  
      };
      console.log(finishProduct())
    }
  }
  

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
