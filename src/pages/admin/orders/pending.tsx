import { useGetOrdersQuery } from "../../../api/order";
import { useEffect, useState } from "react";
import { IOrder } from "../../../interface/order";
import { DateTimeFormat } from "../../../components/DateTimeFormat";
import { CurrencyFormat } from "../../../components/CurrencyFormat";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminOrderPending = () => {
  const { data:orders, } = useGetOrdersQuery()
  const [ ordersData, setOrdersData ] = useState(orders)
  
  useEffect(()=>{
      setOrdersData(orders)
  },[orders])
  const orderPeding = ordersData?.data?.data.filter((order:any) => order.order_status==0)
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";
  const handlePageChange = (path:string) => {
    axios.get(`${path}`,{
      headers:{
        Authorization: `Bearer ${access_token}`
      }
    })
    .then((res)=>{
      setOrdersData(res.data)
    })
    .catch((error)=>{
      console.log("ERR:",error)
    })
  }
  return (
    <>
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
      <h2 className="h1 mb-0 d-flex align-items-center gap-1">
        <img
          width="20"
          className="avatar-img"
          src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/all_orders.png"
          alt=""
        />
        <span className="page-header-title uppercase">
          DANH SÁCH ĐƠN HÀNG ĐANG CHỜ XỬ LÝ
        </span>
      </h2>
      <span className="badge badge-soft-dark rounded-50 fz-14">
      </span>
    </div>
    <div className="card">
      <div className="py-4">
        <div className="table-responsive datatable-custom">
          <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
            <thead className="thead-light">
              <tr>
                <th>Thời gian đặt</th>
                <th>Thông tin khách hàng</th>
                <th>Chi nhánh</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody id="set-rows">
              {orderPeding?.map((order: IOrder) => {
                return (
                  <tr className="status-done className-all">
                    <td>
                      <div>
                        <DateTimeFormat value={order.created_at} />
                      </div>
                    </td>
                    <td>
                      <h6 className="text-capitalize mb-1">
                        {order.username}
                      </h6>
                      <a
                        className="text-dark fz-12"
                        href={`tel:${order.phone}`}
                      >
                        {order.phone}
                      </a>
                    </td>
                    <td>
                      <span className="badge-soft-info px-2 py-1 rounded">
                        {order.branch_name}
                      </span>
                    </td>
                    <td>
                      <div>
                        <CurrencyFormat value={order.order_amount} />
                      </div>
                    </td>
                    <td className="text-capitalize">
                      {order.order_status == 0 ? (
                        <span className="badge-soft-danger px-2 py-1 rounded">
                          Chưa thanh toán{" "}
                        </span>
                      ) : (
                        <span className="badge-soft-success px-2 py-1 rounded">
                          Đã thanh toán{" "}
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          className="btn btn-sm btn-outline-primary square-btn"
                          to={`/admin/orders/detail/${order.id}`}
                        >
                          <i className="tio-invisible"></i>
                        </Link>
                        <Link
                          className="btn btn-sm btn-outline-success square-btn"
                          target="_blank"
                          to={`/admin/orders/invoice/${order.id}`}
                        >
                          <i className="tio-print"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="table-responsive mt-4 px-3">
          <div className="d-flex justify-content-lg-end">
            <nav>
              <ul className="pagination">
                {ordersData?.data?.links?.map(
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
    </div>
  </>
  );
};

export default AdminOrderPending;
