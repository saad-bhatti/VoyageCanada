import React, { useState } from 'react';
import '../style/Slider.css';
import BtnSlider from './BtnSlider';
import DataSlider from './DataSlider';

export default function Slider() {

    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if (slideIndex !== DataSlider.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === DataSlider.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(DataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {DataSlider.map((obj, index) => {
                return (
                    <div
                        key={obj.id}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"} >
                            <img src={obj.image} />
                    </div>
                )
            })}

            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"} />

            <div className="container-dots">
                {Array.from({ length: DataSlider.length }).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}>
                    </div>
                ))}
            </div>
        </div>
    )
}
