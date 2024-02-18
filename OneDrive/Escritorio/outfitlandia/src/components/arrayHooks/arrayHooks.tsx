import { useEffect, useMemo, useState } from "react";



export type colorData ={
colorName:string,
hex:string,
title:string,
imageColor:string
}


export type dataJsonTypes ={
  garment: string;
  name:string;
  image:string;
  imageRed:string;
  css:string;
  style:string[];
  weather:string[];
  colors:colorData[] |string
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




