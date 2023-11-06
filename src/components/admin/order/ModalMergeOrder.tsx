import { Modal, Skeleton } from "antd";
import { useGetOrdersOptionQuery } from "../../../api/order";
import { CurrencyFormat } from "../../CurrencyFormat";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ExclamationCircleFilled } from "@ant-design/icons";
const ModalMergeOrder = () => {
  const { confirm } = Modal;
  const { data: order, isLoading } = useGetOrdersOptionQuery(
    `?orderBy=id&order_status=0`
  );
  const divs = document.querySelectorAll("#order-box");
  divs.forEach((div) => {
    if (div instanceof HTMLDivElement) {
      div.addEventListener("click", () => {
        div.style.backgroundColor = "#93c5fd";
      });
    }
  });
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";
  const [orderIds, setOrderIds] = useState([id]);
  const onHandleMergeOrder = (idSelected: any) => {
    setOrderIds((item) => [...item, idSelected]);
  };
  const onHandleReset = ()=>{
    setOrderIds([id])
    divs.forEach((div) => {
      if (div instanceof HTMLDivElement) {
          div.style.backgroundColor = "#d1d5db";
      }
    });
  }
  const onHandleConfirm = () => {
    confirm({
      title: "Xác nhận gộp hóa đơn?",
      icon: <ExclamationCircleFilled />,
      content: `Bạn xác nhận gộp các hóa đơn đã chọn?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await axios.post(`${import.meta.env.VITE_BASE_URL_API}order/invoice/merge`,{ ids: orderIds }, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
            .then(({data}) => {
              toast.success(data.meta.message);
            })
            .catch(({response}: any) => {
              const {message} = response.data.meta
              if (message && typeof message == "string") toast.error(message);
              if (message.ids) message.ids.map((err: any) => toast.error(err));
            });
        } catch {
          toast.error("Đã có lỗi xảy ra!");
        }
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <div className="modal fade" id="mergeOrder">
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{ padding: "20px" }}>
            <div className="flex justify-around">
              <button
                id="gop"
                className="card-title mb-3 font-bold bg-red-500 px-4 py-2"
                style={{
                  borderRadius: "10px",
                  color: "#fff",
                }}
                onClick={()=>onHandleConfirm()}
              >
                GỘP HOÁ ĐƠN{" "}
              </button>
              <button className="card-title mb-3 font-bold bg-orange-500 px-4 py-2"
                style={{
                  borderRadius: "10px",
                  color: "#fff",
                }} onClick={onHandleReset}>RESET</button>
            </div>
            <div
              className="grid grid-cols-3  justify-content-center gap-2"
              id="table_list"
            >
              {isLoading ? (
                <>
                  <Skeleton style={{ width: "250px", height: "170px" }} />
                </>
              ) : (
                <>
                  {order?.data?.data?.length == 0 && (
                    <div className="dropright">Không có kết quả</div>
                  )}
                  {order?.data?.data?.map((item: any) => {
                    return (
                      <div
                        className="dropright"
                        key={item?.id}
                        onClick={() =>  onHandleMergeOrder(item.id)}
                      >
                        <div
                        id="order-box"
                          className={`card table_hover-btn py-1  ${
                            item.order_status == "0" ? "bg-gray-300" : "bg-c1"
                          } stopPropagation`}
                        >
                          <div className="card-body mx-3 position-relative text-center">
                            <h3 className="card-title mb-2 text-xl font-bold">
                              {item.table_name}
                            </h3>
                            <h5 className="card-title mb-2 font-bold">
                              {" "}
                              {item.username}
                            </h5>
                            <h6 className="card-title mb-1 font-medium">
                              {item.quantity_person} người
                            </h6>
                          </div>
                        </div>
                        <div className="table_hover-menu px-10">
                          <h3 className="mb-3 text-xl font-bold">
                            <CurrencyFormat value={item.order_amount} />
                          </h3>
                          <div className="fz-14 mb-1">
                            <h5 className="card-title mb-2 font-bold">
                              {item.phone}
                            </h5>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMergeOrder;
