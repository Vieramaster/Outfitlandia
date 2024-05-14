import { useQuery } from "@tanstack/react-query";
export default function useDataJson() {
  const {
    isLoading: dataLoading,
    isError: dataError,
    data: dataJson = [],
  } = useQuery({
    queryKey: ["dataJson"],
    queryFn: async () => {
      const res = await fetch("/garmentData.json");
      return res.json();
    },
  });
  const {
    isLoading: colorLoading,
    isError: colorError,
    data: colorJson = [],
  } = useQuery({
    queryKey: ["dataColor"],
    queryFn: async () => {
      const res = await fetch("/colorCombine.json");
      return res.json();
    },
  });
  return {
    dataError,
    dataJson,
    dataLoading,
    colorError,
    colorLoading,
    colorJson,
  };
}
