const Search = () => {

  return (
    <div className="card-top px-card pt-4">
      <div className="row justify-content-between align-items-center gy-2">
        <div className="col-sm-8 col-md-6 col-lg-8">
          <form
            action="https://efood-admin.6amtech.com/admin/orders/list/all"
            method="GET"
          >
            <div className="input-group z-0">
              <input
                id="datatableSearch_"
                type="search"
                name="search"
                className="form-control"
                placeholder="Tìm Kiếm Theo Tên Khách Hàng..."
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
        <div className="col-sm-4 col-md-6 col-lg-4 d-flex justify-content-end">
          <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="tio-download-to"></i>
              Export
              <i className="tio-chevron-down"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a
                  type="submit"
                  className="dropdown-item d-flex align-items-center gap-2"
                  href="https://efood-admin.6amtech.com/admin/orders/export-excel?status=all"
                >
                  <img
                    width="14"
                    src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/excel.png"
                    alt=""
                  />
                  Excel
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
