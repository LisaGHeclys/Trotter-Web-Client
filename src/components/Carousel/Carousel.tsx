import { FC } from "react";
import AliceCarousel, { Responsive } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

type CarouselProps = {
  items: JSX.Element[];
  responsive: Responsive;
};

const Carousel: FC<CarouselProps> = ({ items, responsive }) => {
  return (
    <AliceCarousel
      animationDuration={3800}
      autoPlay
      infinite
      mouseTracking
      items={items}
      responsive={responsive}
    />
  );
};

export default Carousel;
