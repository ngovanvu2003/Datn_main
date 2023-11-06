// type Props = {}

const Slides = () => {
  return (
    <div>
      <section id="hero-1" className="hero-section division">
        <div className="slider">
          <ul className="slides">
            <li id="slide-1">
              <img
                src="/ImagesCLient/Yellow Red Modern Fried Chicken Promotion Banner.png"
                alt="slide-background"
              />
              <div className="caption d-flex align-items-center center-align">
                <div className="container"></div>
              </div>
            </li>
            <li id="slide-3">
              <img
                src="/ImagesCLient/Yellow Red Modern Fried Chicken Promotion Banner (2).png"
                alt="slide-background"
              />
              <div className="caption d-flex align-items-center center-align">
                <div className="container"></div>
              </div>
            </li>
            <li id="slide-3">
              <img src="/ImagesCLient/5777137.jpg" alt="slide-background" />
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

export default Slides;
