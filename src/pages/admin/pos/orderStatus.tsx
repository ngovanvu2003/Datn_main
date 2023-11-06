import { Link, Outlet, useLocation } from "react-router-dom";

const posOrderDetailStatusMenu = [
  {
    id: "1",
    label: "Chờ xác nhận",
    path: "/admin/pos/order-status/pending",
    iconImage:
      "https://efood-admin.6amtech.com/public/assets/admin/img/icons/pending.png",
    active: false,
  },
  {
    id: "2",
    label: "Đã duyệt",
    path: "/admin/pos/order-status/confirmed",
    iconImage:
      "https://efood-admin.6amtech.com/public/assets/admin/img/icons/confirmed.png",
    active: false,
  },
  {
    id: "3",
    label: "Đã hoàn thành",
    path: "/admin/pos/order-status/done",
    iconImage:
      "https://efood-admin.6amtech.com/public/assets/admin/img/icons/delivered.png",
    active: false,
  },
  {
    id: "4",
    label: "Đã trả đồ",
    path: "/admin/pos/order-status/returned",
    iconImage:
      "https://efood-admin.6amtech.com/public/assets/admin/img/icons/returned.png",
    active: false,
  },
  {
    id: "5",
    label: "Đã huỷ",
    path: "/admin/pos/order-status/cancel",
    iconImage:
      "https://efood-admin.6amtech.com/public/assets/admin/img/icons/canceled.png",
    active: false,
  },
];

const AdminPosOrderStatus = () => {
  const { pathname } = useLocation();
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
            <span className="z-0">Trạng thái đơn hàng</span>
            <span className="badge badge-soft-dark rounded-50 fz-12"></span>
          </h5>
        </h2>
        <span className="badge badge-soft-dark rounded-50 fz-14"></span>
      </div>
      <div className="card">
        <div className="px-4 mt-4">
          <div className="row g-2">
            {posOrderDetailStatusMenu.map((item: any) => {
              return (
                <div className="col-sm-6 col-lg-3" key={item.id}>
                  <Link className={`order--card h-100 ${item.path == pathname ? "bg-[#45e0ee]" : "bg-[#00c9db1a]"}`} to={item.path}>
                    <div className="d-flex justify-content-between align-items-center ">
                      <h6 className="card-subtitle d-flex justify-content-between m-0 align-items-center">
                        <img
                          src={item.iconImage}
                          alt="dashboard"
                          className="oder--card-icon"
                        />
                        <span>{item.label}</span>
                      </h6>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPosOrderStatus;
