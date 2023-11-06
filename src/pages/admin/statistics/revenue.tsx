import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, XAxis, Tooltip, Bar, YAxis } from "recharts";
import { FormattedDate } from "react-intl";

import { formatDate } from "../../../helpers/formatDate";

import { CurrencyFormat } from "../../../components/CurrencyFormat";

import { useGetStatisticsQuery } from "../../../api/statistic";
import {
  useGetBranchByIdQuery,
  useGetBranchesQuery,
} from "../../../api/branches";

import { DatePicker } from "@mui/x-date-pickers";
import { Loader2 } from "lucide-react";
import { formatCurrencyNumbertoString } from "../../../helpers/formatCurrency";

const AdminStatisticRevenue = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const userName = parsedUser.user ? parsedUser.user.information.name : "";
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const currentYear = new Date().getFullYear();

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

  const { data: dayRevenue, isLoading: isLoadingDayRevenue } =
    useGetStatisticsQuery({
      path: "day-revenue",
      branch_id: branchIdSelected,
      date: dateSelected,
    });

  const { data: monthRevenue, isLoading: isLoadingMonthRevenue } =
    useGetStatisticsQuery({
      path: "month-revenue",
      branch_id: branchIdSelected,
      date: dateSelected,
    });

  const { data: yearRevenue, isLoading: isLoadingYearRevenue } =
    useGetStatisticsQuery({
      path: "month-revenue",
      branch_id: branchIdSelected,
      date: dateSelected,
    });

  const { data: allYearRevenue, isLoading: isLoadingAllYearRevenue } =
    useGetStatisticsQuery({
      path: "all-year-revenue",
    });

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

  const currentYearRevenue = allYearRevenue?.data?.filter(
    (item: any) => item.year == currentYear
  );

  const onHandleShow = () => {
    setDateSelected(date);
    setbranchIdSelected(branch);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width={20}
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/online-survey.png"
            alt=""
          />
          <span className="page-header-title">Thống kê doanh thu</span>
        </h2>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <div className="media flex-column flex-sm-row flex-wrap align-items-sm-center gap-4 mb-4">
            <div className="avatar avatar-xl">
              <img
                className="avatar-img"
                src="https://efood-admin.6amtech.com/public/assets/admin/svg/illustrations/earnings.png"
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
                      <h4 className="form-label mb-0">
                        Doanh thu theo thời gian
                      </h4>
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

            <div className="col-sm-4">
              <div className="card card-sm border-1 border-gray-300">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div className="media">
                        <i className="tio-dollar-outlined nav-icon" />
                        <div className="media-body">
                          <h4 className="mb-1 font-medium">
                            Doanh thu theo ngày
                          </h4>
                          <span className="font-size-sm text-success">
                            <i className="tio-trending-up" />{" "}
                            {isLoadingDayRevenue ? (
                              <span>Đang tải...</span>
                            ) : (
                              <>
                                {dayRevenue?.data.total ? (
                                  <CurrencyFormat
                                    value={dayRevenue?.data.total}
                                  />
                                ) : (
                                  <CurrencyFormat value={0} />
                                )}
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

            <div className="col-sm-4">
              <div className="card card-sm border-1 border-gray-300">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div className="media">
                        <i className="tio-dollar-outlined nav-icon" />
                        <div className="media-body">
                          <h4 className="mb-1 font-medium">
                            Doanh thu theo tháng
                          </h4>
                          <span className="font-size-sm text-warning">
                            <i className="tio-trending-up" />{" "}
                            {isLoadingMonthRevenue ? (
                              <span>Đang tải...</span>
                            ) : (
                              <>
                                {monthRevenue?.data.total ? (
                                  <CurrencyFormat
                                    value={monthRevenue?.data.total}
                                  />
                                ) : (
                                  <CurrencyFormat value={0} />
                                )}
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

            <div className="col-sm-4">
              <div className="card card-sm border-1 border-gray-300">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div className="media">
                        <i className="tio-dollar-outlined nav-icon" />
                        <div className="media-body">
                          <h4 className="mb-1 font-medium">
                            Doanh thu theo năm
                          </h4>
                          <span className="font-size-sm text-info">
                            <i className="tio-trending-up" />{" "}
                            {isLoadingYearRevenue ? (
                              <span>Đang tải...</span>
                            ) : (
                              <>
                                {yearRevenue?.data.total ? (
                                  <CurrencyFormat
                                    value={yearRevenue?.data.total}
                                  />
                                ) : (
                                  <CurrencyFormat value={0} />
                                )}
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
        </div>
      </div>

      {/* bieu do */}
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between flex-wrap gap-2">
          <h6 className="d-flex align-items-center gap-2 mb-0">
            Tổng doanh thu
            {isLoadingAllYearRevenue ? (
              "Đang tải..."
            ) : (
              <>
                {currentYearRevenue.map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      ({item.year}) :
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
                {dataChart.length !== 0 ? (
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
                    <YAxis tickFormatter={formatCurrencyNumbertoString} />
                    <Tooltip content={customTooltip} />
                    <Bar
                      dataKey="earning"
                      stroke="#ff6d6d"
                      fill="#ff6d6d"
                      barSize={40}
                    />
                  </BarChart>
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
    </>
  );
};

export default AdminStatisticRevenue;
