import React from "react";
import "../style/Slider.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}>

      {direction === "next" ? <AiOutlineArrowRight size={40} /> : <AiOutlineArrowLeft size={40} />}
    </button>
  );
}