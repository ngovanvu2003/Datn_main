import React from "react";

// type Props = {};

const OrderStep1 = () => {
  return (
    <div>
      <div className="container" id="about-3">
        <div className="row">
          <div
            className="col-md-2 col-md-4"
            id="location"
            style={{ border: " 1px solid gray" }}
          >
            <a href="/Order/step2">
              <div className="cbox-3 text-center">
                <div className="cbox-3-txt">
                  <h5 className="h5-xl red-color">Downtown</h5>
                  <p className="grey-color">8721 M Central Avenue,</p>
                </div>
              </div>
            </a>
          </div>
          <div
            className="col-md-2 col-md-4"
            id="location"
            style={{ border: " 1px solid gray" }}
          >
            <a href="/Order/step2">
              <div className="cbox-3 text-center">
                <div className="cbox-3-txt">
                  <h5 className="h5-xl red-color">Central City</h5>
                  <p className="grey-color">148 D Central Avenue,</p>
                </div>
              </div>
            </a>
          </div>
          <div
            className="col-md-2 col-md-4"
            id="location"
            style={{ border: " 1px solid gray" }}
          >
            <a href="/Order/step2">
              <div className="cbox-3 text-center">
                <div className="cbox-3-txt">
                  <h5 className="h5-xl red-color">Hollywood</h5>
                  <p className="grey-color">678 W Hollywood Way,</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStep1;
