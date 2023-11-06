const AdminTableOrderOnTable = () => {
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
          <span className="page-header-title">Running Table Orders</span>
        </h2>
        <span className="badge badge-soft-dark rounded-50 fz-14">70</span>
      </div>

      <div className="card">
        <div className="card-top px-card pt-4">
          <div className="row justify-content-between align-items-center gy-2">
            <div className="col-sm-4 col-md-5 col-lg-4">
              <form
                action="https://efood-admin.6amtech.com/admin/orders/list/all"
                method="GET"
              >
                <div className="input-group">
                  <input
                    id="datatableSearch_"
                    type="search"
                    name="search"
                    className="form-control"
                    placeholder="Search by Order ID  Order Status or Transaction Reference"
                    aria-label="Search"
                    defaultValue=""
                    required
                    autoComplete="off"
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#fc6a57" }}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-7">
              <div className="row">
                <div className="col-3">
                  <div id="invoice_btn" className="d-none">
                    <a
                      className="form-control btn btn-sm btn-white float-right"
                      href="https://efood-admin.6amtech.com/admin/table/order/running/invoice"
                    >
                      <i className="tio-print"></i> Invoice
                    </a>
                  </div>
                </div>
                <div className="col-5">
                  <select
                    className="form-control text-capitalize"
                    name="branch"
                    onChange={() => "filter_branch_orders(this.value)"}
                  >
                    <option disabled>--- Select Branch ---</option>
                    <option defaultValue="1">Main Branch</option>
                    <option defaultValue="2">Branch 2</option>
                    <option defaultValue="3">Farmgate</option>
                    <option defaultValue="4">Dhaka</option>
                  </select>
                </div>
                <div className="col-4">
                  <select
                    className="form-control text-capitalize"
                    name="table"
                    id="select_table"
                    defaultValue={0}
                  >
                    <option disabled>
                      --- Select Table ---
                    </option>
                    <option defaultValue="1">Table - 10001</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="table-responsive datatable-custom">
            <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
              <thead className="thead-light">
                <tr>
                  <th className="">SL</th>
                  <th className="table-column-pl-0">Order</th>
                  <th>Date</th>
                  <th>Branch</th>
                  <th>Table</th>
                  <th>Payment Status</th>
                  <th>Total</th>
                  <th>Order Status</th>
                  <th>Number of people</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="set-rows">
                <tr className="status-completed class-all">
                  <td className="">1</td>
                  <td className="table-column-pl-0">
                    <a href="https://efood-admin.6amtech.com/admin/orders/details/100059">
                      100059
                    </a>
                  </td>
                  <td>25 Oct 2022</td>
                  <td>
                    <label className="badge badge-soft-primary">
                      Main Branch
                    </label>
                  </td>
                  <td>
                    <label className="badge badge-soft-info">
                      Table - 10001
                    </label>
                  </td>
                  <td>
                    <span className="badge badge-soft-success">
                      <span className="legend-indicator bg-success"></span>
                      Paid
                    </span>
                  </td>
                  <td>351.25$</td>
                  <td className="text-capitalize">
                    <span className="badge badge-soft-info ml-2 ml-sm-3">
                      <span className="legend-indicator bg-info"></span>
                      Completed
                    </span>
                  </td>
                  <td>5</td>
                  <td>
                    <div className="dropdown">
                      <a
                        className="btn btn-sm btn-outline-primary square-btn"
                        href="https://efood-admin.6amtech.com/admin/orders/details/100059"
                      >
                        <i className="tio-invisible"></i>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr className="status-done class-all">
                  <td className="">2</td>
                  <td className="table-column-pl-0">
                    <a href="https://efood-admin.6amtech.com/admin/orders/details/100058">
                      100058
                    </a>
                  </td>
                  <td>25 Oct 2022</td>
                  <td>
                    <label className="badge badge-soft-primary">
                      Main Branch
                    </label>
                  </td>
                  <td>
                    <label className="badge badge-soft-info">
                      Table - 10001
                    </label>
                  </td>
                  <td>
                    <span className="badge badge-soft-success">
                      <span className="legend-indicator bg-success"></span>
                      Paid
                    </span>
                  </td>
                  <td>41.00$</td>
                  <td className="text-capitalize">
                    <span className="badge badge-soft-info ml-2 ml-sm-3">
                      <span className="legend-indicator bg-info"></span>Done
                    </span>
                  </td>
                  <td>5</td>
                  <td>
                    <div className="dropdown">
                      <a
                        className="btn btn-sm btn-outline-primary square-btn"
                        href="https://efood-admin.6amtech.com/admin/orders/details/100058"
                      >
                        <i className="tio-invisible"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTableOrderOnTable;
