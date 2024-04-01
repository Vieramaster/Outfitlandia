import "./SelectionGarment.css";
import { customButton } from "../CustomButton/CustomButton";

export default function SelectionGarment({ onClickGarment, infoGarment }) {
  return (
    <section className="SelectionGarment">
      {customButton(infoGarment, "garment", "big", onClickGarment)}
      <div className="SelectionGarment__box">
        <div className="SelectionGarment__box--first">
          {customButton(infoGarment, "garment", "small", onClickGarment)}
        </div>
        <div className="SelectionGarment__box--shoes">
          {customButton(infoGarment, "garment", "shoes", onClickGarment)}
        </div>
      </div>
    </section>
    
  );
}
