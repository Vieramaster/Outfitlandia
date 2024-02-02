import { useEffect, useMemo, useState } from "react";

type color ={
  colorName: string;
  hex:string;
  imgColor:string;
}

type useDataBase ={
  garment: string;
  name: string;
  css: string;
  image: string;
  style: [string, string];
  weather: [string, string];
  colors: color[];
}

export const useDataBase = () => {
  const [data, setData] = useState<useDataBase[]>([]);
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
