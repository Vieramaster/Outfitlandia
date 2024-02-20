import "./Weather.css";
import CombineButton from "../CombineButton/CombineButton";

type weatherTypes = {
    onCombineClothes: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onValidButton: boolean
};
const Weather = ({ onCombineClothes, onValidButton  }: weatherTypes) => {
  return (
    <div className="Weather">
      <div className="Weather--info">
        <img src="/src/images/09d.svg" alt="ico" />
      </div>
      <div className="Weather--info">
        <p>14.3 °C</p>
      </div>
      <div className="Weather--info winter">
        <img src="/src/images/wind.svg" alt="ico" />
        <span>12km/h</span>
      </div>
      <CombineButton onClick={onCombineClothes}   validButton={onValidButton} />
    </div>
  );
};

export default Weather;
