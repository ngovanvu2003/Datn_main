import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { CurrencyFormat } from "../../CurrencyFormat";

import { formatCurrencyNumbertoString } from "../../../helpers/formatCurrency";

import { useGetStatisticsQuery } from "../../../api/statistic";

const EarningChart = () => {
  const currentYear = new Date().getFullYear();

  const { data: yearMonthRevenue, isLoading: isLoadingYearMonthRevenue } =
    useGetStatisticsQuery({
      path: "year-revenue",
    });

  const [revenueChart, setRevenueChart] = useState<any[]>([{}]);

  useEffect(() => {
    if (!isLoadingYearMonthRevenue && yearMonthRevenue) {
      const dataChartCurrentYear = yearMonthRevenue?.data?.filter(
        (item: any) => item.year == currentYear
      );
      setRevenueChart(dataChartCurrentYear);
    }
  }, [yearMonthRevenue, isLoadingYearMonthRevenue, currentYear]);

  const dataChart =
    yearMonthRevenue?.data.length !== 0
      ? Object.keys(revenueChart[0])
          ?.slice(1)
          ?.map((key: any) => {
            const month = key.split("-")[1];
            const earning = parseFloat(revenueChart[0][key]);
            return {
              name: `Tháng ${month}`,
              earning: earning,
            };
          })
      : [];

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="px-2 pt-3 bg-gray-600 w-26 h-20 rounded-md">
          <p className="font-medium text-sm text-white">{label}</p>
          <p className="font-medium text-sm text-white">
            Doanh thu:{" "}
            <span>
              {" "}
              <CurrencyFormat value={payload[0].value} />
            </span>
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="card h-[450px] border border-gray-400">
      <div className="card-body">
        <div className="d-flex justify-content-between flex-wrap gap-2 align-items-center">
          <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
            <img
              width="20"
              className="avatar-img rounded-0"
              src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/earning_statistics.png"
              alt="image"
            />
            Thống kê doanh thu
          </h4>
          <ul className="option-select-btn">
            <li>
              <label>
                <span className="bg-[#ff6767] text-white font-medium">
                  {currentYear}
                </span>
              </label>
            </li>
          </ul>
        </div>

        {isLoadingYearMonthRevenue ? (
          "Đang tải..."
        ) : (
          <div id="updatingData" className="custom-chart mt-2">
            <div id="line-adwords" className="overflow-x-auto max-w-full">
              {dataChart.length !== 0 ? (
                <LineChart
                  width={700}
                  height={350}
                  data={dataChart}
                  margin={{
                    top: 25,
                    right: 5,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" width={4} />
                  <YAxis tickFormatter={formatCurrencyNumbertoString} />
                  <Tooltip content={customTooltip} />
                  <Line
                    type="monotone"
                    dataKey="earning"
                    stroke="#ff6d6d"
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              ) : (
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningChart;
