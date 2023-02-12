import React from 'react';
import { Carousel } from 'react-bootstrap';
import slider1 from '../assets/slides/slider-1.jpg';
import slider2 from '../assets/slides/slider-2.jpg';

export default function CarouselSlider() {
  return (
    <div className="mb-2">
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src={slider1} alt="First slide" />
          <Carousel.Caption className="h-100 d-flex align-items-center justify-content-center">
            <div className="w-75">
              <h1>Flexible Chair</h1>
              <p>
                Torem ipsum dolor sit amet, consectetur adipisicing elitsed do
                eiusmo tempor incididunt ut labore et dolore magna elitsed do
                eiusmo tempor incididunt ut labore et dolore magna.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slider2} alt="Second slide" />
          <Carousel.Caption className="h-100 d-flex align-items-center justify-content-center">
            <div className="w-75">
              <h1>Creative Sofa</h1>
              <p>
                Torem ipsum dolor sit amet, consectetur adipisicing elitsed do
                eiusmo tempor incididunt ut labore et dolore magna elitsed do
                eiusmo tempor incididunt ut labore et dolore magna.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
