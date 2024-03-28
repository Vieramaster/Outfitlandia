import ColorButton from "../ColorButton/ColorButton";
import "../CustomHooks/useCustomButtonClothes";
import useCustomButtonClothes from "../CustomHooks/useCustomButtonClothes";
import "./SelectionClothes.css";

export default function SelectionClothes({
  showGarments,
  OnClickClothes,
  divSwap,
  showColors,
  onClickColor,
}) {
  const [, secondModifiedButton] = useCustomButtonClothes();

  return (
    <div className="SelectionClothes">
      {divSwap === false ?
        <div className="SelectionClothes__box">
          {secondModifiedButton(showGarments, "name", OnClickClothes)}
        </div>
      : null}
      {divSwap === true ?
        <div className="SelectionClothes__colors">
          {showColors.map((item, index) => {
            return (
              <ColorButton
                key={item.title + index}
                colorName={item.colorName}
                title={item.title}
                hex={item.hex}
                onClick={onClickColor}
              />
            );
          })}
        </div>
      : null}
    </div>
  );
}
