import { useEffect, useMemo, useState } from "react";

/**
 * @typedef Color
 * @property {string} nombre
 * @property {string} hex
 */

/**
 * @typedef Item
 * @property {string} categoria
 * @property {string} nombre
 * @property {string} imagen
 * @property {ReadonlyArray<string>} estilo
 * @property {ReadonlyArray<string>} tiempo
 * @property {ReadonlyArray<string>} clima
 * @property {ReadonlyArray<Color>} colores
 * @property {string} [imagen2]
 */

export const useDatabase = () => {
	const [data, setData] = useState(/** @type {ReadonlyArray<Item>} */ ([]));
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		fetch("/redata.json")
			.then(response => response.json())
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false));
	}, []);

	return useMemo(() => ({ data, error, loading }), [data, error, loading]);
};