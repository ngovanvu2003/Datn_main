import { useLocation } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../context";
import { Link } from "react-router-dom";

const PaymentResult = () => {
  const orderStatus = useContext(AppContext);
  console.log(orderStatus);
  const [status, setStatus] = useState();
  const url = useLocation();
  const queryString = url.search;
  const searchParams = new URLSearchParams(queryString);
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  console.log(
    "vnp_TransactionStatus:",
    vnp_TransactionStatus,
    "vnp_TxnRef:",
    vnp_TxnRef
  );
  axios
    .post(`${import.meta.env.VITE_BASE_URL_API}vnpay/payment-result`, {
      vnp_TxnRef,
      vnp_TransactionStatus,
    })
    .then(({ data }) => {
      setStatus(data.meta.status_code);
      orderStatus.setOrderStatus();
    });

  return (
    <div>
      {status == "0" ? (
        <div>
          <div className="flex justify-center items-center ">
            <div className="my-5">
              <img
                src="/ImagesCLient\3d-hand-making-cashless.png"
                alt=""
                style={{ width: "400px" }}
              />
              <p className="text-6xl" style={{ fontFamily: "Playpen Sans" }}>
                Thank you !
              </p>
            </div>
          </div>
          <p className="flex justify-center items-center  text-xl">
            Hóa đơn của bạn đã được thanh toán thành công. Rất hân hạnh được
            phục vụ!
          </p>
          <div className="flex justify-center items-center ">
            <Link to={"/admin/orders/all"} id="btn-back">
              Quay lại
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center ">
            <div className="my-5">
              <img
                src="/ImagesCLient\400 Error Bad Request-amico.png"
                alt=""
                style={{ width: "400px" }}
              />
              <p className="text-6xl" style={{ fontFamily: "Playpen Sans" }}>
                Oops, Oh no!
              </p>
            </div>
          </div>
          <p className="flex justify-center items-center  text-xl">
            Hóa đơn của bạn chưa được thanh toán. Đã có lỗi xảy ra vu lòng thanh
            toán lại !
          </p>
          <div className="flex justify-center items-center ">
            <Link to={"/admin/orders/all"} id="btn-back">
              Quay lại
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
