import "./CombineButton.css";
type combineButtonTypes = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  validButton: boolean
}

const CombineButton = ({ onClick, validButton }: combineButtonTypes) => {
  return (
    <button className={`combineButtons ${validButton ? 'active' : ''}`} onClick={onClick} disabled={!validButton}>
      <img src="/src/images/icos/combineButton.webp" alt="combine"/>
    </button>
  );
};

export default CombineButton;
