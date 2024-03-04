
import "./ClothingButton.css";

type ClothingButtonType = {
  css: string;
  garment: string;
  src: string;
  buttonName: string;
  onClick: (id: string) => void;
};

const ClothingButton = ({
  css,
  garment,
  onClick,
  src,
  buttonName,
}: ClothingButtonType) => {
  return (
    <button
      className={`clothingButton ${css}`}
      aria-label={buttonName}
      id={garment}
      onClick={(event) => onClick(event.currentTarget.id)}
      title={buttonName}
    >
      <img src={src} alt={buttonName} />
    </button>
  );
};

export default ClothingButton;
/* */