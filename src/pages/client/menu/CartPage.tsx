import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hook";
import { decrease, increase, clearCart } from "../../../slices/Cart";
import { useParams } from "react-router-dom";
import { useGetOrderByIdMutation } from "../../../api/tables";
import { useAddOrderDetailMutation } from "../../../api/order-detail";
import toast from "react-hot-toast";
import LoadingPage from "../Loading/LoadingPage";
import { goBackInHistory } from "../../../slices/HistoryUrl";
import { FaHistory } from "react-icons/fa";

const CartPage = () => {
  const { id } = useParams();
  const [getOrderById] = useGetOrderByIdMutation();
  const [addOrderDetail] = useAddOrderDetailMutation();
  const [dataFood, setDatdaFood] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBt, setIsLoadingBt] = useState(true);
  const [block, setBlock] = useState(false);
  const dispatch = useAppDispatch();
  const { items: carts } = useAppSelector((state: any) => state.carts);
  const total = carts.reduce((sum: any, item: any) => {
    return sum + item.product_price * item.quantity;
  }, 0);
  const handleGoBack = () => {
    goBackInHistory();
  };

  useEffect(() => {
    (async () => {
      getOrderById(id)
        .unwrap()
        .then(({ data }: any) => {
          if (data == null) setBlock(true);
          const detailOrder = carts.map((item: any) => ({
            order_id: data.id,
            id: item.product_id,
            quantity: item.quantity,
            tag: "product",
          }));
          setDatdaFood(detailOrder);
          setIsLoadingBt(false);
        });
    })();
  }, [carts, getOrderById, id]);

  const addOrderFood = () => {
    try {
      if (carts.length) {
        setIsLoading(true);
        addOrderDetail(dataFood)
          .unwrap()
          .then(({ meta }) => {
            dispatch(clearCart());
            if (meta) setIsModalOpen(true);
            setIsLoading(false);
            document.body.classList.add("no-scroll");
          })
          .catch(({ data }) => {
            const { message } = data.meta;
            if (message) toast.error(message);
            if (message.name) message.name.map((err: any) => toast.error(err));
            if (message.quantity_chair)
              message.quantity_chair.map((err: any) => toast.error(err));
          });
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("no-scroll");
  };
  const clearAll = () => {
    (() => {
      dispatch(clearCart());
    })();
  };

  return (
    <div>
      <h3>
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}></div>
        )}
        {isLoading ? (
          <>
            <LoadingPage />
          </>
        ) : (
          <article>
            {/* // */}
            <section
              style={{
                backgroundColor: "white",
                width: "100%",
                position: "fixed",
                top: "0",
              }}
            >
              <div style={{ maxWidth: "742px", margin: "auto" }}>
                <div
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    gap: "12px",
                    padding: "14px",
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
                    Các món đã chọn
                  </h4>
                </div>
              </div>
            </section>
            {/* // */}

            <section style={{ marginTop: "82px" }}>
              <div
                style={{
                  maxWidth: "742px",
                  margin: "auto",
                  backgroundColor: "white",
                  marginBottom: "16px",
                  marginTop: "16px",
                  borderRadius: "0.5rem",
                }}
              >
                <div style={{ padding: "16px" }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "normal",
                      }}
                    >
                      Gọi món tại bàn
                    </h4>
                    <Link to={`/history-order/${id}`}>
                      <button
                        style={{
                          borderColor: "rgb(255 237 213)",
                          borderRadius: "0.375rem",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                          paddingRight: "12px",
                          paddingLeft: "12px",
                          backgroundColor: "rgb(255 237 213)",
                          borderWidth: "0px",
                          color: "rgb(204, 103, 11)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <div>Lịch sử</div>{" "}
                        <FaHistory style={{ color: "rgb(204, 103, 11)" }} />
                      </button>
                    </Link>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      style={{
                        backgroundColor: "rgb(242, 243, 245)",
                        borderWidth: "0px",
                        borderRadius: "0.375rem",
                        width: "32px",
                        height: "32px",
                        padding: "4px",
                      }}
                      fill="#CC670B"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M104 104C112.8 104 120 111.2 120 120V136C120 144.8 112.8 152 104 152H88C79.16 152 72 144.8 72 136V120C72 111.2 79.16 104 88 104H104zM144 32C170.5 32 192 53.49 192 80V176C192 202.5 170.5 224 144 224H48C21.49 224 0 202.5 0 176V80C0 53.49 21.49 32 48 32H144zM144 64H48C39.16 64 32 71.16 32 80V176C32 184.8 39.16 192 48 192H144C152.8 192 160 184.8 160 176V80C160 71.16 152.8 64 144 64zM72 376C72 367.2 79.16 360 88 360H104C112.8 360 120 367.2 120 376V392C120 400.8 112.8 408 104 408H88C79.16 408 72 400.8 72 392V376zM144 288C170.5 288 192 309.5 192 336V432C192 458.5 170.5 480 144 480H48C21.49 480 0 458.5 0 432V336C0 309.5 21.49 288 48 288H144zM144 320H48C39.16 320 32 327.2 32 336V432C32 440.8 39.16 448 48 448H144C152.8 448 160 440.8 160 432V336C160 327.2 152.8 320 144 320zM360 104C368.8 104 376 111.2 376 120V136C376 144.8 368.8 152 360 152H344C335.2 152 328 144.8 328 136V120C328 111.2 335.2 104 344 104H360zM256 80C256 53.49 277.5 32 304 32H400C426.5 32 448 53.49 448 80V176C448 202.5 426.5 224 400 224H304C277.5 224 256 202.5 256 176V80zM288 80V176C288 184.8 295.2 192 304 192H400C408.8 192 416 184.8 416 176V80C416 71.16 408.8 64 400 64H304C295.2 64 288 71.16 288 80zM256 304C256 295.2 263.2 288 272 288H336C344.8 288 352 295.2 352 304V372H416V304C416 295.2 423.2 288 432 288C440.8 288 448 295.2 448 304V388C448 396.8 440.8 404 432 404H336C327.2 404 320 396.8 320 388V320H288V472C288 480.8 280.8 488 272 488C263.2 488 256 480.8 256 472V304zM320 448C320 439.2 327.2 432 336 432H352C360.8 432 368 439.2 368 448V464C368 472.8 360.8 480 352 480H336C327.2 480 320 472.8 320 464V448zM432 432C440.8 432 448 439.2 448 448V464C448 472.8 440.8 480 432 480H416C407.2 480 400 472.8 400 464V448C400 439.2 407.2 432 416 432H432z"></path>
                    </svg>
                    <h2 style={{ fontSize: "16px" }}>
                      Fun & Effective{" "}
                      <span
                        style={{
                          color: "rgb(204, 103, 11)",
                          fontWeight: "bold",
                        }}
                      >
                        Bàn 10{" "}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </section>

            <section style={{ marginTop: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  maxWidth: "742px",
                  margin: "auto",
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                }}
              >
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4 style={{ fontSize: "16px", fontWeight: "normal" }}>
                      Món đã chọn ({carts.length})
                    </h4>
                    <div style={{ fontWeight: "normal" }}>
                      <button
                        style={{
                          borderColor: "rgb(255 237 213)",
                          borderRadius: "0.375rem",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                          paddingRight: "12px",
                          paddingLeft: "12px",
                          backgroundColor: "rgb(255 237 213)",
                          borderWidth: "0px",
                          color: "rgb(204, 103, 11)",
                        }}
                        onClick={handleGoBack}
                      >
                        <h3>Thêm món</h3>
                      </button>
                    </div>
                  </div>
                  {carts.map((item: any, index: number) => {
                    return (
                      <div key={index}>
                        <div
                          style={{
                            display: "flex",
                            gap: "16px",
                            paddingTop: "16px",
                          }}
                        >
                          <img
                            style={{
                              width: "48px",
                              height: "48px",
                              objectFit: "cover",
                              borderRadius: "0.374rem",
                              cursor: "pointer",
                            }}
                            src={item?.image}
                            alt="ảnh đồ ăn"
                          />

                          <div style={{ width: "100%" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "normal",
                              }}
                            >
                              <span>{item.name}</span>
                              <span>
                                {item?.product_price * item?.quantity}Đ
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Link
                                to={""}
                                style={{
                                  color: "rgb(204, 103, 11)",
                                  fontSize: "13px",
                                  paddingTop: "12px",
                                  paddingBottom: "12px",
                                  fontWeight: "normal",
                                }}
                              >
                                Chỉnh sửa
                              </Link>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "16px",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    dispatch(decrease(item.id));
                                  }}
                                  style={{
                                    backgroundColor: "rgb(255 237 213)",
                                    padding: "1px",
                                    borderRadius: "0.374rem",
                                    borderColor: "rgb(255 237 213)",
                                    borderWidth: "0px",
                                  }}
                                >
                                  <svg
                                    style={{ color: "rgb(204,103,11)" }}
                                    fill="currentColor"
                                    width="20"
                                    height="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M432 256C432 264.8 424.8 272 416 272H32c-8.844 0-16-7.15-16-15.99C16 247.2 23.16 240 32 240h384C424.8 240 432 247.2 432 256z"></path>
                                  </svg>
                                </button>
                                <span style={{ fontWeight: "normal" }}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => {
                                    dispatch(increase(item.id));
                                  }}
                                  style={{
                                    backgroundColor: "rgb(255 237 213)",
                                    padding: "1px",
                                    borderRadius: "0.374rem",
                                    borderColor: "rgb(255 237 213)",
                                    borderWidth: "0px",
                                  }}
                                >
                                  <svg
                                    style={{ color: "rgb(204,103,11)" }}
                                    fill="currentColor"
                                    width="20"
                                    height="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M432 256C432 264.8 424.8 272 416 272h-176V448c0 8.844-7.156 16.01-16 16.01S208 456.8 208 448V272H32c-8.844 0-16-7.15-16-15.99C16 247.2 23.16 240 32 240h176V64c0-8.844 7.156-15.99 16-15.99S240 55.16 240 64v176H416C424.8 240 432 247.2 432 256z"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                  <div className="flex mt-3 justify-end items-end ">
                    {carts.length == 0 ? (
                      <h1 className="mt-2">Không có sản phẩm !</h1>
                    ) : (
                      <button
                        style={{
                          borderColor: "rgb(255 237 213)",
                          borderRadius: "0.375rem",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                          paddingRight: "12px",
                          paddingLeft: "12px",
                          backgroundColor: "rgb(255 237 213)",
                          borderWidth: "0px",
                          color: "rgb(204, 103, 11)",
                        }}
                        onClick={clearAll}
                      >
                        Xóa tất cả{" "}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section style={{ marginTop: "20px" }}>
              <div
                style={{
                  maxWidth: "742px",
                  margin: "auto",
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    paddingTop: "24px",
                    paddingBottom: "24px",
                  }}
                >
                  <p style={{ fontWeight: "bolder", marginBottom: "10px" }}>
                    THÔNG TIN THANH TOÁN
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <span>Tổng tiền hàng</span>
                    <span>{total}đ</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "18px",
                      fontWeight: "normal",
                    }}
                  >
                    <span>Tổng cộng</span>
                    <span style={{ color: "rgb(204, 103, 11)" }}>{total}đ</span>
                  </div>
                </div>
              </div>
            </section>

            <section
              style={{
                backgroundColor: "white",
                width: "100%",
                position: "fixed",
                bottom: "0",
              }}
            >
              <div style={{ maxWidth: "742px", margin: "auto" }}>
                {!block ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px",
                      gap: "16px",
                    }}
                  >
                    <button
                      id="product"
                      onClick={addOrderFood}
                      style={{
                        fontWeight: "normal",
                        fontSize: "18px",
                        color: "white",
                        backgroundColor: "rgb(204, 103, 11)",
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        borderRadius: "0.374rem",
                        width: "100%",
                        justifyContent: "center",
                        gap: "8px",
                        display: "inline-flex", // Chỉ đặt display một lần
                        lineHeight: "20px",
                      }}
                      disabled={isLoadingBt}
                      className={`${isLoadingBt ? "cursor-not-allowed" : ""}`}
                    >
                      {isLoadingBt ? "loading . . ." : "Gửi yêu cầu gọi món"}
                      {!isLoadingBt ? (
                        <svg
                          className=""
                          fill="currentColor"
                          width="20"
                          height="20"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M443.7 266.8l-165.9 176C274.5 446.3 269.1 448 265.5 448c-3.986 0-7.988-1.375-11.16-4.156c-6.773-5.938-7.275-16.06-1.118-22.59L393.9 272H16.59c-9.171 0-16.59-7.155-16.59-15.1S7.421 240 16.59 240h377.3l-140.7-149.3c-6.157-6.531-5.655-16.66 1.118-22.59c6.789-5.906 17.27-5.469 23.45 1.094l165.9 176C449.4 251.3 449.4 260.7 443.7 266.8z"></path>
                        </svg>
                      ) : (
                        <></>
                      )}
                    </button>
                  </div>
                ) : (
                  <h1 className="text-center pb-2 text-xl">
                    Không có quyền gọi món{" "}
                  </h1>
                )}
              </div>
            </section>
          </article>
        )}
        {isModalOpen && (
          <div
            className="detailProduct"
            id="productModal"
            style={{ height: "250px", textAlign: "center" }}
          >
            <div
              style={{
                backgroundColor: "#F4E2D8",
                padding: "30px 0px",
                fontWeight: "500",
                fontSize: "20px",
                color: "#F98A07",
                borderRadius: "5px",
              }}
            >
              <img
                style={{ margin: "0 48%" }}
                src="..\public\Images - Copy\checked.png"
                alt=""
              />
              Yêu cầu gọi món đang chờ xác nhận
            </div>
            <div>
              <p style={{ fontFamily: "tahoma", padding: "10px" }}>
                {" "}
                Các món bạn gọi đã gửi tới nhân viên <br />
                vui lòng chờ chút để nhân viên xác nhận
              </p>

              <button
                style={{
                  backgroundColor: "#007AEB",
                  color: "#fff",
                  padding: "5px 15px",
                  borderRadius: "5px",
                }}
                onClick={handleGoBack}
              >
                Tiếp tục gọi món
              </button>
            </div>
          </div>
        )}
      </h3>
    </div>
  );
};

export default CartPage;
