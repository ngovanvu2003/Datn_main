import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { CurrencyFormat } from "../../CurrencyFormat";

import { IProduct } from "../../../interface/product";

import { add } from "../../../slices/CartPos";
import { useAppDispatch } from "../../../store/hook";

import { useSearchProductByNameQuery } from "../../../api/product";
import { useGetComboByIdQuery, useGetComboQuery } from "../../../api/combo";
import { onHandleImageError } from "../../../helpers/ImageError";

const ProductionSection = () => {
  const [inputSearchProduct, setInputSearchProduct] = useState("");
  const [comboId, setComboId] = useState<string | number>("");
  const [productsData, setProductsData] = useState<IProduct[]>([]);

  const { data: productSearch, isLoading: isLoadingProductsSearch } =
    useSearchProductByNameQuery(inputSearchProduct);

  const { data: combo, isLoading: isLoadingCombo } = useGetComboQuery();
  const { data: comboById } = useGetComboByIdQuery(comboId);
  
  const [productInCombo, setProductInCombo] = useState(
    comboById?.data?.product_in_combo
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setProductInCombo(comboById?.data?.product_in_combo);
  }, [comboById?.data?.product_in_combo]);

  useEffect(() => {
    setProductsData(productSearch?.data.data);
  }, [productSearch]);

  const onHandleSelectedCombo = (combo: any) => {
    setComboId(combo.id);
  };

  const onHandleSearchProduct = (e: any) => {
    setInputSearchProduct(e.target.value);
    setProductsData(productSearch?.data.data);
  };

  return (
    <div className="col-lg-7">
      <div className="card">
        <div className="pos-title">
          <h4 className="mb-0 text-[16px] font-bold">Mục sản phẩm</h4>
        </div>

        <div className="d-flex flex-wrap flex-md-nowrap justify-content-between gap-3 gap-xl-4 px-4 py-4">
          <div className=" w-100 ml-xl-2">
            <div id="search-form">
              <div className="input-group input-group-merge input-group-flush border rounded">
                <div className="input-group-prepend pl-2">
                  <div className="input-group-text">
                    <img
                      width="13"
                      src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/search.png"
                      alt=""
                    />
                  </div>
                </div>
                <input
                  id="datatableSearch"
                  name="search"
                  className="form-control border-0"
                  placeholder="Nhập tên sản phẩm"
                  aria-label="Search here"
                  onChange={onHandleSearchProduct}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body pt-0" id="items">
          <h5 className="font-weight-semibold fz-16 text-dark pb-2">Combo</h5>
          <div className="pos-item-wrap justify-content-center">
            {isLoadingCombo ? (
              <div className="w-screen md:flex lg:flex gap-x-7">
                <Skeleton className="w-62 h-10 md:w-36 lg:w-36" />
                <Skeleton className="w-62 h-10 md:w-36 lg:w-36" />
              </div>
            ) : (
              <>
                {combo?.data.data?.length == 0 && (
                  <div className="dropright pl-2">Không có kết quả</div>
                )}
                {combo?.data.data?.map((combo: any) => {
                  return (
                    <div
                      key={combo?.id}
                      className="pos-product-item"
                      onClick={() => onHandleSelectedCombo(combo)}
                    >
                      <div>
                        {/*--  Button modal --  */}
                        {/* modal title */}
                        <div
                          className="modal fade show"
                          id={`add-combo-${combo.id}`}
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              {/* modal body */}
                              <div className="modal-body">
                                <div className="d-flex flex-wrap gap-3">
                                  {/* combo details */}
                                  <div className="details">
                                    <div className="break-all">
                                      <p className="d-block h3 mb-2 product-title docs-creator text-2xl">
                                        {combo.name}
                                      </p>
                                    </div>

                                    <div className="mb-2 text-dark d-flex align-items-baseline gap-2">
                                      <h3 className="font-weight-normal text-accent mb-0 text-base">
                                        <CurrencyFormat value={combo!.price} />
                                      </h3>
                                    </div>
                                  </div>
                                </div>

                                {/* product by combo */}
                                <div className="flex justify-start items-center gap-2 max-w-full min-h-[150px] overflow-x-auto">
                                  {productInCombo?.length == 0 && (
                                    <p className="text-sm font-medium text-black">
                                      Không có món ăn nào hiện có trong combo
                                    </p>
                                  )}
                                  {productInCombo?.map(
                                    (product: any, index: number) => (
                                      <div
                                        key={index}
                                        className="flex-none w-24 h-24 rounded-md"
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
                                      </div>
                                    )
                                  )}
                                </div>

                                <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
                                  <button
                                    className="btn btn-primary flex justify-center items-center gap-x-2 px-md-5 bg-[#fc6a57]"
                                    type="button"
                                    onClick={() => {
                                      dispatch(add(combo));
                                      toast.success(
                                        "Thêm vào giỏ hàng thành công"
                                      );
                                    }}
                                  >
                                    <i className="tio-shopping-cart"></i>
                                    Thêm
                                  </button>
                                </div>
                              </div>
                              {/* end modal body */}
                            </div>
                          </div>
                        </div>
                        {/* end modal title  */}
                      </div>
                      <div className="pos-product-item_content clickable">
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target={`#add-combo-${combo.id}`}
                          className="btn btn-outline-danger btn--danger btn-block focus:bg-[#ed4c78]"
                        >
                          {combo.name}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Product */}
          <h5 className="font-weight-semibold fz-16 text-dark mt-2 py-2">
            Món ăn
          </h5>
          <div className="pos-item-wrap justify-content-center">
            {isLoadingProductsSearch ? (
              <div className="w-screen md:flex lg:flex gap-x-4">
                <Skeleton className="w-72 h-48 md:w-40 lg:w-36" />
                <Skeleton className="w-72 h-48 md:w-40 lg:w-36" />
                <Skeleton className="w-72 h-48 md:w-40 lg:w-36" />
              </div>
            ) : (
              <>
                {productsData?.length == 0 && (
                  <div className="dropright pl-2">Không có kết quả</div>
                )}
                {productsData?.map((product: any) => {
                  return (
                    <div key={product?.id} className="pos-product-item card ">
                      <div className="pos-product-item_thumb">
                        <img
                          src={product.image}
                          className="img-fit"
                          alt=""
                          onError={onHandleImageError}
                          data-toggle="modal"
                          data-target={`#add-product-${product.id}`}
                        />

                        {/*--  Button modal --  */}
                        {/* modale title */}
                        <div
                          className="modal fade show"
                          id={`add-product-${product.id}`}
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              {/* modal body */}
                              <div className="modal-body">
                                <div className="d-flex flex-wrap gap-3">
                                  {/* Product gallery */}
                                  <div className="d-flex align-items-center justify-content-center rounded-md w-[250px] h-[250px] overflow-hidden">
                                    <img
                                      className="img-responsive rounded object-cover"
                                      width="250"
                                      src={product.image}
                                      data-zoom={product.image}
                                      alt="Product image"
                                      onError={onHandleImageError}
                                    />
                                  </div>

                                  {/* Product details */}
                                  <div className="details">
                                    <div className="break-all">
                                      <p className="d-block h3 mb-2 product-title docs-creator text-2xl">
                                        {product.name}
                                      </p>
                                    </div>

                                    <div className="mb-2 text-dark d-flex align-items-baseline gap-2">
                                      <h3 className="font-weight-normal text-accent mb-0 text-base">
                                        <CurrencyFormat
                                          value={product!.price}
                                        />
                                      </h3>
                                    </div>
                                  </div>
                                </div>

                                <div className="row pt-2">
                                  <div className="col-12">
                                    <h3 className="mt-3">Mô tả</h3>
                                    <div className="d-block text-break text-dark __descripiton-txt __not-first-hidden">
                                      <div>
                                        <p className="text-sm font-light py-1">
                                          {product.description}
                                        </p>
                                      </div>
                                      <div className="show-more text-info text-center">
                                        <span className="">Xem thêm</span>
                                      </div>
                                    </div>

                                    <div id="add-to-cart-form" className="mb-2">
                                      <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
                                        <button
                                          className="btn btn-primary flex justify-center items-center gap-x-2 px-md-5 bg-[#fc6a57]"
                                          type="button"
                                          onClick={() => {
                                            dispatch(
                                              add({
                                                ...product,
                                                quantity: 1,
                                              })
                                            );
                                            toast.success(
                                              "Thêm vào giỏ hàng thành công"
                                            );
                                          }}
                                        >
                                          <i className="tio-shopping-cart"></i>
                                          Thêm
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* end modal body */}
                            </div>
                          </div>
                        </div>
                        {/* end modal title  */}
                      </div>
                      <div className="pos-product-item_content clickable">
                        <div className="pos-product-item_title">
                          {product.name}
                        </div>
                        <div className="pos-product-item_price">
                          <CurrencyFormat value={product!.price} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        <div className="p-3 d-flex justify-content-end"></div>
      </div>
    </div>
  );
};

export default ProductionSection;
