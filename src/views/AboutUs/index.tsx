import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";

import Lisa from "../../assets/team/Lisa.jpg";
import Justine from "../../assets/team/Justine.jpg";
import Lucy from "../../assets/team/Lucy.jpeg";
import Maxence from "../../assets/team/Maxence.jpeg";
import Tino from "../../assets/team/Tino.jpg";
import Laurent from "../../assets/team/Laurent.jpg";
import Leo from "../../assets/team/Leo.jpg";
import Fernando from "../../assets/team/Fernando.jpg";
import Florian from "../../assets/team/Florian.png";
import Lilian from "../../assets/team/Lilian.png";

import "./index.scss";
import { FC } from "react";
import responsive from "../../constants";

const items: JSX.Element[] = [
  <div className="carouselItems" data-value="1">
    <img className="MaxenceImg" src={Maxence} alt="Maxence" />
    <p>
      Maxence Pellouin
      <br />
      CEO
    </p>
  </div>,
  <div className="carouselItems" data-value="2">
    <img className="LaurentImg" src={Laurent} alt="Laurent" />
    <p>
      Laurent Cazette
      <br />
      CTO
    </p>
  </div>,
  <div className="carouselItems" data-value="3">
    <img className="JustineImg" src={Justine} alt="Justine" />
    <p>
      Justine Trupheme
      <br />
      CMO
    </p>
  </div>,
  <div className="carouselItems" data-value="4">
    <img className="LisaImg" src={Lisa} alt="Lisa" />
    <p>
      Lisa Glaziou
      <br />
      Lead developper
    </p>
  </div>,
  <div className="carouselItems" data-value="5">
    <img className="TinoImg" src={Tino} alt="Tino" />
    <p>
      Tino Tempesta
      <br />
      Developper CI/CD
    </p>
  </div>,
  <div className="carouselItems" data-value="6">
    <img className="LilianImg" src={Lilian} alt="Lilian" />
    <p>
      Lilian Giroire
      <br />
      Developper Back-end
    </p>
  </div>,
  <div className="carouselItems" data-value="7">
    <img className="LucyImg" src={Lucy} alt="Lucy" />
    <p>
      Lucy Janssens
      <br />
      Developper IA
    </p>
  </div>,
  <div className="carouselItems" data-value="8">
    <img className="FlorianImg" src={Florian} alt="Florian" />
    <p>
      Florian Gibault
      <br />
      Developper Front-end
    </p>
  </div>,
  <div className="carouselItems" data-value="9">
    <img className="LeoImg" src={Leo} alt="Leo" />
    <p>
      Léo Brossard
      <br />
      Developper Back-end
    </p>
  </div>,
  <div className="carouselItems" data-value="10">
    <img className="FernandoImg" src={Fernando} alt="Fernando" />
    <p>
      Fernando Tabernero-Pena
      <br />
      Developper Front-end
    </p>
  </div>
];

const AboutUs: FC = () => {
  return (
    <>
      <Navbar />
      <div className="containerAboutUs">
        <div className="containerStory">
          <h1>Our project</h1>
          <hr />
          <p>
            Trotter is the mobile application that automates the travel planning
            process for solo travellers.
            <br />
            Take advantage of itineraries adapted to your desires and your trip,
            live close to the locals and meet other international travellers.
            <br />
            Trotter is the perfect tool to make your trip unforgettable.
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
};

export default AboutUs;
