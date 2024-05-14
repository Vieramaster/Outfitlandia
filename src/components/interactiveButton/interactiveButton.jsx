import "./InteractiveButton.css";
export default function InteractiveButton({
  buttonDescription,
  className,
  onClick,
  disabled,
  spanClassName,
  type,
  buttonName,
}) {
  return (
    <button
      className={`InteractiveButton ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={buttonName}
    >
      <span className={`InteractiveButton__span ${spanClassName}`}>
        {buttonDescription}
      </span>
    </button>
  );
}
