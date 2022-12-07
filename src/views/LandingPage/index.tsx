import Navbar from "../../components/Navbar/Navbar";
import AliceCarousel from "react-alice-carousel";

import "./index.scss";

function LandingPage() {
  return (
    <div className={"landingPage"}>
      <Navbar />
      <div className={"title"}>Travelling alone never has been so easy</div>
      <div className={"backgroundCarousel"}></div>
      <div className={"description"}>
        Plan your solo trip with us and discover the activities we can offer you
      </div>
    </div>
  );
}

export default LandingPage;
