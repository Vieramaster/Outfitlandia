import { forwardRef, useState } from "react";
import InteractiveButton from "../InteractiveButton/InteractiveButton";
import "./WeatherModal.css";
function WeatherModal(
  { toggleModalWeather, HandleModal, OnLocation },
  refModal
) {
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
        <div className="WeatherModal__form--boxInput">
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
        </div>
        <div className="WeatherModal__form--buttonBox">
          <InteractiveButton
            buttonName ="Geolocalización"
            onClick={OnLocation}
            className="WeatherModal__form--location"
            buttonDescription={
              <svg viewBox="0 0 512 512" width="3rem" height="3rem">
                <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
              </svg>
            }
          />
          <InteractiveButton
            buttonName="Cancelar"
            className="WeatherModal__form--button"
            buttonDescription="cancelar"
            onClick={toggleModalWeather}
          />
          <InteractiveButton
            buttonName="buscar"
            className="WeatherModal__form--button"
            type="submit"
            buttonDescription="Buscar"
          />
        </div>
      </form>
    </dialog>
  );
}
export default forwardRef(WeatherModal);
