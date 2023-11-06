import { useParams } from "react-router-dom";
import { useGetCustomerByIdQuery } from "../../../api/customer";
import { DateTimeFormat } from "../../../components/DateTimeFormat";
const AdminCustomerDetail = () => {
  const { id }: any = useParams();
  const { data: customer } = useGetCustomerByIdQuery(id);
  return (
    <>
      <div className="d-print-none pb-2">
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3 border-bottom pb-3">
          <h2 className="h1 mb-0 d-flex align-items-center gap-2">
            <img
              width="20"
              className="avatar-img"
              src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/customer.png"
              alt=""
            />
            <span className="page-header-title">Customer Details</span>
          </h2>
        </div>
        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-3">
          <div className="d-flex flex-column gap-2">
            <h2 className="page-header-title h1">
              Customer ID :{customer?.data?.id}
            </h2>
            <span className="flex ">
              <i className="tio-date-range"></i>
              Thời gian đăng ký:{" "}
              <DateTimeFormat value={customer?.data?.created_at} />
            </span>
          </div>
          <div className="d-flex flex-wrap gap-3 justify-content-lg-end">
            <a
              className="btn btn-primary"
              href="https://efood-admin.6amtech.com/admin/customer/transaction/194"
            >
              Point History
            </a>
            <a href="" className="btn btn-primary">
              <i className="tio-home-outlined"></i>
              Dashboard
            </a>
          </div>
        </div>
      </div>
      <div className="row mb-2 g-2">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="resturant-card bg--3">
            <img
              className="resturant-icon"
              src="https://efood-admin.6amtech.com/public/assets/admin/img/dashboard/3.png"
              alt="dashboard"
            />
            <div className="for-card-text font-weight-bold text-uppercase mb-1">
              Tổng số tiền đã thanh toán
            </div>
            <div className="for-card-count">0</div>
          </div>
        </div>
      </div>
      <div className="row flex-wrap-reverse g-2" id="printableArea">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-top px-card pt-4">
              <div className="row align-items-center">
                <div className="col-sm-4 col-md-6 col-xl-7">
                  <h5 className="d-flex gap-2 align-items-center">
                    Order List
                    <span className="badge badge-soft-dark rounded-50 fz-12">
                      0
                    </span>
                  </h5>
                </div>
                <div className="col-sm-8 col-md-6 col-xl-5">
                  <form
                    action="https://efood-admin.6amtech.com/admin/customer/view/194"
                    method="GET"
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        name="search"
                        className="form-control"
                        placeholder="Tìm kiếm theo order ID"
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
                          Tìm kiếm
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="table-responsive datatable-custom">
                <div
                  id="columnSearchDatatable_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <div
                    id="columnSearchDatatable_filter"
                    className="dataTables_filter"
                  >
                    <label>
                      Search:
                      <input
                        type="search"
                        className=""
                        placeholder=""
                        aria-controls="columnSearchDatatable"
                      />
                    </label>
                  </div>
                  <table
                    id="columnSearchDatatable"
                    className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100 dataTable no-footer"
                    data-hs-datatables-options='{"order": [], "orderCellsTop": true}'
                    role="grid"
                    aria-describedby="columnSearchDatatable_info"
                  >
                    <thead className="thead-light">
                      <tr role="row">
                        <th
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="columnSearchDatatable"
                          rowSpan={1}
                          colSpan={1}
                          aria-sort="ascending"
                          aria-label="SL: activate to sort column descending"
                          style={{ width: "73.031px" }}
                        >
                          SL
                        </th>
                        <th
                          className="text-center sorting"
                          tabIndex={0}
                          aria-controls="columnSearchDatatable"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Order ID: activate to sort column ascending"
                          style={{ width: "130.734px" }}
                        >
                          Order ID
                        </th>
                        <th
                          className="text-center sorting"
                          tabIndex={0}
                          aria-controls="columnSearchDatatable"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Total Amount: activate to sort column ascending"
                          style={{ width: "181.469px" }}
                        >
                          Tổng tiền đã thanh toán
                        </th>
                        <th
                          className="text-center sorting"
                          tabIndex={0}
                          aria-controls="columnSearchDatatable"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Action: activate to sort column ascending"
                          style={{ width: "112.766px" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="odd">
                        <td
                          valign="top"
                          colSpan={4}
                          className="dataTables_empty"
                        >
                          Chưa có lịch ở đặt bàn
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    className="dataTables_info"
                    id="columnSearchDatatable_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 0 to 0 of 0 entries
                  </div>
                </div>
              </div>
              <div className="table-responsive px-3">
                <div className="d-flex justify-content-lg-end"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title d-flex gap-2">
                <span className="tio-user"></span> {customer?.data.name}
              </h4>
            </div>
            <div className="card-body">
              <div className="media gap-3">
                <div className="avatar avatar-xl avatar-circle">
                  <img
                    className="img-fit rounded-circle"
                    src="https://efood-admin.6amtech.com/public/assets/admin/img/160x160/img1.jpg"
                    alt="Image Description"
                  />
                </div>
                <div className="media-body d-flex flex-column gap-1">
                  <div className="text-dark d-flex gap-2 align-items-center">
                    <span className="tio-email"></span>{" "}
                    <a
                      className="text-dark"
                      href="mailto:moniraperveen3@gmail.com"
                    >
                      {customer?.data?.email}
                    </a>
                  </div>
                  <div className="text-dark d-flex gap-2 align-items-center">
                    <span className="tio-call-talking-quiet"> </span>
                    {customer?.data?.phone}
                    <a className="text-dark" href="tel:"></a>
                  </div>
                  <div className="text-dark d-flex gap-2 align-items-center">
                    <span className="tio-shopping-basket-outlined"></span> 0
                    Orders
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-header">
              <h4 className="card-header-title d-flex gap-2">
                <span className="tio-home"></span>Địa chỉ
              </h4>
            </div>
            <div className="card-body">Chưa có địa chỉ</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCustomerDetail;
