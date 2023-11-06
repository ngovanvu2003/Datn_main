/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../api/order";
import { useEffect } from "react";
import { CurrencyFormat } from "../../../components/CurrencyFormat";

const AdminOrderInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const { data: orderData }: any = useGetOrderByIdQuery(id || "");
  const data = orderData?.data?.order;
  // const combo: any = orderData?.data?.combo;
  const product = orderData?.data?.product;
  useEffect(() => {}, [orderData]);
  console.log(orderData);
  return (
    <div>
      <div className="content container-fluid" style={{ color: "black" }}>
        <div className="row justify-content-center" id="printableArea">
          <div className="col-md-12">
            <center className="flex justify-center items-center gap-x-2 mb-2">
              <input
                type="button"
                className="btn btn-primary non-printable bg-[#ff6767] focus:bg-[#ff6767]"
                defaultValue="Okela, hãy in nó !!!"
              />
              <a
                href="http://localhost:5173/admin/orders/all"
                className="btn btn-danger non-printable"
              >
                Back
              </a>
            </center>
            <hr className="non-printable" />
          </div>
          <div className="col-5" id="printableAreaContent">
            <div className="text-center pt-4 mb-3">
              <h2
                style={{
                  lineHeight: 1,
                  fontSize: "22px",
                  color: "orange",
                  marginBottom: "8px",
                }}
              >
                Fire BBQ
              </h2>
              <h5
                style={{
                  fontSize: 15,
                  fontWeight: "lighter",
                  lineHeight: 1,
                  color: "gray",
                  textTransform: "capitalize",
                }}
              >
                Địa chỉ: {data?.name}-{data?.city}
              </h5>
              <h5
                style={{
                  fontSize: 16,
                  lineHeight: 1,
                  color: "gray",
                  textTransform: "capitalize",
                }}
              >
                Hotline: 0900028383
              </h5>
            </div>
            <hr className="text-dark hr-style-1" />
            <div className="row mt-4">
              <div className="col-6">
                <h5>Mã đơn hàng : {data?.order_id}</h5>
              </div>
              <div className="col-6">
                <h5 style={{ fontWeight: "lighter" }}>
                  <span className="font-weight-normal">{data?.created_at}</span>
                </h5>
              </div>
              <div className="col-12">
                <h5>
                  Khách hàng :{" "}
                  <span className="font-weight-normal">{data?.username}</span>
                </h5>
                <h5>
                  SĐT :{" "}
                  <span className="font-weight-normal"> {data?.phone}</span>
                </h5>
                <h5>
                  Địa chỉ :{" "}
                  <span className="font-weight-normal">
                    {data?.name}-{data?.city}
                  </span>
                </h5>
              </div>
            </div>
            <h5 className="text-uppercase" />
            <hr className="text-dark hr-style-2" />
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>STT</th>
                  <th className="">Nội dung</th>
                  <th style={{ textAlign: "right", paddingRight: 4 }}>
                    Đơn Giá
                  </th>
                </tr>
              </thead>
              <tbody>
                {product?.map((item: any) => {
                  return (
                    <tr>
                      <td className="">1</td>
                      <td className="">
                        <span style={{ wordBreak: "break-all" }}>
                          {" "}
                          {item?.name} x {item?.total_quantity}
                        </span>
                        <br />
                      </td>
                      <td
                        style={{
                          width: "28%",
                          paddingRight: 4,
                          textAlign: "right",
                        }}
                      >
                        {item?.total_price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div
              className="row justify-content-md-end mb-3 m-0"
              style={{ width: "99%" }}
            >
              <div className="col-md-10 p-0">
                <dl className="row text-right">
                  <dt className="col-6" style={{ color: "gray" }}>
                    Tiền hàng:
                  </dt>
                  <dd className="col-6" style={{ color: "gray" }}>
                    <CurrencyFormat value={data?.order_amount_discount} />
                  </dd>
                  <dt className="col-6" style={{ color: "gray" }}>
                    VAT:
                  </dt>
                  <dd className="col-6" style={{ color: "gray" }}>
                    <CurrencyFormat value={data?.vat} />
                  </dd>
                  <dt
                    className="col-6"
                    style={{ fontSize: 17, fontWeight: 900 }}
                  >
                    Tổng thanh toán:
                  </dt>
                  <dd className="col-6" style={{ fontSize: 17 }}>
                    <CurrencyFormat value={data?.order_amount} />
                  </dd>
                </dl>
              </div>
            </div>
            <hr className="text-dark hr-style-2" />
            <h5 className="text-center pt-3">Cảm ơn quý khách !</h5>
            <hr className="text-dark hr-style-2" />
            <div className="text-center">Fire BBQ @ 2023</div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="popup-modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <center>
                    <h2 style={{ color: "rgba(96,96,96,0.68)" }}>
                      <i className="tio-shopping-cart-outlined" /> You have new
                      order, Check Please.
                    </h2>
                    <hr />
                    <button className="btn btn-primary">
                      Ok, let me check
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="toggle-status-modal">
        <div className="modal-dialog status-warning-modal">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true" className="tio-clear" />
              </button>
            </div>
            <div className="modal-body pb-5 pt-0">
              <div className="max-349 mx-auto mb-20">
                <div>
                  <div className="text-center">
                    <img id="toggle-status-image" alt="" className="mb-20" />
                    <h5 className="modal-title" id="toggle-status-title" />
                  </div>
                  <div className="text-center" id="toggle-status-message"></div>
                </div>
                <div className="btn--container justify-content-center">
                  <button
                    type="button"
                    id="toggle-status-ok-button"
                    className="btn btn-primary min-w-120"
                    data-dismiss="modal"
                  >
                    Ok
                  </button>
                  <button
                    id="reset_btn"
                    type="reset"
                    className="btn btn-secondary min-w-120"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderInvoice;
