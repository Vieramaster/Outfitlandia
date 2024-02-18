import "./CombineButton.css";
type combineButtonTypes = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CombineButton = ({ onClick }: combineButtonTypes) => {
  return (
    <button className="combineButtons" onClick={onClick}>
      <img src="/src/images/icos/combineButton.webp" alt="" />
    </button>
  );
};

export default CombineButton;
