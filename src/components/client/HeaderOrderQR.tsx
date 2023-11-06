import { ReactNode, useEffect, useState } from "react";
import QrCodeSvg from "../QrCodeSvg";
import { useParams } from "react-router-dom";
import { useGetOrderByIdMutation } from "../../api/tables";
import axios from "axios";

type Props = {
  qr: string | TrustedHTML | undefined;
  table: {
    branch_name: ReactNode;
    id: string;
    name: string;
    parents_id: string;
    qr_code_children: string | TrustedHTML | undefined;
    quantity_chair: string;
    table_status: string;
  };
};

const HeaderOrderQR = (props: Props | any) => {
  const { id } = useParams();
  const [getOrderById] = useGetOrderByIdMutation();
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    (async () => {
      getOrderById(id)
        .unwrap()
        .then(({ data }) => {
          setOrderId(data.id);
        });
    })();
  }, [getOrderById, id]);

  const onHandlePayment = (orderId: any) => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL_API}vnpay/payment/${orderId}`)
      .then(({ data }) => {
        const newTab = window.open(data.data, "_blank");
        if (newTab) {
          newTab.focus(); 
        } else {
          alert(
            "Trình duyệt của bạn đã chặn cửa sổ popup. Vui lòng cho phép nó để tiếp tục."
          );
        }
      });
  };

  return (
    <div>
      <header className="header pb-2" data-header>
        <div className="container">
          <div className="header-btn-group">
            <input
              type="search"
              name=""
              id=""
              style={{
                width: "100%",
                margin: "20px 0px",
                borderRadius: "10px",
                padding: "7px",
                border: "none",
                backgroundColor: "#60606024",
              }}
              placeholder="Bạn đang cần tìm món gì nào ?"
            />
          </div>
        </div>
        <div className="row" style={{ marginBottom: "20px" }}>
          <img
            className="col-lg-6  "
            src="/public\Images - Copy\poster1.jpg"
            alt=""
            style={{
              borderRadius: " 20px 0px 0px 20px",
              padding: "0",
              boxShadow: "#60606082 5px 5px 20px",
            }}
          />
          <div
            className="col-lg-6"
            style={{
              backgroundColor: "white",
              borderRadius: " 0px 20px 20px 0px",
              boxShadow: "#60606082 5px 5px 20px",
              padding: "0",
            }}
          >
            <div className="text" style={{ margin: "10px 0px 0px 20px" }}>
              <div
                className="head-text"
                style={{ display: "grid", gridTemplateColumns: "4fr 1fr" }}
              >
                <h1 className="font-bold  flex items-center gap-4 md:text-[48px] text-[38px]">
                  Fire BBQ{" "}
                  <img
                    src="/public\Images - Copy\logo.png"
                    alt=""
                    style={{ width: "50px" }}
                  />
                </h1>
                <a href="/public\Images - Copy\qr.jpg" download={"QR-code"}>
                  {/* <img
                    src="../public\Images - Copy\qr.jpg"
                    alt=""
                    style={{ width: "100%", padding: "10px" }}
                  /> */}
                  <div style={{ width: "100%", padding: "10px" }}>
                    <QrCodeSvg value={props?.qr} />
                  </div>
                </a>
              </div>
              <p className="flex py-3" style={{ fontWeight: "600" }}>
                <img
                  src="/public\Images - Copy\location_on_FILL0_wght400_GRAD0_opsz24.png"
                  alt=""
                />
                {props.table?.branch_name}
              </p>

              <hr />
              <div
                style={{ display: "grid", gridTemplateColumns: "5fr 1.6fr" }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    src="/Images - Copy\restaurant.png"
                    alt=""
                    style={{ width: "11%", height: "30px", margin: "0px 5px" }}
                  />
                  <p
                    style={{
                      margin: "5px 3px",
                      fontWeight: "500",
                      color: "#626262",
                    }}
                  >
                    Bạn đang ngồi
                  </p>
                  <span
                    style={{
                      color: "orange",
                      fontWeight: "600",
                      margin: "5px 3px",
                    }}
                  >
                    {props.table.name}
                  </span>
                </div>
                <div style={{ display: "flex", margin: "10px" }}>
                  <button
                    style={{
                      border: "none",
                      outline: "none",
                      margin: "0px 4px",
                    }}
                    onClick={() => onHandlePayment(orderId)}
                  >
                    <img src="/Images - Copy/credit-card.png" alt="" />
                  </button>
                  <button
                    style={{
                      border: "none",
                      outline: "none",
                      margin: "0px 4px",
                    }}
                  >
                    <img src="/Images - Copy/bell.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderOrderQR;
