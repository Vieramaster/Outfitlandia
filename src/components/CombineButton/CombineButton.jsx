import "./CombineButton.css";

export default function CombineButton({
  onClickCombine,
  addColorButtonCombine,
  buttonDisabled,
}) {
  return (
    <button
      className={`combineButton ${addColorButtonCombine ? "activeButton" : ""}`}
      onClick={onClickCombine}
      disabled={buttonDisabled}
    >
      <img src="src/images/icos/combineButton.webp" alt="" />
    </button>
  );
}
