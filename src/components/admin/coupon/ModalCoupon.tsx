import { FC } from "react";
import { ICoupon } from "../../../interface/coupon";
import { DateTimeFormat } from "../../DateTimeFormat";

type ModalCouponDetailProps = {
  value: ICoupon;
};

const ModalCouponDetail: FC<ModalCouponDetailProps> = ({ value }) => {
  return (
    <div className="modal fade " id={`coupon-detail-${value.id}`}>
      <div
        className="modal-dialog modal-dialog-centered coupon-details"
        role="document"
      >
        <div className="modal-content overflow-hidden">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i className="tio-clear" />
          </button>
          <div className="coupon__details">
            <div className="coupon__details-left">
              <div className="text-center">
                <h6 className="title" id="title">
                  Mã giảm giá: {value.coupon_code}
                </h6>
                <h6 className="subtitle">
                  <span id="coupon_code">{value.description}</span>
                </h6>
              </div>
              <div className="coupon-info">
                <div className="coupon-info-item">
                  <span>Ngày hết hạn: </span>
                  <span id="expire_date">
                    <DateTimeFormat value={value.expiration_date} isTime/>
                  </span>
                </div>
              </div>
            </div>
            <div className="coupon__details-right">
              <div className="coupon">
                <div className="d-flex">
                  <h4 className="" id="">
                    {value.amount_discount}%
                  </h4>
                </div>
                <span className="pt-2">
                  {value.coupon_status == "0" ? "Off" : "On"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCouponDetail;
