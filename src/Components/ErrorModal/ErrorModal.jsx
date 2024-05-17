import { forwardRef } from "react";
import InteractiveButton from "../InteractiveButton/InteractiveButton";
import "./ErrorModal.css";
function ErrorModal({ toggleModalWeather, toggleModalError }, refErrorModal) {
  const onClickChange = () => {
    toggleModalWeather();
    toggleModalError();
  };
  return (
    <dialog
      ref={refErrorModal}
      className="ErrorModal"
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          toggleModalError();
        }
      }}
    >
      <div className="ErrorModal__container">
        <div className="ErrorModal__container--text">
          <h3>La ciudad no se encontró. Verifique el nombre ingresado.</h3>
        </div>
        <div className="ErrorModal__container--container">
          <InteractiveButton
            className="ErrorModal__container--button"
            onClick={toggleModalError}
            buttonDescription= "cancelar"
          />
          <InteractiveButton
            className="ErrorModal__container--button"
            onClick={onClickChange}
            buttonDescription= "reintentar"
          />
        </div>
      </div>
    </dialog>
  );
}
export default forwardRef(ErrorModal);
