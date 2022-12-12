import AliceCarousel, { Responsive } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function Carousel({
  items,
  responsive
}: {
  items: JSX.Element[];
  responsive: Responsive;
}) {
  return (
    <AliceCarousel
      animationDuration={3000}
      autoPlay
      infinite
      mouseTracking
      items={items}
      responsive={responsive}
    />
  );
}

export default Carousel;
