import { Link } from "react-router-dom";
import { useGetStatisticsQuery } from "../../../api/statistic";
import { formatDate } from "../../../helpers/formatDate";
import { CurrencyFormat } from "../../CurrencyFormat";
import { FormattedDate } from "react-intl";

const OverviewBussiness = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const currentDate = formatDate(new Date());

  const { data: orderPending, isLoading: isLoadingOrderPending } =
    useGetStatisticsQuery({
      path: "day-total-order",
      branch_id: branchId,
      order_status: "0",
      date: currentDate,
    });
  const { data: orderDone, isLoading: isLoadingOrderDone } =
    useGetStatisticsQuery({
      path: "day-total-order",
      branch_id: branchId,
      order_status: "1",
      date: currentDate,
    });

  const { data: dayRevenue, isLoading: isLoadingDayRevenue } =
    useGetStatisticsQuery({
      path: "day-revenue",
      branch_id: branchId,
      date: currentDate,
    });

  return (
    <div className="card card-body mb-3 border border-gray-400">
      <div className="row justify-content-between align-items-center g-2 mb-3">
        <div className="col-auto">
          <h4 className="d-flex align-items-center gap-10 mb-0">
            <img
              width="20"
              className="avatar-img rounded-0"
              src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/business_analytics.png"
              alt="Business Analytics"
            />
            Tổng quan về đơn hàng:{" "}
            <FormattedDate
              value={new Date()}
              year="numeric"
              month="long"
              day="2-digit"
            />
          </h4>
        </div>
      </div>
      <div className="row g-2" id="order_stats">
        {/* chua thanh toan */}
        <div className="col-sm-6 col-lg-4">
          <Link to="/admin/orders/pending" className="dashboard--card">
            <h5 className="dashboard--card__subtitle">Chưa thanh toán</h5>
            <h3 className="dashboard--card__title">
              {isLoadingOrderPending ? (
                "..."
              ) : (
                <>
                  {orderPending?.data.total
                    ? `${orderPending?.data.total}`
                    : "0"}
                </>
              )}
            </h3>
            <img
              width="30"
              src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/pending.png"
              className="dashboard--card__img"
              alt="image"
            />
          </Link>
        </div>

        {/* da thanh toan */}
        <div className="col-sm-6 col-lg-4">
          <Link to="/admin/orders/paid" className="dashboard--card">
            <h5 className="dashboard--card__subtitle">Đã thanh toán</h5>
            <h3 className="dashboard--card__title">
              {isLoadingOrderDone ? (
                "..."
              ) : (
                <>{orderDone?.data.total ? `${orderDone?.data.total}` : "0"}</>
              )}
            </h3>
            <img
              width="30"
              src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/confirmed.png"
              className="dashboard--card__img"
              alt="image"
            />
          </Link>
        </div>

        {/* doanh thu */}
        <div className="col-sm-6 col-lg-4">
          <Link to="/admin/orders/pending" className="dashboard--card">
            <h5 className="dashboard--card__subtitle">Doanh thu</h5>
            <h3 className="dashboard--card__title">
              {isLoadingDayRevenue ? (
                "..."
              ) : (
                <>
                  {dayRevenue?.data.total ? (
                    <CurrencyFormat value={dayRevenue?.data.total} />
                  ) : (
                    <CurrencyFormat value={0} />
                  )}
                </>
              )}
            </h3>
            <img
              width="30"
              src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/pending.png"
              className="dashboard--card__img"
              alt="image"
            />
          </Link>
        </div>

        {/* <div className="col-sm-6 col-lg-4">
          <Link
            className="order-stats order-stats_pending bg-[#00c9db1a]"
            to="/admin/pos/order-status/done"
          >
            <div className="order-stats__content">
              <img
                width="20"
                src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/delivered.png"
                className="order-stats__img"
                alt="image"
              />
              <h6 className="order-stats__subtitle">Hoàn thành</h6>
            </div>
            <span className="order-stats__title">29</span>
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4">
          <Link
            className="order-stats order-stats_canceled bg-[#00c9db1a]"
            to="/admin/pos/order-status/cancel"
          >
            <div className="order-stats__content">
              <img
                width="20"
                src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/canceled.png"
                className="order-stats__img"
                alt="image"
              />
              <h6 className="order-stats__subtitle">Đã huỷ</h6>
            </div>
            <span className="order-stats__title">3</span>
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4">
          <Link
            className="order-stats order-stats_returned bg-[#00c9db1a]"
            to="/admin/pos/order-status/returned"
          >
            <div className="order-stats__content">
              <img
                width="20"
                src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/returned.png"
                className="order-stats__img"
                alt="image"
              />
              <h6 className="order-stats__subtitle">Đã trả đồ</h6>
            </div>
            <span className="order-stats__title">2</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default OverviewBussiness;
