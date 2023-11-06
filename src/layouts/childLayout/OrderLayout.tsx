import { Outlet } from "react-router-dom";

// type Props = {};

const OrderLayout = () => {
  return (
    <div>
      <div className="datban">
        <div id="booking-2" className="wide-70 booking-section division">
          <div className="max-w-6xl m-auto">
            <div className="row">
              <div className="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2 ">
                <div className="form-holder">
                  <div className="container" style={{ marginTop: "50px" }}>
                    <div className="row">
                      <div className="col-lg-10 offset-lg-1">
                        <div className="hero-txt text-center white-color">
                          <div id="breadcrumb">
                            <div className="row">
                              <div className="col">
                                <div className="breadcrumb-nav">
                                  <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                      <li className="breadcrumb-item">
                                        <a href="/">Trang Chủ</a>
                                      </li>
                                      <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                      >
                                        Đặt bàn
                                      </li>
                                    </ol>
                                  </nav>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h2 className="h2-xl font-normal">Chọn cơ sở</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
