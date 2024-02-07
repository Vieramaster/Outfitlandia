import React from 'react';
import './ClothingButton.css';

type ClothingButtonType ={
  css:string;
   garment:string; 
    src:string;
     nameButton :string; 
     onClick:(id:string)=> void;

}
  



const ClothingButton = ({ css, garment, onClick, src, nameButton }:ClothingButtonType ) => {
  return (
        <button
          className={`clothingButton ${css}`}
          aria-label={nameButton }
          id={garment}
          onClick={(event) => onClick(event.currentTarget.id)}
          title={nameButton}
          >
          <img src={src} alt={nameButton}/>
        </button>
  );
};


export default ClothingButton