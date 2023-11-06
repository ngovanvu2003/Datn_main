import { Link } from "react-router-dom";

const TopCustomer = () => {
  return (
    <div className="col-md-6 col-lg-6">
      <div className="card h-100 border border-gray-400">
        <div className="card-header d-flex justify-content-between gap-10">
          <h5 className="mb-0">Đơn đặt chỗ</h5>
          <Link to="/admin/reservation" className="btn-link">
            Xem tất cả
          </Link>
        </div>

        <div className="card-body max-h-[400px] overflow-y-auto">
          <div className="d-flex flex-column gap-3">
            <Link
              className="d-flex justify-content-between align-items-center text-dark"
              to="#"
            >
              <div className="media align-items-center gap-3">
                <img className="rounded avatar avatar-lg" src="" />
                <div
                  className="media-body d-flex flex-column"
                  style={{ marginRight: "60px" }}
                >
                  <span className="font-weight-semibold text-capitalize">
                    fatema
                  </span>
                  <span className="text-dark">0388557662</span>
                </div>
              </div>
              <span className="px-2 py-1 badge-soft-c1 font-weight-bold fz-12 rounded lh-1">
              Số người đi: 6
              </span>
            </Link>
            <Link
              className="d-flex justify-content-between align-items-center text-dark"
              to="#"
            >
              <div className="media align-items-center gap-3">
                <img className="rounded avatar avatar-lg" src="" />
                <div
                  className="media-body d-flex flex-column"
                  style={{ marginRight: "60px" }}
                >
                  <span className="font-weight-semibold text-capitalize">
                    fatema
                  </span>
                  <span className="text-dark">0388557662</span>
                </div>
              </div>
              <span className="px-2 py-1 badge-soft-c1 font-weight-bold fz-12 rounded lh-1">
                Số người đi: 6
              </span>
            </Link>
            <Link
              className="d-flex justify-content-between align-items-center text-dark"
              to="#"
            >
              <div className="media align-items-center gap-3">
                <img className="rounded avatar avatar-lg" src="" />
                <div
                  className="media-body d-flex flex-column"
                  style={{ marginRight: "60px" }}
                >
                  <span className="font-weight-semibold text-capitalize">
                    fatema
                  </span>
                  <span className="text-dark">0388557662</span>
                </div>
              </div>
              <span className="px-2 py-1 badge-soft-c1 font-weight-bold fz-12 rounded lh-1">
              Số người đi: 6
              </span>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCustomer;
