import { forwardRef } from "react";
import InteractiveButton from "../InteractiveButton/InteractiveButton";
import "./WeatherModal.css";

function WeatherModal({ toggleModalWeather, HandleModal }, refModal) {
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
      <form onSubmit={HandleModal} className="WeatherModal__form">
        <input
          type="text"
          name="searchCity"
          placeholder=" Escriba su ciudad..."
          required
          className="WeatherModal__form--input"
          autoComplete="off"
        />

        <InteractiveButton
          className="WeatherModal__form--cancel"
          buttonDescription="cancelar"
          onClick={toggleModalWeather}
        />
        <InteractiveButton
          onClick={toggleModalWeather}
          className="WeatherModal__form--submit"
          type="submit"
          buttonDescription="buscar"
        />
      </form>
    </dialog>
  );
}

export default forwardRef(WeatherModal);
