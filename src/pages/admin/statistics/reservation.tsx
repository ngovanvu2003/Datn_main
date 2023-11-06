import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  useGetBranchesQuery,
  useGetBranchByIdQuery,
} from "../../../api/branches";
import { useGetStatisticsQuery } from "../../../api/statistic";

import { FormattedDate } from "react-intl";

import { formatDate } from "../../../helpers/formatDate";

import { DatePicker } from "@mui/x-date-pickers";
import { Loader2 } from "lucide-react";

const AdminStatisticReservation = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const userName = parsedUser.user ? parsedUser.user.information.name : "";
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";

  const [loading, setLoading] = useState(false);

  const [branch, setBranch] = useState<string>(branchId);
  const [branchIdSelected, setbranchIdSelected] = useState<string>(branchId);
  const [startDate, setStartDate] = useState<string>(formatDate(new Date()));
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()));
  const [fromDate, setFromDate] = useState<string>(formatDate(new Date()));
  const [toDate, setToDate] = useState<string>(formatDate(new Date()));

  const { data: branchApi, isLoading: isLoadingBranch } = useGetBranchesQuery();
  const { data: branchByIdApi, isLoading: isLoadingBranchById } =
    useGetBranchByIdQuery(branchId);

  const { data: typeReservation, isLoading: isLoadingTypeReservation } =
    useGetStatisticsQuery({
      path: "type-reservation",
      branch_id: branch,
    });

  const { data: reservationCancel, isLoading: isLoadingReservationCancel } =
    useGetStatisticsQuery({
      path: "reservation-cancel",
      branch_id: branchIdSelected,
      fromDate: fromDate,
      toDate: toDate,
    });

  const onHandleShow = () => {
    if (endDate < startDate) {
      toast.error("Vui lòng chọn lại ngày kết thúc");
    } else {
      setFromDate(startDate);
      setToDate(endDate);
      setbranchIdSelected(branch);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
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
          <span className="page-header-title">Thống kê đơn đặt chỗ</span>
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

      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-12">
              <form>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="">
                      <h4 className="form-label mb-0">
                        Tổng quan về đơn đặt chỗ
                      </h4>
                    </div>
                  </div>

                  <div className="col-sm-6">
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
                            Đơn đặt chỗ online
                          </h4>
                          <span className="font-size-sm text-success">
                            <i className="tio-trending-up" />{" "}
                            {isLoadingTypeReservation ? (
                              <span>Đang tải...</span>
                            ) : (
                              <span className="font-normal text-sm">
                                {typeReservation?.data.online_reservations
                                  ? typeReservation?.data.online_reservations
                                  : 0}
                              </span>
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
                        <i className="tio-money nav-icon" />
                        <div className="media-body">
                          <h4 className="mb-1 font-medium">
                            Đơn đặt chỗ offline
                          </h4>
                          <span className="font-size-sm text-warning">
                            <i className="tio-trending-up" />{" "}
                            {isLoadingTypeReservation ? (
                              <span>Đang tải...</span>
                            ) : (
                              <span className="font-normal text-sm">
                                {typeReservation?.data.offline_reservations
                                  ? typeReservation?.data.offline_reservations
                                  : 0}
                              </span>
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

          <div className="row g-2 pt-5">
            <h4 className="form-label mb-0">Đơn đặt chỗ bị huỷ</h4>
            <div className="col-12">
              <form>
                <div className="row g-2">
                  <div className="col-sm-6">
                    <div className="flex justify-center items-center gap-1">
                      <DatePicker
                        defaultValue={new Date()}
                        onChange={(e: any) => setStartDate(formatDate(e))}
                        className="form-control"
                        slotProps={{
                          textField: {
                            color: "warning",
                            focused: true,
                            size: "small",
                          },
                        }}
                      />{" "}
                      -
                      <DatePicker
                        defaultValue={new Date()}
                        onChange={(e: any) => setEndDate(formatDate(e))}
                        className="form-control"
                        slotProps={{
                          textField: {
                            color: "success",
                            focused: true,
                            size: "small",
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
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
                        <i className="tio-flight-cancelled nav-icon" />
                        <div className="media-body">
                          <h4 className="mb-1 font-medium">Đơn bị huỷ</h4>
                          <span className="font-size-sm text-danger">
                            <i className="tio-trending-up" />{" "}
                            {isLoadingReservationCancel ? (
                              <span>Đang tải...</span>
                            ) : (
                              <span className="font-normal text-sm">
                                {reservationCancel?.data
                                  .quantity_reservation_cancel
                                  ? reservationCancel?.data
                                      .quantity_reservation_cancel
                                  : 0}
                              </span>
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
    </>
  );
};

export default AdminStatisticReservation;
