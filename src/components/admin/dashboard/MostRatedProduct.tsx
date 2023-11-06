const MostRatedProduct = () => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 border border-gray-400">
        <div className="card-header d-flex justify-content-between gap-10">
          <h5 className="mb-0">Most Rated Products</h5>
          <a href="./admin/reviews/list" className="btn-link">
            View All
          </a>
        </div>

        <div className="card-body">
          <div className="grid-item-wrap">
            <a className="grid-item text-dark" href="./admin/product/view/10">
              <div className="d-flex align-items-center gap-2">
                <img
                  className="rounded avatar"
                  src="https://efood-admin.6amtech.com/storage/app/public/product/2022-06-12-62a589d4d1130.png"
                  alt="Set Menu 2 image"
                />
                <span className=" font-weight-semibold text-capitalize media-body">
                  Set Menu 2
                </span>
              </div>
              <div>
                <span className="rating text-primary">
                  <i className="tio-star"></i>
                </span>
                <span>4.33 </span>
                (6)
              </div>
            </a>
            <a className="grid-item text-dark" href="./admin/product/view/6">
              <div className="d-flex align-items-center gap-2">
                <img
                  className="rounded avatar"
                  src="https://efood-admin.6amtech.com/storage/app/public/product/2021-02-01-6017104848534.png"
                  alt="Mozzarella Cheese Pizza image"
                />
                <span className=" font-weight-semibold text-capitalize media-body">
                  Mozzarella Cheese ...
                </span>
              </div>
              <div>
                <span className="rating text-primary">
                  <i className="tio-star"></i>
                </span>
                <span>3.00 </span>
                (2)
              </div>
            </a>
            <a className="grid-item text-dark" href="./admin/product/view/11">
              <div className="d-flex align-items-center gap-2">
                <img
                  className="rounded avatar"
                  src="https://efood-admin.6amtech.com/storage/app/public/product/2021-02-01-60171610bf3c0.png"
                  alt="Cheese Sandwich With Spicy Grilled image"
                />
                <span className=" font-weight-semibold text-capitalize media-body">
                  Cheese Sandwich Wi...
                </span>
              </div>
              <div>
                <span className="rating text-primary">
                  <i className="tio-star"></i>
                </span>
                <span>5.00 </span>
                (1)
              </div>
            </a>
            <a className="grid-item text-dark" href="./admin/product/view/16">
              <div className="d-flex align-items-center gap-2">
                <img
                  className="rounded avatar"
                  src="https://efood-admin.6amtech.com/storage/app/public/product/2021-02-24-60360c3059cae.png"
                  alt="Spicy Burger image"
                />
                <span className=" font-weight-semibold text-capitalize media-body">
                  Spicy Burger
                </span>
              </div>
              <div>
                <span className="rating text-primary">
                  <i className="tio-star"></i>
                </span>
                <span>3.00 </span>
                (1)
              </div>
            </a>
            <a className="grid-item text-dark" href="./admin/product/view/21">
              <div className="d-flex align-items-center gap-2">
                <img
                  className="rounded avatar"
                  src="https://efood-admin.6amtech.com/storage/app/public/product/2021-02-26-6038935d27cb8.png"
                  alt="Chizza Meal image"
                />
                <span className=" font-weight-semibold text-capitalize media-body">
                  Chizza Meal
                </span>
              </div>
              <div>
                <span className="rating text-primary">
                  <i className="tio-star"></i>
                </span>
                <span>3.00 </span>
                (1)
              </div>
            </a>
            <a className="grid-item text-dark" href="./admin/product/view/18">
              <div className="d-flex align-items-center gap-2">
                <img
                  className="rounded avatar"
                  src="https://efood-admin.6amtech.com/storage/app/public/product/2021-02-26-60388f49daed1.png"
                  alt="Fresh Lime image"
                />
                <span className=" font-weight-semibold text-capitalize media-body">
                  Fresh Lime
                </span>
              </div>
              <div>
                <span className="rating text-primary">
                  <i className="tio-star"></i>
                </span>
                <span>4.00 </span>
                (1)
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostRatedProduct;
