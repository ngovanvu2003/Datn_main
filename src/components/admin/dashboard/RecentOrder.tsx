import { Link } from "react-router-dom";
import { useGetStatisticsQuery } from "../../../api/statistic";
import { formatDate } from "../../../helpers/formatDate";
import { DateTimeFormat } from "../../DateTimeFormat";

const RecentOrder = () => {
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

  return (
    <div className="card h-[450px] overflow-y-auto border border-gray-400">
      <div className="card-header d-flex justify-content-between gap-10">
        <h5 className="mb-0">Đơn hàng mới</h5>
        <Link to="/admin/orders" className="btn-link">
          Xem tất cả
        </Link>
      </div>
      <div className="card-body">
        <ul className="common-list">
          {isLoadingOrderPending ? (
            "Đang tải..."
          ) : (
            <>
              {(orderPending?.data.data.length == 0 ||
                !orderPending?.data.data) && (
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
              {orderPending?.data.data?.map((item: any) => {
                return (
                  <li className="pt-0 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                    <div className="order-info ">
                      <h5>
                        <Link
                          to={`/admin/orders/detail/${item.order_id}`}
                          className="text-dark"
                        >
                          #{item.order_id}: {item.table_name}
                        </Link>
                      </h5>
                      <p>
                        <DateTimeFormat value={item.created_at} />
                      </p>
                    </div>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecentOrder;
