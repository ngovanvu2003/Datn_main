const Paginate = () => {
  return (
    <div className="table-responsive mt-4 px-3">
      <div className="d-flex justify-content-lg-end">
        <nav>
          <ul className="pagination">
            <li
              className="page-item disabled"
              aria-disabled="true"
              aria-label="« Previous"
            >
              <span className="page-link" aria-hidden="true">
                ‹
              </span>
            </li>
            <li className="page-item active" aria-current="page">
              <span className="page-link">1</span>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href=""
              >
                2
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href=""
              >
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href=""
                rel="next"
                aria-label="Next »"
              >
                ›
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Paginate;
