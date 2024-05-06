import "./interactiveButton.css";

export default function interactiveButton({ SvgIcon, className }) {
  return (
    <button className={className}>
      <SvgIcon />
    </button>
  );
}
