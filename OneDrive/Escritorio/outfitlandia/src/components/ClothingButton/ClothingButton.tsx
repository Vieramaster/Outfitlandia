import React from 'react';
import './ClothingButton.css';



const ClothingButton = ({ css, garment, onClick, src, nameButton }:
  {css:string, garment:string,  src:string, nameButton :string, onClick:(id:string)=> void}) => {
  return (
        <button
          className={`clothingButton ${css}`}
          aria-label={nameButton }
          id={garment}
          onClick={(event) => onClick(event.currentTarget.id)}
          >
          <img src={src} />
        </button>
  );
};


export default ClothingButton