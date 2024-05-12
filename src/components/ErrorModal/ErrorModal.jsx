import "./ErrorModal.css";
import InteractiveButton from "../InteractiveButton/InteractiveButton";
import { forwardRef } from "react";

function ErrorModal({ toggleModalWeather, toggleModalError }, refErrorModal) {
  return (
    <dialog ref={refErrorModal} className="ErrorModal">
      <h3>
        La ciudad solicitada no ha sido localizada. Por favor, asegúrese de que
        el nombre ingresado sea correcto.
      </h3>
      <InteractiveButton onClick={toggleModalError} />
      <InteractiveButton onClick={toggleModalWeather} />
    </dialog>
  );
}
export default forwardRef(ErrorModal);
