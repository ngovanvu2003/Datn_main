// type Props = {};

const OrderStep3 = () => {
  return (
    <div>
      <form name="bookinkform" className="row booking-form">
        <div className="col-lg-6">
          <input
            type="text"
            name="name"
            className="form-control name"
            placeholder="Tên khách hàng*"
            required
          />
        </div>
        <div className="col-lg-6">
          <input
            type="text"
            name="name"
            className="form-control name"
            placeholder="Số người đặt bàn*"
            required
          />
        </div>
        <div className="col-lg-6">
          <input
            type="email"
            name="email"
            className="form-control email"
            placeholder="Nhập Email*"
            required
          />
        </div>
        <div className="col-lg-6">
          <input
            type="tel"
            name="phone"
            className="form-control phone"
            placeholder="Số điện thoại*"
            required
          />
        </div>
        <div className="col-md-12">
          <textarea
            name="message"
            className="form-control message"
            aria-rowcount={4}
            placeholder="Ghi chú ..."
          />
        </div>
        <div className="col-md-12 mt-10">
          <button
            type="submit"
            className="btn btn-md btn-red tra-red-hover submit"
          >
            Đặt bàn
          </button>
        </div>
        <div className="col-md-12 booking-form-msg text-center">
          <div className="sending-msg">
            <span className="loading"></span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderStep3;
