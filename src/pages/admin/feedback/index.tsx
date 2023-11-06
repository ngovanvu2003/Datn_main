import Paginate from "../../../components/admin/Paginate";

const AdminFeedback = () => {
  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width={20}
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/review.png"
            alt=""
          />
          <span className="page-header-title">Product review</span>
        </h2>
      </div>
      <div className="row g-2">
        <div className="col-12">
          <div className="card">
            <div className="card-top px-card pt-4">
              <div className="row justify-content-between align-items-center gy-2">
                <div className="col-sm-4 col-md-6 col-lg-8">
                  <h4>
                    Review list{" "}
                    <span
                      id="total_count"
                      className="badge badge-soft-dark rounded-50 fz-14"
                    >
                      15
                    </span>
                  </h4>
                </div>
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <form
                    action="https://efood-admin.6amtech.com/admin/reviews/search"
                    method="post"
                    id="search-form"
                  >
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="44KPYQuxnktIFBS2lW02Caswlmp7jQegUjuiCavD"
                    />{" "}
                    <div className="input-group z-0">
                      <input
                        id="datatableSearch_"
                        type="search"
                        name="search"
                        className="form-control"
                        placeholder="Search by product name"
                        aria-label="Search"
                        defaultValue=""
                        autoComplete="off"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor:"#fe6767" }}>
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="table-responsive datatable-custom">
                <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
                  <thead className="thead-light">
                    <tr>
                      <th>SL</th>
                      <th>Product name</th>
                      <th>Customer info</th>
                      <th>Review</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody id="set-rows">
                    <tr>
                      <td>1</td>
                      <td>
                        <div>
                          <a
                            className="text-dark media align-items-center gap-2"
                            href="https://efood-admin.6amtech.com/admin/product/view/19"
                          >
                            <div className="avatar">
                              <img
                                className="rounded-circle img-fit"
                                src="https://efood-admin.6amtech.com/storage/app/public/product/2021-02-26-6038903ac16c7.png"
                                alt=""
                              />
                            </div>
                            <span className="media-body max-w220 text-wrap">
                              Zinger &amp; Pop
                            </span>
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <a
                            className="text-dark"
                            href="https://efood-admin.6amtech.com/admin/customer/view/188"
                          >
                            Will Smith
                          </a>
                          <a
                            className="text-dark fz-12"
                            href="tel:'+8801621720045'"
                          >
                            +8801621720045
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="max-w300 line-limit-3">
                          The food is always good.
                        </div>
                      </td>
                      <td>
                        <label className="badge badge-soft-info">
                          5 <i className="tio-star" />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>
                        <div>
                          <span className="badge-pill badge-soft-dark text-muted small">
                            Product unavailable
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <a
                            className="text-dark"
                            href="https://efood-admin.6amtech.com/admin/customer/view/1"
                          >
                            Ashek Elahe
                          </a>
                          <a
                            className="text-dark fz-12"
                            href="tel:'01879762951'"
                          >
                            01879762951
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="max-w300 line-limit-3">nice work</div>
                      </td>
                      <td>
                        <label className="badge badge-soft-info">
                          4 <i className="tio-star" />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Paginate/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFeedback;
