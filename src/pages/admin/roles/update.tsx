const AdminRoleUpdate = () => {
  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width={20}
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/product.png"
            alt=""
          />
          <span className="page-header-title">Update role</span>
        </h2>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form
                id="submit-create-role"
                action="https://efood-admin.6amtech.com/admin/custom-role/update/4"
                method="post"
              >
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="2j8ykdSKaIB2OD5ytd2pcivOfc0A4gRL7NTi4wFQ"
                />{" "}
                <div className="form-group">
                  <label htmlFor="name">Role name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue="Order Manager"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Ex : Store"
                  />
                </div>
                <div className="mb-5 d-flex flex-wrap align-items-center gap-3">
                  <h5 className="mb-0">Module Permission : </h5>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="select-all-btn"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="select-all-btn"
                    >
                      Select All
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="dashboard_management"
                        className="form-check-input select-all-associate"
                        id="dashboard_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="dashboard_management"
                      >
                        Dashboard management
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="pos_management"
                        className="form-check-input select-all-associate"
                        defaultChecked
                        id="pos_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="pos_management"
                      >
                        Pos management
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="order_management"
                        className="form-check-input select-all-associate"
                        defaultChecked
                        id="order_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="order_management"
                      >
                        Order management
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="product_management"
                        className="form-check-input select-all-associate"
                        id="product_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="product_management"
                      >
                        Product management
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="promotion_management"
                        className="form-check-input select-all-associate"
                        id="promotion_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="promotion_management"
                      >
                        Promotion management
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="help_and_support_management"
                        className="form-check-input select-all-associate"
                        id="help_and_support_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="help_and_support_management"
                      >
                        Help and support management
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="report_and_analytics_management"
                        className="form-check-input select-all-associate"
                        id="report_and_analytics_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="report_and_analytics_management"
                      >
                        Report and analytics management
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="user_management"
                        className="form-check-input select-all-associate"
                        id="user_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="user_management"
                      >
                        User management
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="table_management"
                        className="form-check-input select-all-associate"
                        defaultChecked
                        id="table_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="table_management"
                      >
                        Table management
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-sm-6">
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        name="modules[]"
                        defaultValue="system_management"
                        className="form-check-input select-all-associate"
                        id="system_management"
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor="system_management"
                      >
                        System management
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-3">
                  <button type="reset" className="btn btn-text" style={{  backgroundColor:"#e3e3e3" }}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ backgroundColor:"#ff6767" }}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRoleUpdate;
