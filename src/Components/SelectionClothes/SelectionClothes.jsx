import "./SelectionClothes.css";
import ColorButton from "../ColorButton/ColorButton";
import { customButton } from "../CustomButton/CustomButton";
export default function SelectionClothes({
  showGarments,
  OnClickClothes,
  divSwap,
  showColors,
  onClickColor,
  mobile,
  showMobileClothes,
}) {
  return (
    <section
      className={`SelectionClothes ${
        mobile && showMobileClothes ? "hidden" : ""
      }`}
    >
      {divSwap === false ? (
        <div className="SelectionClothes__box">
          {customButton(showGarments, "name", null, OnClickClothes )}
        </div>
      ) : null}
      {divSwap === true ? (
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
      ) : null}
    </section>
  );
}
