import "./Weather.css";

export default function Weather({ onClickCombine, addColorButtonCombine, buttonDisabled }) {
  return (
    <div className="Weather">
      <button
        className={`combineButton ${
          addColorButtonCombine ? "activeButton" : ""
        }`}
        onClick={onClickCombine}
        disabled={buttonDisabled}
      >
        <img src="src/images/icos/combineButton.webp" alt="" />
      </button>
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
    </div>
  );
}
