import { useEffect, useMemo, useState } from "react";


export type newColors ={
  colorName: string;
  hex: string;
  title: string;
  hue: string;
}

export type dataJsonTypes ={
  garment: string;
  name:string;
  image:string;
  imageRed:string;
  css:string;
  style:string[];
  weather:string[];
  colors:string[] 
  }
  
  

export const useDataBase = () => {
  const [data, setData] = useState<dataJsonTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/redata.json")
      .then((response) => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return useMemo(() => ({ data, error, loading }), [data, error, loading]);
};


export const dataColor =[
  {
    "colorName": "purple",
    "hex": "#603085",
    "title": "purpura",
    "hue": "hola"
  },
  {
    "colorName": "lilac",
    "hex": "#C8A2C8",
    "title": "lila",
    "hue": "hola"
  },
  {
    "colorName": "aero",
    "hex": "#416aa2",
    "title": "aero",
    "hue": "hola"
  },
  {
    "colorName": "jean",
    "hex": "#132b59",
    "title": "jean",
    "hue": "hola"
  },
  {
    "colorName": "navy blue",
    "hex": "#19284c",
    "title": "azul navy",
    "hue": "hola"
  },
  {
    "colorName": "french blue",
    "hex": "#318CE7",
    "title": "azul francia (2°)",
    "hue": "hola"
  },
  {
    "colorName": "skyblue",
    "hex": "#c9e9fc",
    "title": "celeste",
    "hue": "hola"
  },
  {
    "colorName": "green cake",
    "hex": "#c6e5b1",
    "title":"verde pastel",
    "hue": "hola"
  },
  {
    "colorName": "aquamarine",
    "hex": "#9fd5d1 ",
    "title": "aguamarina",
    "hue": "hola"
  },
  {
    "colorName": "dark esmerald",
    "hex": "#08554c",
    "title": "esmeralda oscuro",
    "hue": "hola"
  },
  {
    "colorName": "dark green",
    "hex": "#363d10",
    "title": "verde oscuro",
    "hue": "hola"
  },
  {
    "colorName": "army green",
    "hex": "#899478",
    "title": "verde militar",
    "hue": "hola"
  },

  {
    "colorName": "ivory",
    "hex": "#e1dfd1",
    "title": "marfil",
    "hue": "hola"
  },

  {
    "colorName": "yellow",
    "hex": "#ffe1a0",
    "title": "amarillo",
    "hue": "hola"
  },

  {
    "colorName": "mustard",
    "hex": "#e1ad01",
    "title": "mostaza",
    "hue": "hola"
  },
  {
    "colorName": "orange",
    "hex": "#ff8c00",
    "title": "naranja",
    "hue": "hola"
  },
  {
    "colorName": "red brick",
    "hex": "#a94c2b",
    "title": "ladrillo",
    "hue": "hola"
  },
  {
    "colorName": "windsor tan",
    "hex": "#8B4513",
    "title": "suela",
    "hue": "hola"
  },
  {
    "colorName": "chocolate",
    "hex": "#45322e",
    "title": "chocolate",
    "hue": "hola"
  },
  {
    "colorName": "peanut",
    "hex": "#766142",
    "title": "cacahuate",
    "hue": "hola"
  },
  
  {
    "colorName": "camel",
    "hex": "#b18a61",
    "title": "camel",
    "hue": "hola"
  },
  {
    "colorName": "beige",
    "hex": "#d1bc8a",
    "title": "beige",
    "hue": "hola"
  },
  {
    "colorName": "Champagne",
    "hex": "#edd6b4",
    "title": "Champagne",
    "hue": "hola"
    
  },
  {
    "colorName": "sand",
    "hex": "#FFE4B5",
    "title": "arena",
    "hue": "hola"
  },
  {
    "colorName": "white",
    "hex": "#ffffff",
    "title": "blanco",
    "hue": "hola"
  },
  {
    "colorName": "light grey",
    "hex": "#c7c8ca",
    "title": "gris claro",
    "hue": "hola"
  },
  {
    "colorName": "dark grey",
    "hex": "#708090",
    "title": "gris topo",
    "hue": "hola"
  },
  {
    "colorName": "worn black",
    "hex": "#2d2d2d",
    "title": "negro gastado",
    "hue":""
  },
  {
    "colorName": "black",
    "hex": "#000000",
    "title": "negro",
    "hue": "hola"
  },
  {
    "colorName": "burgundy",
    "hex": "#800020",
    "title": "borgoña",
    "hue": "hola"
  },
  {
    "colorName": "red",
    "hex": "#cf010b",
    "title": "rojo",
    "hue": "hola"
  },
  {
    "colorName": "baby pink",
    "hex": "#eedbe5",
    "title": "rosa bebe",
    "hue": "hola"
  },
  {
    "colorName": "old pink",
    "hex": "#a4767a",
    "title": "rosa viejo",
    "hue": "hola"
  },
  {
    "colorName": "salmon",
    "hex": "#f3a399",
    "title": "salmón",
    "hue": "hola"
  }
]