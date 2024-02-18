import "./Weather.css";
import CombineButton from "../CombineButton/CombineButton";

type weatherTypes = {
    onCombineClothes: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const Weather = ({ onCombineClothes }: weatherTypes) => {
  return (
    <div className="Weather">
      <div className="Weather--info">
        <img src="/src/images/09d.svg" alt="" />
      </div>
      <div className="Weather--info">
        <p>14.3 °C</p>
      </div>
      <div className="Weather--info winter">
        <img src="/src/images/wind.svg" alt="" />
        <span>12km/h</span>
      </div>
      <CombineButton onClick={onCombineClothes} />
    </div>
  );
};

export default Weather;
