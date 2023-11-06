import { useEffect, useState } from "react";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderDetailMutation,
} from "../../../api/order-detail";
import { DateTimeFormat } from "../../../components/DateTimeFormat";
import { CurrencyFormat } from "../../../components/CurrencyFormat";
import { Modal, Skeleton } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import toast from "react-hot-toast";
import { pusher } from "../../../libs/pusher";
// import axios from "axios";

const AdminListOrderDetail = () => {
  const { confirm } = Modal;
  const { data: orderPosDetailApi, isLoading: isLoadingOrderPosDetail } =
    useGetOrderDetailsQuery("");
  const [orderPosDetailData, setOrderPosDetailData] = useState<any[]>([]);
  const [updateOrderDetail] = useUpdateOrderDetailMutation();

  useEffect(() => {
    setOrderPosDetailData(orderPosDetailApi?.data.data);
  }, [orderPosDetailApi]);

  const orderPosPending = orderPosDetailData?.filter(
    (item: any) => item.orderable_status == "0"
  );

  const user = JSON.parse(localStorage?.getItem("user") as string);
  const roleId = user?.user?.information?.role_id;
  const branchId = user?.user?.information?.branch_id;
  console.log(`role-${roleId}-${branchId}`);
  useEffect(() => {
    const channelGetPos = pusher.subscribe("CustomerToPos");
    channelGetPos.bind(
      `role-${roleId}-${branchId}`,
      function (data: { data: any[] }) {
        data.data.forEach((elementOrValue: any) => {
          console.log(elementOrValue);
          setOrderPosDetailData((prevFood) => [...prevFood, elementOrValue]);
        });
      }
    );
    return () => {
      pusher.unsubscribe("CustomerToPos");
    };
  }, [roleId]);
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
  const onHandleDelete = (value: any) => {
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
            orderable_status: "-1",
          })
            .unwrap()
            .then(({ meta }: any) => {
              toast.success(meta.message);
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
    <div>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h2 className="h1 mb-0 d-flex align-items-center gap-1">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/all_orders.png"
            alt=""
          />
          <h5 className="page-header-title flex justify-center items-center gap-1 z-0">
            <span className="z-0">Danh sách đơn hàng chờ xác nhận</span>
            <span className="badge badge-soft-dark rounded-50 fz-12">
              {orderPosPending?.length}
            </span>
          </h5>
        </h2>
        <span className="badge badge-soft-dark rounded-50 fz-14"></span>
      </div>
      <div className="card">
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
                    <th>Thông tin khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th className="text-center">Xác nhận</th>
                    <th className="text-center">Hủy</th>
                  </tr>
                </thead>
                <tbody id="set-rows">
                  {orderPosPending?.length == 0 ? (
                    <tr></tr>
                  ) : (
                    <>
                      {orderPosPending?.map(
                        (orderDetail: any, index: number) => {
                          return (
                            <tr
                              key={index}
                              className="status-done className-all"
                            >
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
                                    {orderDetail.combo_name != null &&
                                      orderDetail.combo_name}
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
                                <h6 className="text-capitalize mb-1">
                                  {orderDetail.username}
                                </h6>
                                <a
                                  className="text-dark fz-12"
                                  href={`tel:${orderDetail.phone}`}
                                >
                                  {orderDetail.phone}
                                </a>
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
                                  <span className="badge-soft-danger px-2 py-1 rounded">
                                    Chờ xác nhận
                                  </span>
                                )}
                              </td>

                              <td>
                                <div className="d-flex justify-content-center gap-2">
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm delete square-btn flex items-center group focus:bg-green-200"
                                    onClick={() => onHandleConfirm(orderDetail)}
                                  >
                                    <i className="tio-checkmark-circle-outlined text-green-500 group-hover:text-white transition"></i>
                                  </button>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex justify-content-center gap-2">
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm delete square-btn flex items-center group focus:bg-red-200"
                                    onClick={() => onHandleDelete(orderDetail)}
                                  >
                                    <i className="tio-clear-circle-outlined text-red-500 group-hover:text-white transition"></i>
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
      </div>
    </div>
  );
};

export default AdminListOrderDetail;
