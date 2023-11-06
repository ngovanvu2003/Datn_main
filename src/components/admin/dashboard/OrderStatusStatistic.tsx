import { useCallback, useState } from "react";
import { PieChart, Pie } from "recharts";
import { renderActiveShape } from "../../../helpers/renderActiveShape";
import { useGetStatisticsQuery } from "../../../api/statistic";
import { formatDate } from "../../../helpers/formatDate";

const OrderStatusStatistic = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

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

  function getStatusName(status: string) {
    return status === "0" ? "Chưa thanh toán" : "Đã thanh toán";
  }

  const data = [
    {
      name: getStatusName(orderDone?.data.data[0].order_status),
      value: orderDone?.data.total,
    },
    {
      name: getStatusName(orderPending?.data.data[0].order_status),
      value: orderPending?.data.total,
    },
  ];

  return (
    <div className="card h-[450px] border border-gray-400">
      <div className="card-header">
        <h4 className="d-flex text-capitalize mb-0">Trạng thái đơn</h4>
      </div>

      <div className="card-body">
        {isLoadingOrderPending && isLoadingOrderDone ? (
          "Đang tải..."
        ) : (
          <div className="position-relative pie-chart">
            <div id="dognut-pie" className="overflow-x-hidden w-full">
              <PieChart width={450} height={350}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#ff6d6d"
                  label
                  onMouseEnter={onPieEnter}
                />
              </PieChart>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusStatistic;
