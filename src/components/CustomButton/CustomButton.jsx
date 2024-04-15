import "./CustomButton.css"

export const customButton = (array, idProperty, CssType, customClick) => {
  const BasicButton = (item, index) => {
    return (
      <button
        className={`clothingButton ${item.css}`}
        id={item[idProperty]}
        key={index + item.name}
        onClick={(event) => customClick(event.currentTarget.id)}
        title ={item.name}
        disabled={CssType === 'shoes' || CssType === 'small'} 
      >
        <img src={item.src || item.image} alt={item.name} />
      </button>
    );
  };

  
  return CssType
    ? array.map((item, index) => {
        return item.css === CssType ? BasicButton(item, index) : null;
      })
    : array.map((item, index) => BasicButton(item, index));
};
