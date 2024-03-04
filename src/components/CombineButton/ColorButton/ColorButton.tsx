import "./ColorButton.css";


export type ColorButtonType = {
  color: string;
  name: string;
  onClick: (id: string) => void;
  buttonName:string;
};


const ColorButton = ({ color, name, buttonName, onClick }: ColorButtonType) => {
  return (
    <button
      className="colorButton"
      style={{ backgroundColor: color }}
      aria-label={name}
      id={name}
      onClick={(event) => onClick(event.currentTarget.id)}
      title={buttonName}
    />
  );
};

export default ColorButton;
/**/