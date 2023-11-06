import { Link } from "react-router-dom";
import { FormattedDate } from "react-intl";

import { formatDate } from "../../../helpers/formatDate";

import { useGetStatisticsQuery } from "../../../api/statistic";
import {
  useGetBranchByIdQuery,
  useGetBranchesQuery,
} from "../../../api/branches";

import { DatePicker } from "@mui/x-date-pickers";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CurrencyFormat } from "../../../components/CurrencyFormat";
import axios from "axios";
import { DateTimeFormat } from "../../../components/DateTimeFormat";

const AdminStatisticOrder = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const userName = parsedUser.user ? parsedUser.user.information.name : "";
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState<string>(formatDate(new Date()));
  const [branch, setBranch] = useState<string>(branchId);
  const [dateSelected, setDateSelected] = useState<string>(
    formatDate(new Date())
  );
  const [branchIdSelected, setbranchIdSelected] = useState<string>(branchId);

  const { data: branchApi, isLoading: isLoadingBranch } = useGetBranchesQuery();
  const { data: branchByIdApi, isLoading: isLoadingBranchById } =
    useGetBranchByIdQuery(branchId);

  const { data: orderPending, isLoading: isLoadingOrderPending } =
    useGetStatisticsQuery({
      path: "day-total-order",
      branch_id: branchIdSelected,
      order_status: "0",
      date: dateSelected,
    });
  const { data: orderDone, isLoading: isLoadingOrderDone } =
    useGetStatisticsQuery({
      path: "day-total-order",
      branch_id: branchIdSelected,
      order_status: "1",
      date: dateSelected,
    });

  const [orderPendingData, setOrderPendingData] = useState(orderPending);
  const [orderPaidData, setOrderPaidData] = useState(orderDone);

  useEffect(() => {
    setOrderPendingData(orderPending);
  }, [orderPending]);

  useEffect(() => {
    setOrderPaidData(orderDone);
  }, [orderDone]);

  const onHandleShow = () => {
    setDateSelected(date);
    setbranchIdSelected(branch);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const pageChangePending = (path: string) => {
    axios
      .get(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setOrderPendingData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const pageChangePaid = (path: string) => {
    axios
      .get(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setOrderPaidData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width={20}
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/order_report.png"
            alt=""
          />
          <span className="page-header-title">Thống kê đơn hàng</span>
        </h2>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <div className="media flex-column flex-sm-row flex-wrap align-items-sm-center gap-4 mb-4">
            <div className="avatar avatar-xl">
              <img
                className="avatar-img"
                src="https://efood-admin.6amtech.com/public/assets/admin/svg/illustrations/order.png"
                alt="Image Description"
              />
            </div>
            <div className="media-body">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="">
                  <div>
                    <div className="mb-1">
                      <span className="capitalize font-semibold text-black">
                        {userName}:{" "}
                      </span>
                      <span className="font-semibold">
                        {isLoadingBranchById ? (
                          "Đang tải..."
                        ) : (
                          <>
                            {branchByIdApi?.data.name
                              ? branchByIdApi?.data.name
                              : "..."}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <span className="font-semibold">
                        <span className="capitalize font-semibold text-black">
                          Ngày:{" "}
                        </span>
                        <FormattedDate
                          value={new Date()}
                          year="numeric"
                          month="long"
                          day="2-digit"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <Link
                    className="btn btn-icon btn-primary px-2 rounded-circle"
                    to="/admin"
                  >
                    <i className="tio-home-outlined" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* doanh thu theo thoi gian */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-12">
              <form>
                <div className="row g-2">
                  <div className="col-12">
                    <div className="">
                      <h4 className="form-label mb-0">Đơn hàng theo ngày</h4>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="">
                      <select
                        onChange={(e: any) => setBranch(e.target.value)}
                        className="form-control"
                      >
                        {isLoadingBranch ? (
                          <option>Đang tải...</option>
                        ) : (
                          <>
                            {branchApi?.data.data?.map((item: any) => {
                              return (
                                <option
                                  value={item.id}
                                  key={item.id}
                                  selected={item.id == branchId ? true : false}
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="">
                      <DatePicker
                        defaultValue={new Date()}
                        onChange={(e: any) => setDate(formatDate(e))}
                        className="form-control"
                        disableFuture
                        slotProps={{
                          textField: {
                            color: "warning",
                            focused: true,
                            size: "small",
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="">
                      <button
                        type="button"
                        onClick={onHandleShow}
                        className={`flex justify-center items-center btn btn-primary btn-block bg-[#ff6767] focus:bg-[#ff6767] ${
                          loading ? "cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Thực hiện"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-sm-6">
              <div className="card card-sm border-1 border-gray-300">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div className="media">
                        <i className="tio-dollar-outlined nav-icon" />
                        <div className="media-body">
                          <h4 className="mb-1 font-medium">
                            Đơn hàng chưa thanh toán
                          </h4>
                          <span className="font-size-sm text-success">
                            <i className="tio-trending-up" />{" "}
                            {isLoadingOrderPending ? (
                              <span>Đang tải...</span>
                            ) : (
                              <>
                                {orderPending?.data.total
                                  ? orderPending?.data.total
                                  : 0}
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card card-sm border-1 border-gray-300">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div className="media">
                        <i className="tio-dollar-outlined nav-icon" />
                        <div className="media-body">
                          <h4 className="mb-1 font-medium">
                            Đơn hàng đã thanh toán
                          </h4>
                          <span className="font-size-sm text-warning">
                            <i className="tio-trending-up" />{" "}
                            {isLoadingOrderDone ? (
                              <span>Đang tải...</span>
                            ) : (
                              <>
                                {orderDone?.data.total
                                  ? orderDone?.data.total
                                  : 0}
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-2 pt-3">
            {/* order pending */}
            <div className="col-md-6 col-lg-6">
              <div className="card h-100 border border-gray-400">
                <div className="card-header d-flex justify-content-between gap-10">
                  <h5 className="mb-0">Đơn hàng chưa thanh toán</h5>
                  <Link to="/admin/orders/pending" className="btn-link">
                    Xem chi tiết
                  </Link>
                </div>

                <div className="card-body">
                  <div className="d-flex flex-column gap-3 max-h-[400px] overflow-y-auto">
                    {isLoadingOrderPending ? (
                      "Đang tải..."
                    ) : (
                      <>
                        {(orderPendingData?.data.data.length == 0 ||
                          !orderPendingData?.data.data) && (
                          <div className="flex flex-col justify-center items-center text-center p-4">
                            <img
                              className="mb-3"
                              src="https://efood-admin.6amtech.com/public/assets/admin/svg/illustrations/sorry.svg"
                              alt="Image Description"
                              style={{ width: "7rem" }}
                            />
                            <p className="mb-0 text-sm text-black opacity-80">
                              Không có dữ liệu.{" "}
                            </p>
                          </div>
                        )}
                        {orderPendingData?.data?.data.map((item: any) => {
                          return (
                            <Link
                              className="d-flex justify-content-between align-items-center text-dark"
                              to={`/admin/orders/detail/${item.order_id}`}
                            >
                              <div className="media align-items-center gap-3">
                                <div className="media-body d-flex flex-column">
                                  <span className="font-weight-semibold text-capitalize">
                                  #{item.order_id}: {item.table_name}
                                  </span>
                                  <span className="text-dark">
                                    <DateTimeFormat value={item.created_at} />
                                  </span>
                                </div>
                              </div>
                              <span className="px-2 py-1 badge-soft-c1 font-weight-bold fz-12 rounded lh-1">
                                Tổng tiền:{" "}
                                {item.order_amount == null ? (
                                  <CurrencyFormat value={0} />
                                ) : (
                                  <CurrencyFormat
                                    value={item.order_amount}
                                  />
                                )}
                              </span>
                            </Link>
                          );
                        })}
                      </>
                    )}
                  </div>
                  {/* paginate pending*/}
                  {orderPendingData?.data.data.length !== 0 && (
                    <div className="table-responsive mt-4 px-3">
                      <div className="d-flex justify-content-lg-end">
                        <nav>
                          <ul className="pagination">
                            {orderPendingData?.data?.links?.map(
                              (link: any, index: number) => (
                                <li
                                  key={index}
                                  className={`page-item 
                            ${link.active ? "active z-0" : ""}
                            ${
                              link.url == null
                                ? "disabled cursor-not-allowed"
                                : ""
                            }
                          `}
                                  aria-current={
                                    link.active ? "page" : undefined
                                  }
                                >
                                  {link.url ? (
                                    <div
                                      className="page-link"
                                      onClick={() =>
                                        pageChangePending(link.url)
                                      }
                                    >
                                      {link.label == "&laquo; Previous" ? (
                                        <span>‹</span>
                                      ) : link.label == "Next &raquo;" ? (
                                        <span>›</span>
                                      ) : (
                                        <span>{link.label}</span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="page-link">
                                      {link.label == "&laquo; Previous" && (
                                        <span>‹</span>
                                      )}
                                      {link.label == "Next &raquo;" && (
                                        <span>›</span>
                                      )}
                                    </span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* order paid */}
            <div className="col-md-6 col-lg-6">
              <div className="card h-100 border border-gray-400">
                <div className="card-header d-flex justify-content-between gap-10">
                  <h5 className="mb-0">Đơn hàng đã thanh toán</h5>
                  <Link to="/admin/orders/paid" className="btn-link">
                    Xem chi tiết
                  </Link>
                </div>

                <div className="card-body">
                  <div className="d-flex flex-column gap-3 max-h-[400px] overflow-y-auto">
                    {isLoadingOrderDone ? (
                      "Đang tải..."
                    ) : (
                      <>
                        {(orderPaidData?.data.data.length == 0 ||
                          !orderPaidData?.data.data) && (
                          <div className="flex flex-col justify-center items-center text-center p-4">
                            <img
                              className="mb-3"
                              src="https://efood-admin.6amtech.com/public/assets/admin/svg/illustrations/sorry.svg"
                              alt="Image Description"
                              style={{ width: "7rem" }}
                            />
                            <p className="mb-0 text-sm text-black opacity-80">
                              Không có dữ liệu.{" "}
                            </p>
                          </div>
                        )}
                        {orderPaidData?.data?.data.map((item: any) => {
                          return (
                            <Link
                              className="d-flex justify-content-between align-items-center text-dark"
                              to={`/admin/orders/detail/${item.order_id}`}
                            >
                              <div className="media align-items-center gap-3">
                                <div className="media-body d-flex flex-column">
                                  <span className="font-weight-semibold text-capitalize">
                                    #{item.order_id}: {item.table_name}
                                  </span>
                                  <span className="text-dark">
                                    <DateTimeFormat value={item.updated_at} />
                                  </span>
                                </div>
                              </div>
                              <span className="px-2 py-1 badge-soft-c1 font-weight-bold fz-12 rounded lh-1">
                                Tổng tiền:{" "}
                                {item.order_amount == null ? (
                                  <CurrencyFormat value={0} />
                                ) : (
                                  <CurrencyFormat
                                    value={item.order_amount}
                                  />
                                )}
                              </span>
                            </Link>
                          );
                        })}
                      </>
                    )}
                  </div>

                  {/* paginate pending*/}
                  {orderPaidData?.data.data.length !== 0 && (
                    <div className="table-responsive mt-4 px-3">
                      <div className="d-flex justify-content-lg-end">
                        <nav>
                          <ul className="pagination">
                            {orderPaidData?.data?.links?.map(
                              (link: any, index: number) => (
                                <li
                                  key={index}
                                  className={`page-item 
                            ${link.active ? "active z-0" : ""}
                            ${
                              link.url == null
                                ? "disabled cursor-not-allowed"
                                : ""
                            }
                          `}
                                  aria-current={
                                    link.active ? "page" : undefined
                                  }
                                >
                                  {link.url ? (
                                    <div
                                      className="page-link"
                                      onClick={() => pageChangePaid(link.url)}
                                    >
                                      {link.label == "&laquo; Previous" ? (
                                        <span>‹</span>
                                      ) : link.label == "Next &raquo;" ? (
                                        <span>›</span>
                                      ) : (
                                        <span>{link.label}</span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="page-link">
                                      {link.label == "&laquo; Previous" && (
                                        <span>‹</span>
                                      )}
                                      {link.label == "Next &raquo;" && (
                                        <span>›</span>
                                      )}
                                    </span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bieu do */}
      {/* <div className="card mb-3">
        <div className="card-header d-flex justify-content-between flex-wrap gap-2">
          <h6 className="d-flex align-items-center gap-2 mb-0">
            {isLoadingAllYearRevenue ? (
              "Đang tải..."
            ) : (
              <>
                {currentYearRevenue.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      Tổng doanh thu ({item.year}) :
                      <span className="h4 mb-0">
                        {" "}
                        <CurrencyFormat value={item.total} />
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </h6>
          <Link
            className="js-hs-unfold-invoker btn btn-white"
            to="/admin/orders"
            data-hs-unfold-invoker=""
          >
            <i className="tio-shopping-cart-outlined" /> Đơn hàng
          </Link>
        </div>
        <div className="card-body">
          {isLoadingYearMonthRevenue ? (
            "Đang tải..."
          ) : (
            <div id="updatingData" className="custom-chart mt-2">
              <div id="line-adwords" className="overflow-x-auto min-w-full">
                <BarChart
                  width={900}
                  height={400}
                  data={dataChart}
                  margin={{
                    top: 20,
                    right: 5,
                    left: 5,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={customTooltip} />
                  <Bar
                    dataKey="earning"
                    stroke="#ff6d6d"
                    fill="#ff6d6d"
                    barSize={40}
                  />
                </BarChart>
              </div>
            </div>
          )}
        </div>
      </div> */}
    </>
  );
};

export default AdminStatisticOrder;
