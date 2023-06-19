import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";

export default function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>

  )
}