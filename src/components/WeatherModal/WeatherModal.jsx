import { forwardRef } from "react";
import InteractiveButton from "../InteractiveButton/InteractiveButton";
import "./WeatherModal.css";

function WeatherModal({ toggleModal, HandleModal }, refModal) {
  return (
    <dialog
      ref={refModal}
      className="WeatherModal"
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          toggleModal();
        }
      }}
    >
      <form onSubmit={HandleModal} className="WeatherModal__form">
        
        <input
          name="city"
          type="text"
          placeholder=" Escriba su ciudad..."
          required
          className="WeatherModal__form--input"
        />

        <InteractiveButton
          className="WeatherModal__form--cancel"
          buttonDescription="cancelar"
          onClick={toggleModal}
        />
        <InteractiveButton
          onClick={toggleModal}
          className="WeatherModal__form--submit"
          type="submit"
          buttonDescription="buscar"
        />
      </form>
    </dialog>
  );
}

export default forwardRef(WeatherModal);
