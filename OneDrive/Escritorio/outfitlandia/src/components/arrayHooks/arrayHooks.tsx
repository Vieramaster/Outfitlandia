import { useEffect, useMemo, useState } from "react";

interface Color {
  colorName: string;
  hex: string;
  imgColor: string;
}

interface useDataBase {
  garment: string;
  name: string;
  img: string;
  css: string;
  style: string[];
  weather: string[];
  colors: Color[];
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
