import { Link } from "react-router-dom";
import { onHandleImageError } from "../../../helpers/ImageError";
import { useGetStatisticsQuery } from "../../../api/statistic";
import { formatDate } from "../../../helpers/formatDate";

const TopSellingProducts = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const currentDate = formatDate(new Date());
  const { data: productByDayBetter, isLoading: isLoadingProductByDayBetter } =
    useGetStatisticsQuery({
      path: "product-better-day",
      branch_id: branchId,
      combo_id: currentDate,
    });
  return (
    <div className="col-md-6 col-lg-6">
      <div className="card h-100 border border-gray-400">
        <div className="card-header d-flex justify-content-between gap-10">
          <h5 className="mb-0">Sản phẩm bán chạy</h5>
          <Link to="/admin/products" className="btn-link">
            Xem tất cả
          </Link>
        </div>

        <div className="card-body max-h-[400px] overflow-y-auto">
          <div className="grid-item-wrap">
            {isLoadingProductByDayBetter ? (
              "Đang tải..."
            ) : (
              <>
                {productByDayBetter?.data.length == 0 ||
                  (!productByDayBetter?.data && (
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
                  ))}
                {productByDayBetter?.data.map((item: any) => {
                  return (
                    <Link className="grid-item text-dark" to="/admin/products">
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
                        <span className="px-2 py-1 badge-soft-c1 font-weight-bold fz-12 rounded lh-1">
                          Bán ra: {item.quantity}
                        </span>
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
  );
};

export default TopSellingProducts;
