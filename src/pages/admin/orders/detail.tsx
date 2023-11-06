import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetOrderByIdQuery } from "../../../api/order";
import { DateTimeFormat } from "../../../components/DateTimeFormat";
import { Link } from "react-router-dom";
import { CurrencyFormat } from "../../../components/CurrencyFormat";
import { Skeleton } from "antd";
import ModalOrder from "../../../components/admin/order/ModalOrder";
import ModalMergeOrder from "../../../components/admin/order/ModalMergeOrder";

const OrderAdminDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: orderData, isLoading: isLoadingOrder } = useGetOrderByIdQuery(
    id || ""
  );
  const data = orderData?.data?.order;
  const combo = orderData?.data?.combo;
  const product = orderData?.data?.product;
  useEffect(() => {}, [orderData]);

  return (
    <div>
      <div className="row" id="printableArea">
        <div className="col-lg-8 mb-3 mb-lg-0">
          <div className="card mb-3 mb-lg-5">
            <div className="px-card py-3">
              <div className="row gy-2">
                <div className="col-sm-6 d-flex flex-column justify-content-between">
                  <div>
                    <h2 className="page-header-title h1 mb-3">
                      ĐƠN HÀNG #{data?.order_id}
                    </h2>
                    <h5 className="text-capitalize">
                      <i className="tio-shop" />
                      CHI NHÁNH : {data?.name}-{data?.city}
                      <label className="badge-soft-info px-2 rounded"></label>
                    </h5>
                    <h5 className="text-capitalize">
                      <i className="tio-table" />
                      BÀN : {data?.table_name}
                      <label className="badge-soft-info px-2 rounded"></label>
                    </h5>
                    <div className="mt-2 d-flex flex-column"></div>
                    <div className="">
                      Ngày &amp; Giờ: <i className="tio-date-range" />
                      <DateTimeFormat value={data?.meal_time} />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-right">
                    <div className="d-flex flex-wrap gap-2 justify-content-sm-end">
                      <Link
                        className="btn btn-info"
                        to={`/admin/orders/invoice/${data?.order_id}`}
                      >
                        <i className="tio-print" /> IN HÓA ĐƠN
                      </Link>
                      <span
                        data-toggle="modal"
                        data-target="#mergeOrder"
                        className="btn btn-danger"
                      >
                        <i className="tio-gesture-swipe-left-right-2f" /> GỘP
                        HÓA ĐƠN
                      </span>
                    </div>
                    <div className="d-flex gap-3 justify-content-sm-end my-3">
                      <div className="text-dark font-weight-semibold">
                        Trạng thái :
                      </div>
                      {data?.order_status == 0 ? (
                        <span className="badge-soft-danger px-2 rounded text-capitalize">
                          Chưa Thanh Toán
                        </span>
                      ) : data?.order_status == 1 ? (
                        <span className="badge-soft-success px-2 rounded text-capitalize">
                          Đã Thanh Toán
                        </span>
                      ) : (
                        <span className="badge-soft-infor px-2 rounded text-capitalize">
                          Loading...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4 table-responsive">
              {isLoadingOrder ? (
                <Skeleton />
              ) : (
                <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
                  <thead className="thead-light">
                    <tr>
                      <th>COMBO</th>
                      <th className="text-right">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {combo?.map((item: any) => {
                      return (
                        <tr>
                          <td>
                            <div className="media gap-3 w-max-content">
                              <div className="media-body text-dark fz-12">
                                <h6 className="text-capitalize text-base">
                                  {item?.name}
                                </h6>
                                <div className="d-flex gap-1">
                                  <div className="d-flex gap-2">
                                    <span className="">Số lượng : </span>
                                    <span>{item?.quantity}</span>
                                  </div>
                                  <br />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-right">
                            <CurrencyFormat value={item?.total_price} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            <div className="py-4 table-responsive">
              {isLoadingOrder ? (
                <Skeleton />
              ) : (
                <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
                  <thead className="thead-light">
                    <tr>
                      <th>Món ăn ngoài COMBO</th>
                      <th>Tiền hàng</th>
                      <th className="text-right">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {product?.map((item: any) => {
                      return (
                        <tr>
                          <td>
                            <div className="media gap-3 w-max-content">
                              <img
                                className="img-fluid avatar avatar-lg"
                                src={item.image}
                                alt="Image Description"
                              />
                              <div className="media-body text-dark fz-12">
                                <h6 className="text-capitalize text-base">
                                  {item?.name}
                                </h6>
                                <div className="d-flex gap-1">
                                  <div className="d-flex gap-2">
                                    <span className="">Số lượng : </span>
                                    <span>{item?.quantity}</span>
                                  </div>
                                  <br />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <CurrencyFormat value={item?.price} />
                          </td>
                          <td className="text-right">
                            <CurrencyFormat value={item?.total_price} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-body text-capitalize d-flex flex-column gap-4">
              <h4 className="mb-0 text-center">Cập Nhật Đơn Hàng</h4>
              <div className="">
                <label className="font-weight-bold text-dark fz-14">
                  Thay đổi trạng thái:
                </label>
                {data?.order_status == 0 ? (
                  <span
                    className="badge-soft px-2 py-1 rounded cursor-pointer"
                    data-toggle="modal"
                    data-target="#thanhtoan"
                  >
                    Chưa Thanh Toán
                  </span>
                ) : data?.order_status == 1 ? (
                  <span className="badge-soft-success px-2 rounded text-capitalize">
                    Đã Thanh Toán
                  </span>
                ) : (
                  <span className="badge-soft-infor px-2 rounded text-capitalize">
                    Loading...
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="mb-4 d-flex gap-2">
                <i className="tio-user text-dark" />
                Thông tin khách hàng
              </h4>
              <div className="media flex-wrap gap-3">
                <div className="media-body d-flex flex-column gap-1">
                  <a target="_blank" className="text-dark">
                    <strong> Người đặt: {data?.username}</strong>
                  </a>
                  <span className="text-dark">
                    <i className="tio-call-talking-quiet mr-2" />
                    <a
                      className="text-dark break-all"
                      href="tel:+8801621720045"
                    >
                      {data?.phone}
                    </a>
                  </span>
                  <span className="text-dark">
                    <i className="tio-man mr-2" />
                    <a
                      className="text-dark break-all"
                      href="tel:+8801621720045"
                    >
                      {data?.quantity_person} người
                    </a>
                  </span>
                  <span className="text-dark">
                    <i className="tio-book mr-2" />
                    <a className="text-dark break-all">*{data?.note}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3" style={{ padding: "20px" }}>
            <div className="row justify-content-md-end mb-3">
              <div className="col-md-9 col-lg-12">
                <dl className="row">
                  <dt className="col-6">
                    <div className="d-flex max-w220 ml-auto">
                      Tiền hàng<span>:</span>
                    </div>
                  </dt>
                  <dd className="col-6 text-dark text-right">
                    <CurrencyFormat value={data?.order_amount} />
                  </dd>
                  <dt className="col-6">
                    <div className="d-flex max-w220 ml-auto">
                      <span>VAT</span>
                      <span>:</span>
                    </div>
                  </dt>
                  <dd className="col-6 text-dark text-right">
                    <CurrencyFormat value={data?.vat} />
                  </dd>
                  <dt className="col-6 border-top pt-2 fz-16 font-weight-bold">
                    <div className="d-flex max-w220 ml-auto">
                      <span>Tổng thanh toán</span>
                      <span>:</span>
                    </div>
                  </dt>
                  <dd className="col-6 border-top pt-2 fz-16 font-weight-bold text-dark text-right">
                    <CurrencyFormat value={data?.order_amount_discount} />
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="assignDeliveryMan"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      ></div>
      <div
        className="modal fade bd-example-modal-sm"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      ></div>
      <div
        className="modal fade"
        id="counter-change"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      ></div>
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
      <ModalOrder />
      <ModalMergeOrder />
    </div>
  );
};

export default OrderAdminDetail;
