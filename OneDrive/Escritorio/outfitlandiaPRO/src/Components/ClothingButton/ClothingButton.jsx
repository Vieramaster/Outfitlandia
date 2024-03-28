/* eslint-disable react/prop-types */
import "./ClothingButton.css";

export default function ClothingButton({
  css,
  src,
  id,
  buttonName,
  onClick
}) {
  return (
    <button
      className={`clothingButton ${css}`}
      id={id}
      title={buttonName}
      aria-label={buttonName}
      onClick={(event) => onClick(event.currentTarget.id)}
    >
      <img src={src} alt={buttonName} />
    </button>
  );
}
