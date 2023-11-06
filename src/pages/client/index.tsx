import React from "react";
import AboutSection from "../../components/client/AboutSection";
import Branch from "../../components/client/Branch";
import FormNoti from "../../components/client/Form";
import Hotdeal from "../../components/client/Hotdeal";
import Slides from "../../components/client/Slides";

const HomePage = () => {
  return (
    <div>
      <div id="page" className="page">
        <Slides />
        <AboutSection />
        <Branch />
        <Hotdeal />
        <FormNoti />
        <div id="gmap">
          <div className="google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7449.396771132683!2d105.80243561447067!3d21.0047241178777!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac9b3f23b42b%3A0x49fa01aaa06d239b!2sVinhomes%20Royal%20City!5e0!3m2!1svi!2s!4v1693042297961!5m2!1svi!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
