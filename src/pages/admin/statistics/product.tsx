/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  useGetBranchesQuery,
  useGetBranchByIdQuery,
} from "../../../api/branches";
import { useGetStatisticsQuery } from "../../../api/statistic";
import { useGetComboQuery } from "../../../api/combo";

import { FormattedDate } from "react-intl";
import { Loader2 } from "lucide-react";
import { DatePicker } from "@mui/x-date-pickers";
import { formatDate } from "../../../helpers/formatDate";
import { onHandleImageError } from "../../../helpers/ImageError";

const AdminStatisticProduct = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const userName = parsedUser.user ? parsedUser.user.information.name : "";
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";

  const [loading, setLoading] = useState(false);
  const [openCombo, setOpenCombo] = useState(false);

  const [date, setDate] = useState<string>(formatDate(new Date()));
  const [branch, setBranch] = useState<string>(branchId);
  const [branchIdSelected, setbranchIdSelected] = useState<string>(branchId);

  const { data: branchApi, isLoading: isLoadingBranch } = useGetBranchesQuery();
  const { data: branchByIdApi, isLoading: isLoadingBranchById } =
    useGetBranchByIdQuery(branchId);
  const { data: comboApi, isLoading: isLoadingCombo } = useGetComboQuery();

  const [comboId, setComboId] = useState(comboApi?.data.data[0]?.id);

  useEffect(() => {
    setComboId(comboApi?.data.data[0]?.id);
  }, [comboApi?.data.data]);

  const { data: productComboBetter, isLoading: isLoadingProductComboBetter } =
    useGetStatisticsQuery({
      path: "product-better",
      branch_id: branchIdSelected,
      combo_id: comboId,
    });

  const { data: productByDayBetter, isLoading: isLoadingProductByDayBetter } =
    useGetStatisticsQuery({
      path: "product-better-day",
      branch_id: branchIdSelected,
      date: date,
    });

  const { data: comboBetter, isLoading: isLoadingComboBetter } =
    useGetStatisticsQuery({
      path: "combo-better",
      branch_id: branchIdSelected,
    });

  const onHandleShow = () => {
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
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/product_report.png"
            alt=""
          />
          <span className="page-header-title">Thống kê món ăn và combo</span>
        </h2>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="media flex-column flex-sm-row flex-wrap align-items-sm-center gap-4">
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
      <div className="card mt-3">
        <div className="card-body">
          <div>
            <div className="row g-2">
              <div className="col-sm-12">
                <h4 className="form-label mb-0">Tổng quan</h4>
              </div>
              <div className="col-sm-8">
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

              <div className="col-md-4">
                <button
                  type="button"
                  onClick={onHandleShow}
                  className={`flex justify-center items-center btn btn-primary btn-block bg-[#ff6767] focus:bg-[#ff6767] ${
                    loading ? "cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Thực hiện"}
                </button>
              </div>
            </div>
          </div>

          <div className="row g-2 pt-3">
            {/* product better in combo */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border border-gray-400">
                <div className="card-header d-flex justify-content-between gap-10">
                  <h5 className="mb-0">Sản phẩm bán chạy</h5>
                  <div className="col-sm-2 relative">
                    <button
                      className="font-semibold text-black"
                      type="button"
                      onClick={() => setOpenCombo(!openCombo)}
                    >
                      ...
                    </button>
                    {openCombo && (
                      <div
                        className={`flex flex-col gap-y-2 cursor-pointer absolute top-6 right-0 w-28 h-40 overflow-y-auto rounded-md p-2 bg-gray-50 border border-gray-50`}
                      >
                        {isLoadingCombo ? (
                          <p className="text-xs opacity-80 font-medium transition rounded-md p-2">
                            Đang tải...
                          </p>
                        ) : (
                          <>
                            {comboApi?.data.data?.map((item: any) => {
                              return (
                                <p
                                  className={`${
                                    item.id == comboId
                                      ? "bg-[#ff6767] text-white"
                                      : "text-black hover:bg-gray-100"
                                  } text-xs opacity-80 font-medium transition rounded-md p-2`}
                                  key={item.id}
                                  onClick={() => {
                                    setOpenCombo(!openCombo);
                                    setComboId(item.id);
                                  }}
                                >
                                  {item.name}
                                </p>
                              );
                            })}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-body max-h-[400px] overflow-y-auto">
                  <div className="d-flex flex-column gap-3">
                    {isLoadingProductComboBetter ? (
                      "Đang tải..."
                    ) : (
                      <>
                        {(productComboBetter?.data.length == 0 ||
                          !productComboBetter?.data) && (
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
                        {productComboBetter?.data.map((item: any) => {
                          return (
                            <Link
                              className="d-flex justify-content-between align-items-center text-dark"
                              to="/admin/products"
                            >
                              <div className="media align-items-center gap-2">
                                <img
                                  className="rounded avatar avatar-lg"
                                  // src={item.image}
                                  src={
                                    "https://i.pinimg.com/564x/76/a4/02/76a402606a713cd062e4592b260e48b2.jpg"
                                  }
                                  alt=""
                                  onError={onHandleImageError}
                                />
                                <span className="font-weight-semibold text-capitalize media-body">
                                  {item.name}
                                </span>
                              </div>
                              <span className="px-2 py-1 badge-soft-c1 font-weight-bold fz-12 rounded lh-1">
                                Bán ra: {item.quantity}
                              </span>
                            </Link>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* product better day */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border border-gray-400">
                <div className="card-header d-flex justify-content-between gap-10">
                  <h5 className="mb-0">Sản phẩm bán chạy theo ngày</h5>
                  <DatePicker
                    defaultValue={new Date()}
                    onChange={(e: any) => setDate(formatDate(e))}
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

                <div className="card-body">
                  <div className="grid-item-wrap">
                    {isLoadingProductByDayBetter ? (
                      "Đang tải..."
                    ) : (
                      <>
                        {(productByDayBetter?.data.length == 0 ||
                          !productByDayBetter?.data) && (
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
                        {productByDayBetter?.data.map((item: any) => {
                          return (
                            <Link
                              className="grid-item text-dark"
                              to="./admin/products"
                            >
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  className="rounded avatar"
                                  // src={item.image}
                                  src={
                                    "https://i.pinimg.com/564x/76/a4/02/76a402606a713cd062e4592b260e48b2.jpg"
                                  }
                                  alt=""
                                  onError={onHandleImageError}
                                />
                                <span className=" font-weight-semibold text-capitalize media-body">
                                  {item.name}
                                </span>
                              </div>
                              <div>
                                <span className="rating text-primary">
                                  <i className="tio-star"></i>
                                </span>
                                <span>4.33 </span>
                                (6)
                              </div>
                            </Link>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* combo better */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border border-gray-400">
                <div className="card-header d-flex justify-content-between gap-10">
                  <h5 className="mb-0">Combo được yêu thích</h5>
                  <Link to="/admin/combo" className="btn-link">
                    Xem chi tiết
                  </Link>
                </div>

                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    {isLoadingComboBetter ? (
                      "Đang tải..."
                    ) : (
                      <>
                        {(comboBetter?.data.length == 0 ||
                          !comboBetter?.data) && (
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
                        {comboBetter?.data?.map((item: any) => {
                          return (
                            <Link
                              className="d-flex justify-content-between align-items-center text-dark"
                              to="/admin/combo"
                            >
                              <div className="media align-items-center gap-3">
                                <img
                                  className="rounded avatar avatar-lg"
                                  src=""
                                  onError={onHandleImageError}
                                />
                                <div className="media-body d-flex flex-column">
                                  <span className="font-weight-semibold text-capitalize">
                                    {item.name}
                                  </span>
                                </div>
                              </div>
                              <span className="px-2 py-1 badge-soft-c1 font-weight-bold fz-12 rounded lh-1">
                                Bán ra: {item.combo_quantity}
                              </span>
                            </Link>
                          );
                        })}
                      </>
                    )}
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

export default AdminStatisticProduct;
