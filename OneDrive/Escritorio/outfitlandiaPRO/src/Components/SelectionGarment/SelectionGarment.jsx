import useCustomButtonClothes from "../CustomHooks/useCustomButtonClothes";
import "./SelectionGarment.css";

export default function SelectionGarment({ onClickGarment }) {
  const [firstModifiedButton] = useCustomButtonClothes();

  return (
    <section className="SelectionGarment">
      {firstModifiedButton("garment", "big", onClickGarment)}
      <div className="SelectionGarment__box">
        <div className="SelectionGarment__box--first">
          {firstModifiedButton("garment", "small", onClickGarment)}
        </div>
        <div className="SelectionGarment__box--shoes">
          {firstModifiedButton("garment", "shoes", onClickGarment)}
        </div>
      </div>
    </section>
  );
}
