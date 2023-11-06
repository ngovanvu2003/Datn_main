import React from "react";

const MenuCarousel = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "5px",
        marginTop: "9px",
      }}
    >
      <p className="signature ">Signature</p>
      <div className="pbox-carousel">
        <div className="owl-carousel promo-8-carousel">
          <div className="menu-2-item bg-white" style={{ width: "180px" }}>
            <div className="menu-2-img rel">
              <div className="hover-overlay ">
                <img
                  className="img-fluid"
                  src="..\public\images\promo-10-img.png"
                  alt="menu-image"
                />
                <div className="menu-img-zoom ico-25 ">
                  <a
                    href="..\public\images\promo-10-img.png"
                    className="image-link"
                  >
                    {" "}
                    <img src="..\public\Images - Copy\zoom.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="menu-3-txt rel">
                <div className="item-rating">
                  <div className="stars-rating stars-lg">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
                <div className="like-ico ico-25">
                  <a href="#"></a>
                </div>
                <h6 className="h3-sm">Dynamite Roll</h6>
                <div className="add">
                  <h6 style={{ color: "orange" }}>250.000đ</h6>
                  <button id="add">+</button>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-2-item bg-white" style={{ width: "180px" }}>
            <div className="menu-2-img rel">
              <div className="hover-overlay">
                <img
                  className="img-fluid"
                  src="..\public\images\about-03-img.png"
                  alt="menu-image"
                />
                <div className="menu-img-zoom ico-25">
                  <a
                    href="..\public\images\about-03-img.png"
                    className="image-link"
                  >
                    {" "}
                    <img src="..\public\Images - Copy\zoom.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="menu-3-txt rel">
                <div className="item-rating">
                  <div className="stars-rating stars-lg">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
                <div className="like-ico ico-25">
                  <a href="#"></a>
                </div>
                <h6 className="h3-sm">Dynamite Roll</h6>
                <div className="add">
                  <h6 style={{ color: "orange" }}>250.000đ</h6>
                  <button id="add">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCarousel;
