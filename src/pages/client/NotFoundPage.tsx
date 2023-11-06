
const NotFoundPage = () => {
  return (
    <>
    <div className="container">
      <div className="footer-height-offset d-flex justify-content-center align-items-center flex-column">
        <div className="row align-items-sm-center w-100">
          <div className="col-sm-6">
            <div className="text-center text-sm-right mr-sm-4 mb-5 mb-sm-0">
              <img
                className="w-60 w-sm-100 mx-auto"
                src="https://efood-admin.6amtech.com/public/assets/admin/svg/illustrations/think.svg"
                alt="Image Description"
                style={{ maxWidth: "15rem" }}
              />
            </div>
          </div>
          <div className="col-sm-6 col-md-4 text-center text-sm-left">
            <h1 className="display-1 mb-0">404</h1>
            <p className="lead">
            Xin lỗi, trang bạn đang tìm kiếm không thể tìm thấy.
            </p>
            <a
              className="btn btn-primary mt-3"
              href="/"
            >
              Quay lại
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="footer text-center">
      <ul className="list-inline list-separator">
        <li className="list-inline-item">
          <a
            className="list-separator-link"
            target="_blank"
            href="https://6amtech.com/"
          >
            Easy Food Support
          </a>
        </li>
      </ul>
    </div>
  </>
  )
}

export default NotFoundPage