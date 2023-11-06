import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";

import { ITable } from "../../../interface/table";

import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { clear, decrease, increase, remove } from "../../../slices/CartPos";

import toast from "react-hot-toast";

import { CurrencyFormat } from "../../CurrencyFormat";
import ModalPrintInvoice from "./ModalPrintInvoice";
import { useGetReservationsOptionQuery } from "../../../api/reservation";
import { useGetTablesOptionQuery } from "../../../api/tables";
import { IReservation } from "../../../interface/reservation";
import { useAddOrderMutation } from "../../../api/order";
import { Loader2 } from "lucide-react";
import ModalSelectOrderTable from "./ModalSelectOrderTable";
import { AppContext } from "../../../context";
import { useAddOrderDetailMutation } from "../../../api/order-detail";

const OrderSection = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const roleId = parsedUser.user ? parsedUser.user.information.role_id : "";
  console.log("roleId",roleId ,"branchId",branchId);
  const orderTableContext = useContext(AppContext);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { data: reservations } = useGetReservationsOptionQuery(`?branch_id=${branchId}`);
  const { data: tablesData } = useGetTablesOptionQuery(
    `?table_status=0&branch_id=${branchId}`
  );
  const [tables, setTables] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  const [addOrder, { isLoading: isLoadingAddOrder }] = useAddOrderMutation();
  const [addOrderDetail, { isLoading: isLoadingAddOrderDetail }] =
    useAddOrderDetailMutation();

  const dispatch = useAppDispatch();
  const { items: cartsPos } = useAppSelector((state) => state.cartPos);
  const totalItems = cartsPos.reduce((sum: any, item: any) => {
    const countQuantity = item.quantity ? item.quantity : 1;
    return sum + item.price * countQuantity;
  }, 0);

  useEffect(() => {
    setCustomers(reservations?.data.data);
    setTables(tablesData?.data.data);
  }, [reservations?.data.data, tablesData]);

  const onHandleSubmit = (values: any) => {
    if (orderTableContext.orderTable != null) {
      const detailOrder = cartsPos.map((item: any) => ({
        order_id: orderTableContext.orderTable.id,
        id: item.id,
        tag: item.quantity ? "product" : "combo",
        quantity: item.quantity,
      }));
      addOrderDetail(detailOrder)
        .unwrap()
        .then((response) => {
          toast.success(response.meta.message);
          cancelOrder();
        })
        .catch(({ data }) => {
          const { message } = data.meta;
          if (message && typeof message == "string") toast.error(message);
        });
    } else {
      if (values.reservation_id !== "0" || values.table_id !== "0") {
        const orderItem = cartsPos.map((item: any) => ({
          id: item.id,
          tag: item.quantity ? "product" : "combo",
          quantity: item.quantity,
        }));
        addOrder({
          reservation_id: values.reservation_id,
          table_id: values.table_id,
          item_id: orderItem,
        })
          .unwrap()
          .then((response) => {
            if (response.meta) {
              toast.success(response.meta.message);
              const newTables = tables.filter(
                (item: any) => item.id != values.table_id
              );
              setTables(newTables);
            }
            cancelOrder();
          })
          .catch(({ data }) => {
            const { message } = data.meta;
            if (message && typeof message == "string") toast.error(message);
            if (message.reservation_id)
              message.reservation_id.map((err: any) => toast.error(err));
            if (message.table_id)
              message.table_id.map((err: any) => toast.error(err));
            if (message.item_id)
              message.item_id.map((err: any) => toast.error(err));
          });
      } else {
        toast.error("Không được bỏ trống thông tin");
      }
    }
  };

  const cancelOrder = () => {
    dispatch(clear());
    orderTableContext.orderTable = null;
    reset();
  };
  return (
    <div className="col-lg-5">
      <div className="card billing-section-wrap">
        <div className="pos-title">
          <h4 className="mb-0 font-bold text-[16px]">Mục đặt món</h4>
        </div>

        <div className="p-2 p-sm-4">
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            {/* Reservation */}
            <div className="form-group flex flex-col gap-2">
              <label
                htmlFor="reservation_id"
                className="font-weight-semibold fz-16 text-dark"
              >
                Khách hàng
              </label>
              {orderTableContext.orderTable != null ? (
                <input
                  type="text"
                  value={orderTableContext.orderTable.username}
                  className="js-select2-custom-x form-ellipsis form-control cursor-not-allowed"
                  disabled
                />
              ) : (
                <>
                  <select
                    id="reservation_id"
                    className="js-data-example-ajax form-control form-ellipsis select2-results__options"
                    {...register("reservation_id", {
                      required: "Chưa chọn khách hàng",
                    })}
                    defaultValue={0}
                  >
                    <option disabled value={0}>
                      Lựa chọn khách hàng
                    </option>
                    {customers?.map((customer: IReservation) => {
                      return (
                        <option key={customer?.id} value={customer?.id}>
                          {customer.username}({customer.phone})
                        </option>
                      );
                    })}
                  </select>
                  {errors.reservation_id && (
                    <span className="text-red-500">
                      {errors.reservation_id.message as React.ReactNode}
                    </span>
                  )}
                  <button
                    className="btn btn-success bg-[#00a387] rounded text-nowrap flex justify-center items-center"
                    id="add_new_customer"
                    type="button"
                    data-toggle="modal"
                    data-target="#add-customer"
                    title="Add Customer"
                  >
                    <i className="tio-add px-1"></i>
                    Khách hàng
                  </button>
                </>
              )}
            </div>

            {/* Tables */}
            <div className="form-group d-flex flex-col flex-sm-nowrap gap-2">
              <label
                htmlFor="table_id"
                className="font-weight-semibold fz-16 text-dark"
              >
                Bàn
              </label>
              {orderTableContext.orderTable != null ? (
                <input
                  type="text"
                  value={orderTableContext.orderTable.table_name}
                  className="js-select2-custom-x form-ellipsis form-control cursor-not-allowed"
                  disabled
                />
              ) : (
                <>
                  <select
                    id="table_id"
                    {...register("table_id", {
                      required: "Chưa chọn bàn ăn",
                    })}
                    className="js-select2-custom-x form-ellipsis form-control"
                    defaultValue={0}
                  >
                    <option disabled value={0}>
                      Lựa chọn bàn
                    </option>
                    {tables?.map((table: ITable) => {
                      return (
                        <option key={table?.id} value={table?.id}>
                          {table.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.table_id && (
                    <span className="text-red-500">
                      {errors.table_id.message as React.ReactNode}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Addon */}
            <div className="pb-4">
              <ModalSelectOrderTable />
              <button
                type="button"
                data-toggle="modal"
                data-target="#select-order-table"
                className="btn rounded bg-[#ed4c78] focus:bg-[#ed4c78]"
              >
                <span className="text-sm font-normal text-white">
                  <i className="tio-add px-1"></i>
                  Gọi thêm
                </span>
              </button>
            </div>

            {/* Cart */}
            <div className="w-100" id="cart">
              <div className="table-responsive pos-cart-table border">
                <table className="table table-align-middle mb-0">
                  <thead className="text-dark bg-light">
                    <tr>
                      <th className="text-capitalize border-0 min-w-120">
                        Món
                      </th>
                      <th className="text-capitalize border-0">Số lượng</th>
                      <th className="text-capitalize border-0">Giá</th>
                      <th className="text-capitalize border-0">Xoá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {bookingContext.combo && (
                      <tr>
                        <td>{bookingContext.combo.name}</td>
                        <td></td>
                        <td>
                          <CurrencyFormat value={bookingContext.combo.price} />
                        </td>
                        <td>
                          <td className="justify-content-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                bookingContext.onHandleSetCombo(null)
                              }
                              className="btn btn-sm btn-outline-danger square-btn form-control flex justify-center items-center"
                            >
                              <i className="tio-delete" />
                            </button>
                          </td>
                        </td>
                      </tr>
                    )} */}
                    {cartsPos.length == 0 ? (
                      <tr></tr>
                    ) : (
                      <>
                        {cartsPos.map((item: any) => {
                          return (
                            <tr key={item.id}>
                              <td>
                                <div className="media align-items-center gap-2 flex flex-col gap-y-1">
                                  {item.image && (
                                    <img
                                      className="avatar avatar-sm"
                                      src={item.image}
                                      alt="Ice Cream image"
                                    />
                                  )}
                                  <h5 className="text-xs">{item.name}</h5>
                                </div>
                              </td>
                              <td>
                                {item.quantity && (
                                  <div className="flex gap-x-1">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        dispatch(decrease(item.id))
                                      }
                                    >
                                      <i className="tio-remove text-sm"></i>
                                    </button>

                                    <p className="border-2 rounded-md w-8 h-8 flex justify-center items-center text-xs">
                                      {item.quantity}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        dispatch(increase(item.id))
                                      }
                                    >
                                      <i className="tio-add text-sm"></i>
                                    </button>
                                  </div>
                                )}
                              </td>
                              <td>
                                <div className="text-xs">
                                  <CurrencyFormat value={item.price} />
                                </div>{" "}
                              </td>
                              <td className="justify-content-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => dispatch(remove(item.id))}
                                  className="btn btn-sm btn-outline-danger square-btn form-control flex justify-center items-center"
                                >
                                  <i className="tio-delete" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="pos-data-table p-3">
                <dl className="row">
                  <dt className="col-6 py-2">Tổng tiền hàng: </dt>
                  <dd className="col-6 text-right">
                    {totalItems && <CurrencyFormat value={totalItems} />}
                  </dd>
                </dl>
                <div id="order_place">
                  <div className="row mt-4 gy-2">
                    <div className="col-md-6">
                      <button
                        type="reset"
                        onClick={cancelOrder}
                        className="btn btn-outline-danger btn--danger btn-block focus:bg-[#ed4c78]"
                      >
                        Huỷ đơn
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block bg-red-500 flex justify-center items-center"
                        // data-toggle="modal"
                        // data-target="#print-invoice"
                      >
                        {isLoadingAddOrder || isLoadingAddOrderDetail ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Hoàn tất"
                        )}
                      </button>
                    </div>
                    <ModalPrintInvoice />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
