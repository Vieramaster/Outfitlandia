import "./SelectionGarment.css";
import { customButton } from "../CustomButton/CustomButton";
import CombineButton from "../CombineButton/CombineButton";
export default function SelectionGarment({
  onClickGarment,
  infoGarment,
  onClickCombine,
  addColorButtonCombine,
  buttonDisabled,

}) {
  return (
    <section className="SelectionGarment">
      {customButton(infoGarment, "garment", "big", onClickGarment)}
      <div className="SelectionGarment__box">
        <div className="SelectionGarment__box--first">
          {customButton(infoGarment, "garment", "small", onClickGarment)}
          <CombineButton
            {...{ onClickCombine, addColorButtonCombine, buttonDisabled }}
          />
        </div>

        <div className="SelectionGarment__box--shoes">
          {customButton(infoGarment, "garment", "shoes", onClickGarment)}
        </div>
      </div>
    </section>
  );
}
