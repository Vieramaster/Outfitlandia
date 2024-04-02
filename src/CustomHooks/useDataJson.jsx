import { useEffect, useMemo, useState } from "react";

export default function useDataJson() {
  const [dataJson, setDataJson] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/garmentData.json")
      .then((response) => response.json())
      .then(setDataJson)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/colorCombine.json")
      .then((response) => response.json())
      .then(setDataColor)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return useMemo(() => {
    return { dataJson, dataColor, loading, error };
  }, [dataJson, dataColor, loading, error]);
}
