import { useEffect, useState } from "react";
import {
  useGetOrderDetailsOptionQuery,
  useUpdateOrderDetailMutation,
} from "../../../api/order-detail";
import { DateTimeFormat } from "../../../components/DateTimeFormat";
import { CurrencyFormat } from "../../../components/CurrencyFormat";
import { Modal, Skeleton } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import toast from "react-hot-toast";
import { pusher } from "../../../libs/pusher";
import axios from "axios";

const { confirm } = Modal;

const AdminPosPending = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const roleId = parsedUser.user ? parsedUser.user.information.role_id : "";
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";

  const { data: orderPosDetailApi, isLoading: isLoadingOrderPosDetail } =
    useGetOrderDetailsOptionQuery("?orderable_status=0&orderBy=created_at");
  const [orderPosDetailDataOption, setOrderPosDetailDataOption] =
    useState(orderPosDetailApi);
  const [orderPosDetailData, setOrderPosDetailData] = useState<any[]>([]);
  const [updateOrderDetail] = useUpdateOrderDetailMutation();

  useEffect(() => {
    setOrderPosDetailDataOption(orderPosDetailApi);
    setOrderPosDetailData(orderPosDetailApi?.data?.data);
  }, [orderPosDetailApi, orderPosDetailApi?.data?.data]);

  useEffect(() => {
    const channelGetPos = pusher.subscribe("CustomerToPos");
    channelGetPos.bind(`role-${roleId}-${branchId}`, function (data: { data: any[] }) {
      data.data.forEach((elementOrValue: any) => {
        setOrderPosDetailData((prevFood) => [elementOrValue, ...prevFood]);
      });
    });
    return () => {
      pusher.unsubscribe("CustomerToPos");
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

  const onHandleConfirm = (value: any) => {
    confirm({
      title: "Xác nhận đơn hàng?",
      icon: <ExclamationCircleFilled />,
      content: `Thông tin đơn hàng sẽ được gửi tới nhà bếp?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await updateOrderDetail({
            id: value.id,
            order_id: value.order_id,
            orderable_status: "1",
          })
            .unwrap()
            .then(({ meta }: any) => {
              toast.success(meta.message);
              const newOrderPosDetail = orderPosDetailData.filter(
                (item: any) => item.id != value.id
              );
              setOrderPosDetailData(newOrderPosDetail);
            })
            .catch(({ data }: any) => {
              const { message } = data.meta;
              if (message && typeof message == "string") toast.error(message);
              if (message.id) message.id.map((err: any) => toast.error(err));
            });
        } catch {
          toast.error("Đã có lỗi xảy ra!");
        }
      },
      onCancel() {},
    });
  };

  const onHandleCancel = (value: any) => {
    confirm({
      title: "Xác nhận đơn hàng?",
      icon: <ExclamationCircleFilled />,
      content: `Đơn đặt bàn này sẽ bị huỷ?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await updateOrderDetail({
            id: value.id,
            order_id: value.order_id,
            orderable_status: "-2",
          })
            .unwrap()
            .then(({ meta }: any) => {
              toast.success(meta.message);
              const newOrderPosDetail = orderPosDetailData.filter(
                (item: any) => item.id != value.id
              );
              setOrderPosDetailData(newOrderPosDetail);
            })
            .catch(({ data }: any) => {
              const { message } = data.meta;
              if (message && typeof message == "string") toast.error(message);
              if (message.id) message.id.map((err: any) => toast.error(err));
            });
        } catch {
          toast.error("Đã có lỗi xảy ra!");
        }
      },
      onCancel() {},
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
                  <th>Thời gian đặt</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Xác nhận</th>
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
                                  value={orderDetail.created_at}
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
                              {orderDetail.orderable_status == "0" && (
                                <span className="badge-soft-info px-2 py-1 rounded">
                                  Chờ xác nhận
                                </span>
                              )}
                            </td>

                            <td>
                              <div className="d-flex justify-content-center gap-2">
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm delete square-btn flex items-center group focus:bg-red-200"
                                  onClick={() => onHandleCancel(orderDetail)}
                                >
                                  <i className="tio-clear-circle-outlined text-red-500 group-hover:text-white transition"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm delete square-btn flex items-center group focus:bg-green-200"
                                  onClick={() => onHandleConfirm(orderDetail)}
                                >
                                  <i className="tio-checkmark-circle-outlined text-green-500 group-hover:text-white transition"></i>
                                </button>
                              </div>
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

export default AdminPosPending;
