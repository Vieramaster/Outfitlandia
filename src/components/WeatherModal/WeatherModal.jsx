import { forwardRef } from "react";
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
      <form onSubmit={HandleModal}>
        <input
          name="city"
          type="text"
          placeholder=" Escriba su ciudad..."
          required
        />
        <button onClick={toggleModal}>Cancelar</button>
        <button type="submit">Buscar</button>
      </form>
    </dialog>
  );
}

export default forwardRef(WeatherModal);
