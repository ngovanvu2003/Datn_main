import DateRange from "../../../components/admin/DateRange";
import Paginate from "../../../components/admin/Paginate";
import Search from "../../../components/admin/Search";

const AdminTableOrder = () => {
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
          <span className="page-header-title">All Table Orders</span>
        </h2>
        <span className="badge badge-soft-dark rounded-50 fz-14">70</span>
      </div>

      <div className="card">
        <DateRange />

        <div className="px-4 mt-4">
          <div className="row g-2">
            <div className="col-sm-6 col-lg-4">
              <a
                className="order--card h-100"
                href="https://efood-admin.6amtech.com/admin/table/order/list/confirmed"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="card-subtitle d-flex justify-content-between m-0 align-items-center">
                    <img
                      src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/confirmed.png"
                      alt="dashboard"
                      className="oder--card-icon"
                    />
                    <span>Confirmed</span>
                  </h6>
                  <span className="card-title text-107980">6</span>
                </div>
              </a>
            </div>
            <div className="col-sm-6 col-lg-4">
              <a
                className="order--card h-100"
                href="https://efood-admin.6amtech.com/admin/table/order/list/cooking"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="card-subtitle d-flex justify-content-between m-0 align-items-center">
                    <img
                      src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/cooking.png"
                      alt="dashboard"
                      className="oder--card-icon"
                    />
                    <span>Cooking</span>
                  </h6>
                  <span className="card-title text-danger">2</span>
                </div>
              </a>
            </div>
            <div className="col-sm-6 col-lg-4">
              <a
                className="order--card h-100"
                href="https://efood-admin.6amtech.com/admin/table/order/list/done"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="card-subtitle d-flex justify-content-between m-0 align-items-center">
                    <img
                      src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/review.png"
                      alt="dashboard"
                      className="oder--card-icon"
                    />
                    <span>Ready to serve</span>
                  </h6>
                  <span className="card-title text-00B2BE">2</span>
                </div>
              </a>
            </div>
            <div className="col-sm-6 col-lg-4">
              <a
                className="order--card h-100"
                href="https://efood-admin.6amtech.com/admin/table/order/list/completed"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="card-subtitle d-flex justify-content-between m-0 align-items-center">
                    <img
                      src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/product.png"
                      alt="dashboard"
                      className="oder--card-icon"
                    />
                    <span>Completed</span>
                  </h6>
                  <span className="card-title text-success">1</span>
                </div>
              </a>
            </div>
            <div className="col-sm-6 col-lg-4">
              <a
                className="order--card h-100"
                href="https://efood-admin.6amtech.com/admin/table/order/list/canceled"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="card-subtitle d-flex justify-content-between m-0 align-items-center">
                    <img
                      src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/canceled.png"
                      alt="dashboard"
                      className="oder--card-icon"
                    />
                    <span>Canceled</span>
                  </h6>
                  <span className="card-title text-success">0</span>
                </div>
              </a>
            </div>

            <div className="col-sm-6 col-lg-4">
              <a
                className="order--card h-100"
                href="https://efood-admin.6amtech.com/admin/table/order/running"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="card-subtitle d-flex justify-content-between m-0 align-items-center">
                    <img
                      src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/out_for_delivery.png"
                      alt="dashboard"
                      className="oder--card-icon"
                    />
                    <span>Running</span>
                  </h6>
                  <span className="card-title text-danger">6</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <Search />

        <div className="py-4">
          <div className="table-responsive datatable-custom">
            <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
              <thead className="thead-light">
                <tr>
                  <th>SL</th>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Branch</th>
                  <th>Total Amout</th>
                  <th>Order Status</th>
                  <th>Order Type</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="set-rows">
                <tr className="status-cooking class-all">
                  <td>1</td>
                  <td>
                    <a
                      className="text-dark"
                      href="https://efood-admin.6amtech.com/admin/table/order/details/100090"
                    >
                      100090
                    </a>
                  </td>
                  <td>
                    <div>09 Mar 2023</div>
                    <div>12:03 PM</div>
                  </td>
                  <td>Branch 2</td>
                  <td>
                    <div>640.00$</div>
                    <span className="text-success">Paid</span>
                  </td>
                  <td className="text-capitalize">
                    <span className="badge-soft-success px-2 rounded">
                      Cooking
                    </span>
                  </td>
                  <td className="text-capitalize">
                    <span className="badge-soft-info px-2 rounded">
                      Dine in
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <a
                        className="btn btn-sm btn-outline-primary square-btn"
                        href="https://efood-admin.6amtech.com/admin/table/order/details/100090"
                      >
                        <i className="tio-invisible"></i>
                      </a>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success square-btn"
                        onClick={() => "print_invoice('100090')"}
                      >
                        <i className="tio-print"></i>
                        <a
                          href="https://efood-admin.6amtech.com/admin/orders/generate-invoice/100090"
                          target="_blank"
                        ></a>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Paginate />
      </div>
    </>
  );
};

export default AdminTableOrder;
