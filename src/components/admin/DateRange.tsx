const DateRange = () => {
  return (
    <div className="card">
      <div className="card-body">
        <form action="#" id="form-data" method="GET">
          <div className="row gy-3 gx-2 align-items-end">
            <div className="col-12 pb-0">
              <h4 className="mb-0">Select date range</h4>
            </div>
            <div className="col-md-4 col-lg-3">
              <label htmlFor="select_branch">Select Branch</label>

              <select
                className="form-control"
                name="branch"
                onChange={() => "filter_branch_orders(this.value)"}
                id="select_branch"
                defaultValue={1}
              >
                <option disabled>--- Select Branch ---</option>
                <option defaultValue="0">All Branch</option>
                <option defaultValue="1">Main Branch</option>
                <option defaultValue="2">Branch 2</option>
                <option defaultValue="3">Farmgate</option>
                <option defaultValue="4">Dhaka</option>
              </select>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className="form-group mb-0">
                <label className="text-dark">Start Date</label>
                <input
                  type="date"
                  name="from"
                  defaultValue=""
                  id="from_date"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className="form-group mb-0">
                <label className="text-dark">End Date</label>
                <input
                  type="date"
                  defaultValue=""
                  name="to"
                  id="to_date"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12 col-lg-3 d-flex gap-2">
              <button
                className="btn btn-text flex-grow-1"
                style={{ backgroundColor: "#bdc5d1" }}
              >
                Clear
              </button>
              <button
                type="submit"
                className="btn btn-primary text-nowrap flex-grow-1"
                onClick={() => "formUrlChange(this)"}
                style={{ backgroundColor: "#fc6a57" }}
              >
                Show Data
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateRange;
