import React from "react";

type Props = {};

const SlideMenu = (props: Props) => {
  return (
    <div>
      <section id="hero-1" className="hero-section division">
        <div className="slider">
          <ul className="slides">
            <li id="slide-3">
              <img
                src="/public/Images\ -\ Copy/kpub-banner-1.png"
                alt="slide-background"
              />
              <div className="caption d-flex align-items-center center-align">
                <div className="container"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SlideMenu;
