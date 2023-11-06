import React from "react";

// type Props = {};

const Hotdeal = () => {
  return (
    <div>
      <section id="menu-6" className="wide-70 menu-section division">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="section-title text-center">
                <h2 className="h2-xl red-color font-normal">KHUYẾN MẠI HOT NHẤT</h2>
                <p className="p-xl">
                  Các combo Lẩu ♨️ đáp ứng những vị khách "Khó tính" nhất
                </p>
                <div id="promo-4" className="wide-100 promo-section division">
                  <div className="container">
                    <div className="row d-flex align-items-center">
                      <div className="col-md-4">
                        <a href="menu-3.html">
                          <div className="pbox-4">
                            <div className="hover-overlay">
                              <img
                                className="img-fluid"
                                src="Images - Copy/poster1 (2).jpg"
                                alt="promo-image"
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="col-md-4">
                        <a href="menu-3.html">
                          <div className="pbox-4">
                            <div className="hover-overlay">
                              <img
                                className="img-fluid"
                                src="Images - Copy/poster2.jpg"
                                alt="promo-image"
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="col-md-4">
                        <a href="menu-3.html">
                          <div className="pbox-4 pbox-4-last">
                            <div className="hover-overlay">
                              <img
                                className="img-fluid"                               
                                src="Images - Copy/poster1 (2).jpg"
                                alt="promo-image"
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>  
                </div>
                <a href="/Order">
                <button id="order" type="submit" className="bg-[#E3000E] text-white font-bold" style={{ padding: "15px 55px" }}>
                  ĐẶT BÀN NGAY
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hotdeal;
