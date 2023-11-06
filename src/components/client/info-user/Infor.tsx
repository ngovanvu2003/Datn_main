import React from "react";
import SectionInfo from "./SectionInfo";

const Infor = () => {
  return (
    <div>
      <SectionInfo />
      <div id="booking-2" className="wide-70 booking-section division">
        <div className="container">
          <div className="row">
            {/* BOOKING FORM */}
            <div className="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
              <div className="form-holder">
                {/* Text */}
                <h2 className="h2-xs text-center">
                  Thông tin cá nhân <a href="tel:0793576765">0793576765</a>
                </h2>
                {/* Form */}
                <form name="bookingform" className="row booking-form">
                  {/* Form Input */}

                  <div className="col-lg-6">
                    <input
                     
                      type="text"
                      name="date"
                      className="form-control name"
                      placeholder="Họ và tên"
                      value="Ngô Văn Vụ"
                      required
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      id="datetimepicker"
                      type="text"
                      name="date"
                      className="form-control date"
                      placeholder="Ngày sinh"
                      value="15/4/2003"
                      required
                    />
                  </div>

                  {/* Form Input */}
                  <div className="col-lg-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control name"
                      placeholder="Email"
                      value="ngovanvu203@gmail.com"
                      required
                    />
                  </div>

                  {/* Form Input */}
                  <div className="col-lg-6">
                    <input
                      type="tel"
                      name="phone"
                      className="form-control phone"
                      value="0793576765"
                      placeholder="Sđt"
                      required
                    />
                  </div>
                  {/* Form Input */}
                  <div className="col-lg-6">
                    <input
                      type="password"
                      name="phone"
                      className="form-control phone"
                      placeholder="Matkhau123"
                      required
                    />
                  </div>
                  {/* Form Input */}
                  <div className="col-lg-6">
                    <input
                      type="password"
                      name="phone"
                      className="form-control phone"
                      value="Matkhau123"
                      placeholder="Matkhau123"
                      required
                    />
                  </div>

                  {/* Form Textarea */}
                  <div className="col-md-12">
                    <textarea
                      name="message"
                      className="form-control message"
                      placeholder="Địa chỉ cụ thể ..."
                    ></textarea>
                  </div>

                  {/* Form Button */}
                  <div className="col-md-12 mt-10">
                    <button
                      type="submit"
                      className="btn btn-md btn-red tra-red-hover submit text-white"
                    >
                      Cập nhật
                    </button>
                  </div>

                  {/* Form Message */}
                  <div className="col-md-12 booking-form-msg text-center">
                    <div className="sending-msg">
                      <span className="loading"></span>
                    </div>
                  </div>
                </form>{" "}
                {/* End Form */}
              </div>
            </div>{" "}
            {/* END BOOKING FORM */}
          </div>{" "}
          {/* End row */}
        </div>{" "}
        {/* End container */}
      </div>
    </div>
  );
};

export default Infor;
