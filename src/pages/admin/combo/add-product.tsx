import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

import {
  useAddComboProductMutation,
  useDeleteComboProductMutation,
} from "../../../api/combo-product";
import { useGetComboByIdQuery, useGetComboQuery } from "../../../api/combo";
import { useGetProductsQuery } from "../../../api/product";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { CurrencyFormat } from "../../../components/CurrencyFormat";

import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { AppContext } from "../../../context";
const { confirm } = Modal;

const AdminAddComboProduct = () => {
  const comboProductContext = useContext(AppContext);

  const { data: comboApi, isLoading: isLoadingCombo } = useGetComboQuery();
  const [comboData, setComboData] = useState(comboApi?.data.data);

  const { data: productApi, isLoading: isLoadingProduct } =
    useGetProductsQuery();

  const [comboSelected, setComboSelected] = useState<any>(null);
  const { data: comboByIdApi, isLoading: isLoadingComboById } =
    useGetComboByIdQuery(comboSelected?.id);
  const [productInComboData, setProductInComboData] = useState<any[]>(
    comboByIdApi?.data.product_in_combo
  );

  const [productsData, setProductData] = useState(productApi);

  const [addComboProduct, { isLoading }] = useAddComboProductMutation();
  const [deleteComboProduct] = useDeleteComboProductMutation();

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";

  useEffect(() => {
    setProductData(productApi);
  }, [productApi]);

  useEffect(() => {
    setComboData(comboApi?.data.data);
  }, [comboApi?.data.data]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL_API}combo/show/${comboSelected?.id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        setProductInComboData(data.data.product_in_combo);
      });
  }, [comboSelected?.id, access_token]);

  const handlePageChange = (path: string) => {
    axios
      .get(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onHandleSelectCombo = (value: any) => {
    setComboSelected(value);
  };

  const onHandleImageError = (e: any) => {
    e.target.src = "/Images - Copy/Logo.png";
  };

  const onHandleDeleteProduct = (value: any) => {
    confirm({
      title: "Cảnh báo",
      icon: <ExclamationCircleFilled />,
      content: `${value.name} sẽ bị xoá khỏi combo, bạn có chắc muốn tiếp tục?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await deleteComboProduct({
            product_id: value.id,
            combo_id: comboSelected.id,
          })
            .unwrap()
            .then(({ meta }) => {
              toast.success(meta.message);
              const newData = productInComboData?.filter(
                (item: any) => item.id != value.id
              );
              setProductInComboData(newData);
            })
            .catch(({ data }) => {
              const { message } = data.meta;
              if (message && typeof message == "string") toast.error(message);
              if (message.combo_id)
                message.combo_id.map((err: any) => toast.error(err));
              if (message.product_id)
                message.product_id.map((err: any) => toast.error(err));
            });
        } catch {
          toast.error("Đã có lỗi xảy ra!");
        }
      },
      onCancel() {},
    });
  };

  const onSubmit = () => {
    try {
      if (comboProductContext.productComboSelected.length != 0) {
        const productSelected = comboProductContext.productComboSelected;
        productSelected.forEach((item: any) => {
          addComboProduct({
            combo_id: comboSelected.id,
            product_id: item.id,
          })
            .unwrap()
            .then(({ meta }) => {
              toast.success(meta.message);
              onCancel();
            })
            .catch(({ data }) => {
              const { message } = data.meta;
              if (message && typeof message == "string") toast.error(message);
              if (message.combo_id)
                message.combo_id.map((err: any) => toast.error(err));
              if (message.product_id)
                message.product_id.map((err: any) => toast.error(err));
            });
        });
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  const onCancel = () => {
    setComboSelected(null);
    setProductInComboData([]);
    comboProductContext.setProductComboSelected([]);
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/branch.png"
            alt="Branch Icon"
          />
          <span className="page-header-title">Thêm món vào combo</span>
        </h2>
      </div>
      <div className="row g-2">
        <div className="col-12">
          <form encType="multipart/form-data">
            <div className="card">
              <div className="card-body">
                <div className="row">

                  {/* combo list */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="input-label font-semibold text-base">
                        Danh sách combo
                      </label>
                      <div className="pos-item-wrap justify-content-center">
                        {isLoadingCombo ? (
                          <div className="w-screen md:flex lg:flex gap-x-7">
                            <Skeleton className="w-62 h-10 md:w-36 lg:w-36" />
                            <Skeleton className="w-62 h-10 md:w-36 lg:w-36" />
                          </div>
                        ) : (
                          <>
                            {comboData?.map((item: any) => {
                              return (
                                <div
                                  key={item?.id}
                                  className="pos-product-item"
                                >
                                  <div className="pos-product-item_content clickable">
                                    <button
                                      type="button"
                                      onClick={() => onHandleSelectCombo(item)}
                                      className="btn btn-outline-danger btn--danger btn-block focus:bg-[#ed4c78]"
                                    >
                                      {item.name}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* products */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label
                        className="input-label font-semibold text-base"
                        htmlFor="product_id"
                      >
                        Chọn món
                      </label>
                      <div className="grid grid-cols-2 gap-3 p-3 rounded-md border h-[350px] overflow-y-auto">
                        {isLoadingProduct ? (
                          <div className="flex gap-5 w-full">
                            <Skeleton className="w-[200px] h-[50px]" />
                            <Skeleton className="w-[200px] h-[50px]" />
                          </div>
                        ) : (
                          <>
                            {productsData?.data.data.map((product: any) => {
                              return (
                                <div
                                  key={product.id}
                                  className="flex justify-start items-center gap-2"
                                >
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger square-btn form-control flex justify-center items-center"
                                    onClick={() =>
                                      comboProductContext.onHandleSetProductComboSelected(
                                        product
                                      )
                                    }
                                  >
                                    <i className="tio-add" />
                                  </button>
                                  <div className="flex gap-2">
                                    <img
                                      src={product.image}
                                      className="avatar avatar-sm object-cover"
                                      onError={onHandleImageError}
                                      alt=""
                                    />
                                    <div className="flex flex-col justify-center gap-1">
                                      <p className="text-sm text-gray-600 font-semibold">
                                        {product.name}
                                      </p>
                                      <span className="text-xs">
                                        <CurrencyFormat value={product.price} />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                      {/* paginate product*/}
                      <div className="table-responsive mt-4 px-3">
                        <div className="d-flex justify-content-lg-end">
                          <nav>
                            <ul className="pagination">
                              {productsData?.data?.links?.map(
                                (link: any, index: number) => (
                                  <li
                                    key={index}
                                    className={`page-item 
                            ${link.active ? "active z-0" : ""}
                            ${
                              link.url == null
                                ? "disabled cursor-not-allowed"
                                : ""
                            }
                          `}
                                    aria-current={
                                      link.active ? "page" : undefined
                                    }
                                  >
                                    {link.url ? (
                                      <div
                                        className="page-link"
                                        onClick={() =>
                                          handlePageChange(link.url)
                                        }
                                      >
                                        {link.label == "&laquo; Previous" ? (
                                          <span>‹</span>
                                        ) : link.label == "Next &raquo;" ? (
                                          <span>›</span>
                                        ) : (
                                          <span>{link.label}</span>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="page-link">
                                        {link.label == "&laquo; Previous" && (
                                          <span>‹</span>
                                        )}
                                        {link.label == "Next &raquo;" && (
                                          <span>›</span>
                                        )}
                                      </span>
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* combo product add */}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label
                        className="input-label font-semibold text-base"
                        htmlFor="combo_id"
                      >
                        Combo
                      </label>
                      <input
                        id="combo_id"
                        className="form-control cursor-not-allowed text-gray-500"
                        value={comboSelected == null ? "" : comboSelected?.name}
                        disabled
                      />
                      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 gap-3">
                        {isLoadingComboById ? (
                          <div className="flex gap-2">
                            <Skeleton className="w-[85px] h-[100px]" />
                            <Skeleton className="w-[85px] h-[100px]" />
                          </div>
                        ) : (
                          <>
                            {productInComboData?.map(
                              (product: any, index: number) => (
                                <div
                                  key={index}
                                  className="relative group cursor-pointer flex-none pt-3 w-24 h-24 rounded-md"
                                >
                                  <img
                                    src={product.image}
                                    className="w-[75px] h-[70px] rounded-md object-cover"
                                    onError={onHandleImageError}
                                    alt=""
                                  />
                                  <p className="text-xs pt-1 text-gray-800">
                                    {product.name}
                                  </p>
                                  <button
                                    type="button"
                                    className="absolute opacity-0 group-hover:opacity-100 transition top-0 right-2 delete flex items-center group"
                                    onClick={() =>
                                      onHandleDeleteProduct(product)
                                    }
                                  >
                                    <i className="tio-clear-circle-outlined text-lg text-[#ff6767] transition"></i>
                                  </button>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>

                      {/* product selected */}
                      {comboProductContext.productComboSelected.length != 0 && (
                        <div>
                          <p className="mt-5 input-label font-semibold text-base">
                            Món đã chọn
                          </p>
                          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-5 gap-3">
                            {comboProductContext.productComboSelected?.map(
                              (item: any) => {
                                return (
                                  <div
                                    key={item?.id}
                                    className="relative group cursor-pointer flex-none pt-3 w-24 h-24 rounded-md"
                                  >
                                    <img
                                      src={item.image}
                                      className="w-[75px] h-[70px] rounded-md object-cover"
                                      onError={onHandleImageError}
                                      alt=""
                                    />
                                    <p className="text-xs pt-1 text-gray-800">
                                      {item.name}
                                    </p>
                                    <button
                                      type="button"
                                      className="absolute opacity-0 group-hover:opacity-100 transition top-0 right-2 delete flex items-center group"
                                      onClick={() =>
                                        comboProductContext.onHandleDeleteProductCombo(
                                          item
                                        )
                                      }
                                    >
                                      <i className="tio-clear-circle-outlined text-lg text-[#ff6767] transition"></i>
                                    </button>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="reset"
                    onClick={onCancel}
                    className="btn btn-text"
                    style={{ backgroundColor: "#e3e3e3" }}
                  >
                    Làm lại
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary flex justify-center items-center"
                    disabled={isLoading}
                    onClick={onSubmit}
                    style={{ backgroundColor: "#fc6a57" }}
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : "Thêm"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddComboProduct;
