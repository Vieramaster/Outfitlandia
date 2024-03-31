import "./SelectionGarment.css";
import useCustomButtonClothes from "../CustomHooks/useCustomButtonClothes";

export default function SelectionGarment({ onClickGarment, infoGarment }) {
  const [firstModifiedButton] = useCustomButtonClothes();

  return (
    <section className="SelectionGarment">
      {firstModifiedButton(infoGarment, "garment", "big", onClickGarment)}
      <div className="SelectionGarment__box">
        <div className="SelectionGarment__box--first">
          {firstModifiedButton(infoGarment, "garment", "small", onClickGarment)}
        </div>
        <div className="SelectionGarment__box--shoes">
          {firstModifiedButton(infoGarment, "garment", "shoes", onClickGarment)}
        </div>
      </div>
    </section>
  );
}
