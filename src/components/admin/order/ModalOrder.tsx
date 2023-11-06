import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import toast from "react-hot-toast";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "../../../api/order";
import {  useParams } from "react-router-dom";
import { CurrencyFormat } from "../../CurrencyFormat";
import { useState } from "react";
import axios from "axios";

const ModalOrder = () => {
  const { confirm } = Modal;
  const { id } = useParams<{ id: string }>();
  const [updateOrder] = useUpdateOrderMutation();
  const { data: orderData } = useGetOrderByIdQuery(id || "");
  const data = orderData?.data?.order;
  const [tienThoi,setTienThoi] = useState<number>(0)

  const tong = data?.order_amount
 
  const onHandleChange= (e:any)=>{
    setTienThoi(e.target.value - tong);
  }
  const onHandleConfirm = (value: any) => {
    confirm({
      title: "Xác nhận đơn hàng?",
      icon: <ExclamationCircleFilled />,
      content: `Bạn xác nhận đơn hàng đã được thanh toán?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await updateOrder({
            ...value,
            id: value.order_id,
            order_status: "1",
          })
            .unwrap()
            .then(({ meta }: any) => {
              toast.success(meta.message);
              window.location.href = "/admin/orders/all"
            })
            .catch(({ data }: any) => {
              const { message } = data.meta;
              if (message && typeof message == "string") toast.error(message);
              if (message.id) message.id.map((err: any) => toast.error(err));
            });
        } catch {
          toast.error("Đã có lỗi xảy ra!");
        }
      },
      onCancel() {},
    });
  };
  const onHandlePayment = (id: any) => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL_API}vnpay/payment/${id}`)
      .then(({ data }) => {
        window.location.href= data.data
      });
  }
  return (
    <div>
      <div className="modal fade" id="thanhtoan">
        <div className="modal-dialog">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                backgroundColor: "#0E8A74",
                borderRadius: "10px 10px 0px 0px",
                zIndex: "9999",
              }}
            >
              <p></p>
              <p aria-hidden="true" style={{ color: "#fff" }}>
                ×
              </p>
            </button>
            <div
              style={{
                backgroundColor: "#0E8A74",
                height: "150px",
              }}
            >
              <h1
                style={{
                  fontSize: "25px",
                  textAlign: "center",
                  color: "#fff",
                  position: "relative",
                }}
              >
                THANH TOÁN ĐƠN HÀNG
              </h1>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                width: "90%",
                margin: "0 auto",
                minHeight: "180px",
                position: "absolute",
                top: "12%",
                left: "5%",
                borderRadius: "20px",
                boxShadow: "1px 4px 10px 5px rgba(116, 116, 116, 0.25)",
              }}
            >
              <div className="option">
                <ul
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    boxShadow: "0px 4px 30px 3px rgba(0, 0, 0, 0.25)",
                    borderRadius: "20px 20px 0px 0px",
                  }}
                >
                  <li style={{ padding: "15px" }}>
                    Tiền mặt
                  </li>
                  <li style={{ padding: "15px" }} className="cursor-pointer"
                  onClick={() => onHandlePayment(id)}
                  >
                    Chuyển khoản
                  </li>
                </ul>
                <h2
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "700",
                    textAlign: "center",
                    color: "#676767",
                    paddingTop: "30px",
                  }}
                >
                  TỔNG TIỀN HÀNG
                </h2>
                <p
                  style={{
                    color: "#4B4B4B",
                    fontSize: "30px",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  <CurrencyFormat value={data?.order_amount} />
                </p>
              </div>
            </div>
            <div
              className="body-modal"
              style={{ minHeight: "300px", paddingTop: "120px" }}
            >
              <div
                className="Giảm giá"
                style={{
                  backgroundColor: "#fff",
                  width: "90%",
                  margin: "0 auto",
                  minHeight: "60px",
                  borderRadius: "10px",
                  boxShadow: "1px 4px 10px 5px rgba(116, 116, 116, 0.25)",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px",
                }}
              >
                <h1
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#676767",
                  }}
                >
                  Giảm giá
                </h1>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#676767",
                  }}
                >
                  <CurrencyFormat value={data?.vat} />
                </p>
              </div>
              <div
                className="Giảm giá"
                style={{
                  backgroundColor: "#fff",
                  width: "90%",
                  margin: "0 auto",
                  minHeight: "60px",
                  borderRadius: "10px",
                  boxShadow: "1px 4px 10px 5px rgba(116, 116, 116, 0.25)",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px",
                  marginTop: "20px",
                }}
              >
                <h1
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#676767",
                  }}
                >
                  VAT
                </h1>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#676767",
                  }}
                >
                  <CurrencyFormat value={data?.vat} />
                </p>
              </div>

              <h1
                style={{
                  fontFamily: "Inter",
                  fontSize: "17px",
                  fontWeight: "700",
                  color: "#676767",
                  textAlign: "center",
                  padding: "15px",
                }}
              >
                TỔNG TIỀN CẦN THANH TOÁN
              </h1>
              <div
                className="Giảm giá"
                style={{
                  backgroundColor: "#fff",
                  width: "90%",
                  margin: "0 auto",
                  minHeight: "60px",
                  borderRadius: "10px",
                  boxShadow: "1px 4px 10px 5px rgba(116, 116, 116, 0.25)",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "35px",
                    fontWeight: "700",
                    margin: "0 auto",
                    padding: "0px 15px",
                    color: "#000",
                  }}
                >
                  <CurrencyFormat value={data?.order_amount} />
                </p>
                
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                  <div
                    className="Giảm giá"
                    style={{
                      backgroundColor: "#fff",
                      width: "90%",
                      margin: "0 auto",
                      minHeight: "60px",
                      borderRadius: "10px",
                      boxShadow: "1px 4px 10px 5px rgba(116, 116, 116, 0.25)",
                      justifyContent: "space-between",
                      padding: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <h1
                      style={{
                        fontFamily: "Inter",
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "#676767",
                      }}
                    >
                      KHÁCH ĐƯA
                    </h1>
                    <input onChange={onHandleChange} id="thanhToan"/>
                  </div>
                  <div
                    className="Giảm giá"
                    style={{
                      backgroundColor: "#fff",
                      width: "90%",
                      margin: "0 auto",
                      minHeight: "60px",
                      borderRadius: "10px",
                      boxShadow: "1px 4px 10px 5px rgba(116, 116, 116, 0.25)",
                      justifyContent: "space-between",
                      padding: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <h1
                      style={{
                        fontFamily: "Inter",
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "#676767",
                      }}
                    >
                      TIỀN THỐI
                    </h1>
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#676767",
                      }}
                    >
                      <CurrencyFormat value={tienThoi} />
                    </p>
                  </div>
                </div>
              <div
                className="Giảm giá"
                style={{
                  backgroundColor: "#0E8A74",
                  width: "90%",
                  margin: "0 auto",
                  borderRadius: "10px",
                  boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
                onClick={() => {
                  onHandleConfirm(data);
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#fff",
                    margin: "0 auto",
                  }}
                >
                  THANH TOÁN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalOrder;
