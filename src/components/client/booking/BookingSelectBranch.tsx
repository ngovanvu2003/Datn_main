import { useGetBranchesQuery } from "../../../api/branches";
import { IBranch } from "../../../interface/branch";

// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

import { AppContext } from "../../../context";
import { useContext } from "react";

const BookingSelectBranch = () => {
  const { data: branchesData, isLoading: isLoadingBranchesData } =
    useGetBranchesQuery();

  const bookingContext = useContext(AppContext);
  return (
    <>
      {isLoadingBranchesData ? (
        <div className="row">
          <Skeleton active={true} paragraph />
        </div>
      ) : (
        <div className="md:flex lg:flex justify-center items-center">
          <div className="row">
            {branchesData?.data.data?.length == 0 && (
              <div>Không có chi nhánh nào đang hoạt động.</div>
            )}
            {branchesData?.data.data?.map((branch: IBranch, index: number) => {
              return (
                <label
                  key={index}
                  htmlFor={branch.name}
                  onChange={() => bookingContext.setBranchId(branch.id)}
                  className={`col-md-2 col-md-4 border border-gray-400  hover:opacity-80 focus:bg-gray-300 ${
                    bookingContext.branchId == branch.id
                      ? "bg-[#e95a26]"
                      : branch.branch_status !== "0"
                      ? "bg-white"
                      : "bg-gray-200 opacity-80"
                  } ${
                    branch.branch_status == "0"
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="cbox-3 text-center">
                    <div className="cbox-3-txt">
                      <h5
                        className={`h5-xl ${
                          bookingContext.branchId == branch.id
                            ? "text-white"
                            : "red-color"
                        }`}
                      >
                        {branch.name}
                      </h5>
                      <p
                        className={`${
                          bookingContext.branchId == branch.id
                            ? "text-white"
                            : "grey-color"
                        }`}
                      >
                        {branch.address_details}
                      </p>
                    </div>
                  </div>
                  {branch.branch_status !== "0" && (
                    <input type="checkbox" id={branch.name} hidden />
                  )}
                </label>
              );
            })}
          </div>
        </div>
      )}
      <div className="active flex justify-center items-center">
        <Link to="/booking/mealtime">
          <button className="next">Tiếp tục</button>
        </Link>
      </div>
    </>
  );
};

export default BookingSelectBranch;
