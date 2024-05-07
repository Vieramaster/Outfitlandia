import "./InteractiveButton.css";

export default function InteractiveButton({
  buttonDescription,
  className,
  onClick,
  disabled,
  spanClassName,
  type
}) {
  return (
    <button
      className={`InteractiveButton ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span class={`InteractiveButton__span ${spanClassName}`}>{buttonDescription}</span>
    </button>
  );
}
