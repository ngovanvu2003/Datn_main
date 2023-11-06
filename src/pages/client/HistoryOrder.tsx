import { FaAngleDown, FaCheckCircle, FaTimes, FaUser } from "react-icons/fa";
import { useGetOrderDetailsHistroryQuery } from "../../api/order-detail";
import moment from "moment";
import numeral from "numeral";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { goBackInHistory } from "../../slices/HistoryUrl";

const HistoryOrder = () => {
  const { id }: any = useParams();
  const { data: orderDetails } = useGetOrderDetailsHistroryQuery(id);
  const [showMore, setShowMore] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(10);

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 10);
    setShowMore(true);
  };
  
  const maxItemsToShow = 10;
  

  const handleGoBack = () => {
    goBackInHistory();
  };
  const groupedOrderDetails: any[] = [];

  if (orderDetails && orderDetails.data && orderDetails.data.data) {
    const filteredData = orderDetails.data.data.filter((orderItem: any) => {
      return orderItem.table_id == id;
    });
    groupedOrderDetails.push(...filteredData);
  }
 console.log(groupedOrderDetails);
 
  const tableInfo = {
    table_name: groupedOrderDetails[0]?.table_name, 
    quantity_person: groupedOrderDetails[0]?.quantity_person
  };
  console.log(groupedOrderDetails);
  
  return (
    <div>
      <section
        style={{
          backgroundColor: "white",
          width: "100%",
          position: "fixed",
          top: "0"
        }}
      >
        <div style={{ maxWidth: "742px", margin: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              gap: "12px",
              padding: "14px"
            }}
          >
            <button className="">
              <svg
                fill="currentColor"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                onClick={handleGoBack}
              >
                <path d="M448 256C448 264.8 440.6 272 431.4 272H54.11l140.7 149.3c6.157 6.531 5.655 16.66-1.118 22.59C190.5 446.6 186.5 448 182.5 448c-4.505 0-9.009-1.75-12.28-5.25l-165.9-176c-5.752-6.094-5.752-15.41 0-21.5l165.9-176c6.19-6.562 16.69-7 23.45-1.094c6.773 5.938 7.275 16.06 1.118 22.59L54.11 240h377.3C440.6 240 448 247.2 448 256z"></path>
              </svg>
            </button>

            <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>
              Lịch sử gọi món
            </h4>
          </div>
        </div>
      </section>
      <section style={{ marginTop: "82px" }}>
        <div
          style={{
            maxWidth: "742px",
            margin: "auto",
            backgroundColor: "white",
            marginBottom: "16px",
            marginTop: "16px",
            borderRadius: "0.5rem"
          }}
        >
          <div style={{ padding: "16px" }}>
            <div className="flex items-center justify-between mb-4">
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "normal"
                }}
              >
                Gọi món tại
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "center"
              }}
            >
              <svg
                style={{
                  backgroundColor: "rgb(242, 243, 245)",
                  borderWidth: "0px",
                  borderRadius: "0.375rem",
                  width: "32px",
                  height: "32px",
                  padding: "4px"
                }}
                fill="#CC670B"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="flex"
              >
                <path d="M104 104C112.8 104 120 111.2 120 120V136C120 144.8 112.8 152 104 152H88C79.16 152 72 144.8 72 136V120C72 111.2 79.16 104 88 104H104zM144 32C170.5 32 192 53.49 192 80V176C192 202.5 170.5 224 144 224H48C21.49 224 0 202.5 0 176V80C0 53.49 21.49 32 48 32H144zM144 64H48C39.16 64 32 71.16 32 80V176C32 184.8 39.16 192 48 192H144C152.8 192 160 184.8 160 176V80C160 71.16 152.8 64 144 64zM72 376C72 367.2 79.16 360 88 360H104C112.8 360 120 367.2 120 376V392C120 400.8 112.8 408 104 408H88C79.16 408 72 400.8 72 392V376zM144 288C170.5 288 192 309.5 192 336V432C192 458.5 170.5 480 144 480H48C21.49 480 0 458.5 0 432V336C0 309.5 21.49 288 48 288H144zM144 320H48C39.16 320 32 327.2 32 336V432C32 440.8 39.16 448 48 448H144C152.8 448 160 440.8 160 432V336C160 327.2 152.8 320 144 320zM360 104C368.8 104 376 111.2 376 120V136C376 144.8 368.8 152 360 152H344C335.2 152 328 144.8 328 136V120C328 111.2 335.2 104 344 104H360zM256 80C256 53.49 277.5 32 304 32H400C426.5 32 448 53.49 448 80V176C448 202.5 426.5 224 400 224H304C277.5 224 256 202.5 256 176V80zM288 80V176C288 184.8 295.2 192 304 192H400C408.8 192 416 184.8 416 176V80C416 71.16 408.8 64 400 64H304C295.2 64 288 71.16 288 80zM256 304C256 295.2 263.2 288 272 288H336C344.8 288 352 295.2 352 304V372H416V304C416 295.2 423.2 288 432 288C440.8 288 448 295.2 448 304V388C448 396.8 440.8 404 432 404H336C327.2 404 320 396.8 320 388V320H288V472C288 480.8 280.8 488 272 488C263.2 488 256 480.8 256 472V304zM320 448C320 439.2 327.2 432 336 432H352C360.8 432 368 439.2 368 448V464C368 472.8 360.8 480 352 480H336C327.2 480 320 472.8 320 464V448zM432 432C440.8 432 448 439.2 448 448V464C448 472.8 440.8 480 432 480H416C407.2 480 400 472.8 400 464V448C400 439.2 407.2 432 416 432H432z"></path>
              </svg>
              <h2 style={{ fontSize: "16px" }} className="flex gap-2">
                Fun & Effective{" "}
                <span
                  style={{ color: "rgb(204, 103, 11)", fontWeight: "bold" }}
                  className="flex items-center gap-2"
                >
                  {tableInfo.table_name} - {tableInfo.quantity_person}
                  <FaUser
                    style={{ color: "rgb(204, 103, 11)" }}
                    size={15}
                    className="text-gray-500"
                  />
                </span>
              </h2>
            </div>
          </div>
        </div>
      </section>
      {groupedOrderDetails?.slice(0, itemsToShow).map((orderItem: any, index: any) => (
            <article key={index}>
              
                
                <section>
                  <div
                    style={{
                      maxWidth: "742px",
                      margin: "auto"
                    }}
                    className="mb-6"
                  >
                    <div className="px-4">
                      <div className="flex justify-between items-center">
                        <h5
                          style={{
                            color: "rgb(204, 103, 11)",
                            fontWeight: "bold"
                          }}
                        >
                          {orderItem.product_name}
                        </h5>
                        <div className="flex gap-2">
                          {orderItem.orderable_status == 0 && (
                            <div className="flex gap-2">
                              <h2 style={{ color: "rgb(204, 103, 11)" }}>
                                Chờ xác nhận
                              </h2>
                              <img
                                width={20}
                                src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/pending.png"
                                alt="dashboard"
                                className="order-card-icon"
                              />
                            </div>
                            
                          )}
                          {orderItem?.orderable_status == 2 && (
                        <div className="flex gap-2">
                          <h2 style={{ color: 'rgb(204, 103, 11)' }}>
                            Đã hoàn thành
                          </h2>
                          <FaCheckCircle
                            size={20}
                            className="text-green-400"
                          />
                        </div>
                      )}
                       
                      {orderItem.orderable_status == -2 && (
                        <div className="flex gap-2">
                          <h2 style={{ color: 'rgb(204, 103, 11)' }}>
                            Đã hủy
                          </h2>
                          <FaTimes className="text-red-400" size={20} />
                        </div>
                      )}
                      {orderItem.orderable_status == 1 && (
                        <div className="flex gap-2">
                          <h2 style={{ color: 'rgb(204, 103, 11)' }}>
                            Đã xác nhận
                          </h2>
                          <img
                            width={20}
                            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/confirmed.png"
                            alt="dashboard"
                            className="order-card-icon"
                          />
                        </div>
                      )}
                      {orderItem.orderable_status == -1 && (
                        <div className="flex gap-2">
                          <h2 style={{ color: 'rgb(204, 103, 11)' }}>
                            Đã trả đồ
                          </h2>
                          <img
                            width={20}
                            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/returned.png"
                            alt="dashboard"
                            className="order-card-icon"
                          />
                        </div>
                      )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <img
                          src={orderItem.image}
                          className="object-cover cursor-pointer rounded-lg my-3 w-[80px] h-[80px]"
                          alt=""
                        />
                        <div className="space-y-1">
                          <h3 className="flex justify-end">
                            x {orderItem.quantity}
                          </h3>
                          <h3 className="text-gray-400 text-[12px]">
                            {moment(orderItem.created_at).format(
                              "DD/MM/YYYY - HH:mm"
                            )}
                          </h3>
                          <h3 className="flex justify-end">
                            {numeral(orderItem.total_price).format("0,0")} vnđ
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
             
            </article>

      ))}
      {!showMore &&
        Object.keys(groupedOrderDetails).length > maxItemsToShow && (
          <button
            className="flex items-center mb-4 m-auto hover:cursor-pointer pb-5"
            onClick={handleShowMore}
          >
            Xem thêm <FaAngleDown />
          </button>
        )}
    </div>
  );
};

export default HistoryOrder;
