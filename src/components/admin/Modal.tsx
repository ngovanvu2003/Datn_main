const Modal = () => {
  return (
    <div className="modal fade" id="popup-modal">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <center>
                  <h2 style={{ color: "rgba(96,96,96,0.68)" }}>
                    <i className="tio-shopping-cart-outlined"></i> You have new
                    order Check Please.
                  </h2>
                  <hr />
                  <button
                    onClick={() => "check_order()"}
                    className="btn btn-primary"
                  >
                    Ok let me check
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
