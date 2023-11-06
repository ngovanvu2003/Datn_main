import { useEffect, useState } from "react";
import { useGetOrderDetailsOptionQuery } from "../../../api/order-detail";
import { DateTimeFormat } from "../../../components/DateTimeFormat";
import { CurrencyFormat } from "../../../components/CurrencyFormat";
import { Skeleton } from "antd";
import { pusher } from "../../../libs/pusher";
import axios from "axios";

const AdminPosCancel = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const roleId = parsedUser.user ? parsedUser.user.information.role_id : "";
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";

  const { data: orderPosDetailApi, isLoading: isLoadingOrderPosDetail } =
    useGetOrderDetailsOptionQuery("?orderable_status=-2&orderBy=updated_at");
  const [orderPosDetailDataOption, setOrderPosDetailDataOption] =
    useState(orderPosDetailApi);
  const [orderPosDetailData, setOrderPosDetailData] = useState<any[]>([]);

  useEffect(() => {
    setOrderPosDetailDataOption(orderPosDetailApi);
    setOrderPosDetailData(orderPosDetailApi?.data?.data);
  }, [orderPosDetailApi, orderPosDetailApi?.data?.data]);

  useEffect(() => {
    const channelGetPos = pusher.subscribe("ToAll");
    channelGetPos.bind(`role-${roleId}-${branchId}`, function (data: { data: any[] }) {
      data.data.forEach((elementOrValue: any) => {
        setOrderPosDetailData((prevFood) => [elementOrValue, ...prevFood]);
      });
    });
    return () => {
      pusher.unsubscribe("ToAll");
    };
  }, [roleId, branchId]);

  const handlePageChange = (path: string) => {
    axios
      .get(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setOrderPosDetailDataOption(response.data);
        setOrderPosDetailData(response.data?.data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="py-4">
        <div className="table-responsive datatable-custom">
          {isLoadingOrderPosDetail ? (
            <Skeleton />
          ) : (
            <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
              <thead className="thead-light">
                <tr>
                  <th>Bàn</th>
                  <th>Món</th>
                  <th>Thời gian huỷ</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody id="set-rows">
                {orderPosDetailData?.length == 0 ? (
                  <tr className="text-center">
                    <td colSpan={5}>Không có đơn hàng nào.</td>
                  </tr>
                ) : (
                  <>
                    {orderPosDetailData?.map(
                      (orderDetail: any, index: number) => {
                        return (
                          <tr key={index} className="status-done className-all">
                            <td>
                              <div>{orderDetail.table_name}</div>
                            </td>
                            <td>
                              <div className="flex justify-start items-center gap-3">
                                <img
                                  src={orderDetail.image}
                                  alt=""
                                  className="w-7 h-7 rounded-md"
                                />
                                <span className="flex flex-col">
                                  {orderDetail.product_name}
                                  <span>x {orderDetail.quantity}</span>
                                </span>
                              </div>
                            </td>
                            <td>
                              <div>
                                <DateTimeFormat
                                  value={orderDetail.updated_at}
                                  isBreak
                                />
                              </div>
                            </td>

                            <td>
                              <div>
                                <CurrencyFormat
                                  value={orderDetail.total_price}
                                />
                              </div>
                            </td>
                            <td className="text-capitalize">
                              {orderDetail.orderable_status == "-2" && (
                                <span className="badge-soft-danger px-2 py-1 rounded">
                                  Bị huỷ
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {orderPosDetailData?.length != 0 && (
        <div className="table-responsive mt-4 px-3">
          <div className="d-flex justify-content-lg-end">
            <nav>
              <ul className="pagination">
                {orderPosDetailDataOption?.data?.links?.map(
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
                      aria-current={link.active ? "page" : undefined}
                    >
                      {link.url ? (
                        <div
                          className="page-link"
                          onClick={() => handlePageChange(link.url)}
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
                          {link.label == "&laquo; Previous" && <span>‹</span>}
                          {link.label == "Next &raquo;" && <span>›</span>}
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
    </>
  );
};

export default AdminPosCancel;
