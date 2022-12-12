import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";

import "./index.scss";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 }
};

const items: any = [
  // <img src="" className="yours-custom-class" />,
  <div className="carouselItems" data-value="1">
    <h2>1</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="2">
    <h2>2</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="3">
    <h2>3</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="4">
    <h2>4</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="5">
    <h2>5</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="6">
    <h2>6</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="7">
    <h2>7</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="8">
    <h2>8</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="9">
    <h2>9</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>,
  <div className="carouselItems" data-value="10">
    <h2>10</h2>
    <p>
      Name
      <br />
      Poste
    </p>
  </div>
];

function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="containerAboutUs">
        <div className="containerStory">
          <h1>Our story</h1>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            recusandae natus dolore vero praesentium excepturi illum at neque
            fugiat explicabo odit repellat tempora rem, deleniti iure, officiis
            officia ex ipsam!
          </p>
        </div>
        <div className="containerMembers">
          <h1>Our members</h1>
          <hr />
          <Carousel items={items} responsive={responsive} />
        </div>
      </div>
    </>
  );
}

export default AboutUs;
