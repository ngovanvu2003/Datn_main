import React from "react";

// type Props = {};

const FormNoti = () => {
  return (
    <div>
      <section id="blog-1" className="wide-60 blog-section division">
        <div className="container">
          <div className="container">
            <div className="inner-bg bg-lightgrey">
              <div className="row">
                <div className="col-md-10 col-xl-8 offset-md-1 offset-xl-2">
                  <div className="newsletter-txt text-center">
                    <h3 className="h3-sm font-medium">
                      ĐĂNG KÝ NHẬN THÔNG BÁO TỪ CHÚNG TÔI
                    </h3>
                    <p className="p-md grey-color">
                      Bạn có thể nhận được nhiều ưu đãi từ các chương trình của
                      chúng tôi
                    </p>
                    <form className="newsletter-form">
                      <div className="input-group">
                        <input
                          type="phone"
                          className="form-control"
                          placeholder="Số điện thoại"
                          required
                          id="s-email"
                        />
                        <span className="input-group-btn">
                          <button
                            type="submit"
                            className="btn btn-red  tra-red-hover bg-[#e3000e] text-white"
                          >
                            Đăng ký
                          </button>
                        </span>
                      </div>
                      <label
                        htmlFor="s-email"
                        className="form-notification"
                      ></label>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormNoti;
