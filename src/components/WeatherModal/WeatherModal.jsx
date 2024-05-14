import { forwardRef, useState } from "react";

import InteractiveButton from "../InteractiveButton/InteractiveButton";
import "./WeatherModal.css";

function WeatherModal({ toggleModalWeather, HandleModal }, refModal) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    HandleModal(inputValue);
    setInputValue("");
    toggleModalWeather();
  };
  return (
    <dialog
      ref={refModal}
      className="WeatherModal"
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          toggleModalWeather();
        }
      }}
    >
      <form onSubmit={handleSubmit} className="WeatherModal__form">
        <input
          type="text"
          name="searchCity"
          placeholder=" Escriba su ciudad..."
          required
          className="WeatherModal__form--input"
          autoComplete="off"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />

        <InteractiveButton
          className="WeatherModal__form--cancel"
          buttonDescription="cancelar"
          onClick={toggleModalWeather}
        />
        <InteractiveButton
          className="WeatherModal__form--submit"
          type="submit"
          buttonDescription="buscar"
        />
      </form>
    </dialog>
  );
}

export default forwardRef(WeatherModal);
