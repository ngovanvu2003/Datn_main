import { Link } from "react-router-dom";
import { DateTimeFormat } from "../../DateTimeFormat";
import { CurrencyFormat } from "../../CurrencyFormat";

const ModalPrintInvoice = () => {
  return (
    <div className="modal fade " id="print-invoice">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">In hoá đơn</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body row ff-emoji">
            <div className="col-md-12">
              <center className="flex justify-center items-center gap-x-3 mb-3">
                <input
                  type="button"
                  className="btn btn-primary non-printable bg-[#ff6767] focus:bg-[#ff6767]"
                  onClick={() => {}}
                  defaultValue="Tiếp tục nếu máy in sẵn sàng"
                />
                <Link to="#" className="btn btn-danger non-printable">
                  Quay lại
                </Link>
              </center>
              <hr className="non-printable" />
            </div>
            <div className="row m-auto" id="printableArea">
              <div className="w-[370px]" id="printableAreaContent">
                <div className="text-center pt-4 mb-3 w-100">
                  <h2 className="text-xl">Hoá đơn thanh toán</h2>
                  <h2 className="text-lg pt-4 pb-2">FireBBQ</h2>
                  <p className="text-lg font-normal">Chi nhánh Hà Nội</p>
                  <p className="text-sm font-normal">
                    Địa chỉ: Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
                  </p>
                </div>
                <span>--------------------------------------------</span>
                <div className="row mt-3">
                  <div className="col-6">
                    <p className="font-light text-sm">Mã hoá đơn : 100102</p>
                  </div>
                  <div className="col-6">
                    <span className="font-light text-sm">
                      <DateTimeFormat value={new Date()} />
                    </span>
                  </div>
                </div>
                <span>--------------------------------------------</span>
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th className="w-[10%]">S/L</th>
                      <th>Tên món</th>
                      <th>Tổng giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">1</td>
                      <td className="">
                        <span style={{ wordBreak: "break-all" }}>
                          {" "}
                          Ice Cream
                        </span>
                        <br />
                        <div className="font-size-sm text-body">
                          <span>Price : </span>
                          <span className="font-weight-bold">300.00$</span>
                        </div>
                        Discount : 30.00$
                      </td>
                      <td>
                        <CurrencyFormat value={234000} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <span>--------------------------------------------</span>
                <div className="row">
                  <div className="col-md-9 col-lg-12">
                    <dl className="row">
                      <dt className="col-8">Tiền món:</dt>
                      <dd className="col-4">
                        <CurrencyFormat value={234000} />
                      </dd>
                      <dt className="col-8">VAT:</dt>
                      <dd className="col-4">0%</dd>
                      <dt className="col-8">Khuyến mãi:</dt>
                      <dd className="col-4">
                        -<CurrencyFormat value={25000} />
                      </dd>
                      <dt className="col-7 pt-3">
                        <p className="text-lg font-bold">
                          Tổng thanh toán:
                        </p>
                      </dt>
                      <dd className="col-5 pt-3">
                        <span className="text-lg font-bold">
                          <CurrencyFormat value={209000} />
                        </span>
                      </dd>
                      <p className="font-light text-xs pl-[15px] font-italic pt-1 pb-4">
                        (Bằng chữ: hai trăm linh chín ngìn đồng)
                      </p>
                    </dl>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between border-top pt-2">
                  <span>Thanh toán bằng: Rửa bát</span>
                </div>
                <span>--------------------------------------------</span>
                <h5 className="text-center pt-3 uppercase">
                  """Cảm ơn quý khách"""
                </h5>
                <span>--------------------------------------------</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPrintInvoice;
