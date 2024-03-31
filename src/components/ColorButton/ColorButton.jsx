import "./ColorButton.css";

export default function ColorButton({ colorName, hex, title, onClick }) {
  return (
    <button
      className="colorButton"
      id={colorName}
      title={title}
      aria-label={title}
      style={{ backgroundColor: [hex] }}
      onClick={(event) => onClick(event.currentTarget.id)}
    />
  );
}
