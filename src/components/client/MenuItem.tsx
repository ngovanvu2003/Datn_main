/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react";
import { useState } from "react";

import { useAppDispatch } from "../../store/hook";
import { add } from "../../slices/Cart";
import { Skeleton } from "antd";

const MenuItem = (props: any) => {
  // category
  const [isFixed, setIsFixed] = useState(false);
  const menuRef = useRef(null);
  const imageRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const imageBottom: any = imageRef.current.getBoundingClientRect().bottom;
      setIsFixed(scrollY > imageBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuClassName = isFixed
    ? "fixed top-0 left-0 w-full bg-white shadow-md z-50"
    : "relative";

  // products
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<any>("listProductInCombo");
  useEffect(() => {
    setData(props.products?.data);
  }, [props.products?.data]);

  const categories = ["listProductInCombo", "listProductNotInCombo"];

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div>
      {selectedCategory && (
        <div>
          {/* ---category---*/}
          <div>
            <div ref={menuRef}>
              <img ref={imageRef} />
            </div>
            <div className={menuClassName}>
              <ul
                className="flex justify-center space-x-1 font-medium py-3 rounded-md bg-white text-[15px] lg:text-base"
                style={{
                  color: "rgb(204, 103, 11)",
                  backgroundImage: "url('/ImagesCLient/paper_bg.png')",
                }}
              >
                {categories?.map((category, index) => (
                  <button
                    className="border tẽ rounded-sm px-5 lg:px-5 shadow-md"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "2px 10px 10px 2px",
                    }}
                    onClick={() => handleCategoryChange(category)}
                    key={index}
                  >
                    {category === "listProductInCombo" ? "COMBO" : "MÓN KHÁC"}
                  </button>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: isFixed ? "10px" : "0" }}></div>
          </div>
          {/* ---end cate ---*/}

          {/*--- products ---*/}
          {isModalOpen && (
            <div className="modal-overlay" onClick={closeModal}></div>
          )}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <h2 className="text-[25px] pb-2 font-bold">
                {selectedCategory == "listProductInCombo"
                  ? "Món trong Combo"
                  : "Món ngoài Combo"}
              </h2>
              {props.isLoadingProduct ? (
                <Skeleton />
              ) : (
                <>
                  {" "}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {data?.map((item: any) =>
                      item[selectedCategory]?.map(
                        (product: any, productIndex: any) => (
                          <div key={productIndex}>
                            <div className="menu-6-item bg-white" id="product">
                              <div className="menu-6-img rel">
                                <div className="hover-overlay">
                                  <img
                                    className="img-fluid "
                                    src={product.image}
                                    style={{
                                      width: "100%",
                                      height: "180px",
                                      objectFit: "cover",
                                    }}
                                    alt="menu-image"
                                    onClick={openModal}
                                  />
                                </div>
                              </div>
                              <div className="menu-6-txt rel">
                                <div className="item-rating ">
                                  <h6
                                    style={{ color: "orange" }}
                                    className="font-medium truncate"
                                  >
                                    {product.combo_name}
                                  </h6>
                                </div>
                                <div className="like-ico ico-25">
                                  <a href="#"></a>
                                </div>
                                <h6
                                  onClick={openModal}
                                  className="font-bold pb-2 text-[18px] truncate"
                                >
                                  {product.name}
                                </h6>
                                <div className="add items-center  gap-4">
                                  <h6
                                    style={{ color: "orange" }}
                                    className="font-medium"
                                  >
                                    {product.product_price} VNĐ / {product.unit}
                                  </h6>
                                  <button
                                    onClick={() => {
                                      dispatch(
                                        add({
                                          ...product,
                                          id: product.product_id,
                                          tag: selectedCategory,
                                          quantity: 1,
                                        })
                                      );
                                    }}
                                    id="add"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            {isModalOpen && (
              <div className="detailProduct" id="productModal">
                <header>
                  <h1>Chi tiết món</h1>
                  <p onClick={closeModal}>x</p>
                </header>

                <body className="row ">
                  <div className="col-lg-6 hover-overlay">
                    <img
                      className="img-fluid "
                      src="/public\images\roll-11.jpg"
                      alt="menu-image"
                      style={{ padding: "10px" }}
                    />
                  </div>
                  <div className="col-lg-6 detail" style={{ width: "100%" }}>
                    <h1 style={{ fontSize: "25px", fontWeight: "800" }}>
                      SPICY TUNA ROLL
                    </h1>
                    <h3 style={{ fontSize: "20px" }}>150.000đ</h3>
                    <p style={{ fontSize: "12px" }}>
                      Ghi chú <span>(không bắt buộc)</span>
                    </p>
                    <textarea
                      style={{
                        borderRadius: "5px",
                        width: "100%",
                        height: "100px",
                        padding: "10px",
                      }}
                      name=""
                      id=""
                    ></textarea>
                  </div>
                </body>
                <footer>
                  <div
                    className="total"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "5px",
                    }}
                  >
                    <svg
                      style={{
                        color: "rgb(204,103,11)",
                        backgroundColor: "#f4eeee",
                        borderRadius: "2px",
                        padding: "4px",
                      }}
                      fill="currentColor"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M432 256C432 264.8 424.8 272 416 272H32c-8.844 0-16-7.15-16-15.99C16 247.2 23.16 240 32 240h384C424.8 240 432 247.2 432 256z"></path>
                    </svg>
                    <h1 style={{ margin: "0px 10px" }}>1</h1>
                    <svg
                      style={{
                        color: "rgb(204,103,11)",
                        backgroundColor: "#f4eeee",
                        borderRadius: "2px",
                        padding: "4px",
                      }}
                      fill="currentColor"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M432 256C432 264.8 424.8 272 416 272h-176V448c0 8.844-7.156 16.01-16 16.01S208 456.8 208 448V272H32c-8.844 0-16-7.15-16-15.99C16 247.2 23.16 240 32 240h176V64c0-8.844 7.156-15.99 16-15.99S240 55.16 240 64v176H416C424.8 240 432 247.2 432 256z"></path>
                    </svg>
                  </div>
                  <div
                    className="price"
                    style={{
                      margin: "5px 20px",
                      padding: "0px 20px  ",
                      backgroundColor: "#d98d00",
                      borderRadius: "5px",
                      color: "#fff",
                    }}
                  >
                    150.000đ
                  </div>
                </footer>
              </div>
            )}
          </div>
          {/*--- end products ---*/}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
