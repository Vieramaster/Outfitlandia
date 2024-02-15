import { useEffect, useMemo, useState } from "react";


export type newColors ={
  colorName: string;
  hex: string;
  title: string;
  hue: string;
}

export type colorData ={

}


export type dataJsonTypes ={
  garment: string;
  name:string;
  image:string;
  imageRed:string;
  css:string;
  style:string[];
  weather:string[];
  colors:colorData[] 
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
  },
  {
    "colorName": "lilac",
    "hex": "#C8A2C8",
    "title": "lila",
    
  },
  {
    "colorName": "aero",
    "hex": "#53718d",
    "title": "aero",
    
  },
  {
    "colorName": "jean",
    "hex": "#132b59",
    "title": "jean",
    
  },
  {
    "colorName": "navy blue",
    "hex": "#202a44",
    "title": "azul navy",
    
  },
  {
    "colorName": "french blue",
    "hex": "#318CE7",
    "title": "azul francia (2°)",
    
  },
  {
    "colorName": "skyblue",
    "hex": "#c9e9fc",
    "title": "celeste",
    
  },
  {
    "colorName": "green cake",
    "hex": "#c6e5b1",
    "title":"verde pastel",
    
  },
  {
    "colorName": "aquamarine",
    "hex": "#9fd5d1 ",
    "title": "aguamarina",
    
  },
  {
    "colorName": "dark esmerald",
    "hex": "#08554c",
    "title": "esmeralda oscuro",
    
  },
  {
    "colorName": "dark green",
    "hex": "#363d10",
    "title": "verde oscuro",
    
  },
  {
    "colorName": "army green",
    "hex": "#899478",
    "title": "verde militar",
    
  },

  {
    "colorName": "ivory",
    "hex": "#e1dfd1",
    "title": "marfil",
    
  },

  {
    "colorName": "yellow",
    "hex": "#ffe759",
    "title": "amarillo",
    
  },

  {
    "colorName": "mustard",
    "hex": "#b28024",
    "title": "mostaza",
    
  },
  {
    "colorName": "orange",
    "hex": "#ff8c00",
    "title": "naranja",
    
  },
  {
    "colorName": "red brick",
    "hex": "#a94c2b",
    "title": "ladrillo",
    
  },
  {
    "colorName": "windsor tan",
    "hex": "#8B4513",
    "title": "suela",
    
  },
  {
    "colorName": "chocolate",
    "hex": "#45322e",
    "title": "chocolate",
    
  },
  {
    "colorName": "peanut",
    "hex": "#766142",
    "title": "cacahuate",
    
  },
  
  {
    "colorName": "camel",
    "hex": "#c19a6b",
    "title": "camel",
    
  },
  {
    "colorName": "beige",
    "hex": "#d1bc8a",
    "title": "beige",
    
  },
  {
    "colorName": "Champagne",
    "hex": "#edd6b4",
    "title": "Champagne",
    
    
  },
  {
    "colorName": "sand",
    "hex": "#FFE4B5",
    "title": "arena",
    
  },
  {
    "colorName": "white",
    "hex": "#ffffff",
    "title": "blanco",
    
  },
  {
    "colorName": "light grey",
    "hex": "#c7c8ca",
    "title": "gris claro",
    
  },
  {
    "colorName": "dark grey",
    "hex": "#48494a",
    "title": "gris topo",
    
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
    
  },
  {
    "colorName": "burgundy",
    "hex": "#5e041b",
    "title": "borgoña",
    
  },
  {
    "colorName": "red",
    "hex": "#cf010b",
    "title": "rojo",
    
  },
  {
    "colorName": "baby pink",
    "hex": "#f8c8dc",
    "title": "rosa bebe",
    
  },
  {
    "colorName": "old pink",
    "hex": "#a4767a",
    "title": "rosa viejo",
    
  },
  {
    "colorName": "salmon",
    "hex": "#f3a399",
    "title": "salmón",
    
  }
]


{
  "colorName":"",
  "imageColor": ""
},



