import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";

export default function Landing() {
  return (
    <div className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </div>

  )
}