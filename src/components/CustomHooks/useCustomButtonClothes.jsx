import ClothingButton from "../ClothingButton/ClothingButton";

export default function useCustomButtonClothes() {
  const modifiedButton = (item, index, idProperty, customClick) => {
    return (
      <ClothingButton
        css={item.css}
        src={item.src || item.image}
        id={item[idProperty]}
        buttonName={item.buttonName}
        key={index + item.name}
        onClick={customClick}
      />
    );
  };
  //estructura para botones de ropa principales
  const firstModifiedButton = (
    incomingInfo,
    idProperty,
    CssType,
    customClick
  ) => {
    return incomingInfo.map((item, index) => {
      return item.css === CssType
        ? modifiedButton(item, index, idProperty, customClick)
        : null;
    });
  };
  //estructura para botonesde ropa secundarios
  const secondModifiedButton = (incomingInfo, idProperty, customClick) => {
    return incomingInfo.map((item, index) => {
      return modifiedButton(item, index, idProperty, customClick);
    });
  };

  return [firstModifiedButton, secondModifiedButton];
}
