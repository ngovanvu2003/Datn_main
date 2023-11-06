/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  usePaginateTableMutation,
  useUpdateProductMutation,
} from "../../../api/product";
import { IProduct } from "../../../interface/product";
import {
  Table,
  Image,
  Switch,
  Button,
  Popconfirm,
  message,
  Modal,
  Skeleton,
  Slider,
  InputNumber,
  Tooltip,
  Tag,
} from "antd";
import { useGetCategoriesQuery } from "../../../api/categories";
// import { ICategory } from "../../../interface/categories";
import { FilterOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import moment from "moment";

const AdminProducts = () => {
  const { data }: any = useGetProductsQuery<IProduct[]>();
  const [removeProduct] = useDeleteProductMutation();
  const [updateProductStatus] = useUpdateProductMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState<any>({});
  const getCategory = useGetCategoriesQuery<any>();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [loadingData, setLoadingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice, setMinPrice] = useState<any>(null);
  const [maxPrice, setMaxPrice] = useState<any>(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [productsData, setProductsData] = useState<any>(data);
  const [paginateTable] = usePaginateTableMutation();
  useEffect(() => {
    setProductsData(data);
  }, [data]);

  const handleMinPriceChange = (value: number | null) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value: number | null) => {
    setMaxPrice(value);
  };

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };
  const handlePageChange = (path: string) => {
    const page = path.slice(-1);
    paginateTable(page)
      .unwrap()
      .then((data) => {
        setProductsData(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (getCategory.data?.data) {
      const categoryMapping: any = {};
      getCategory.data.data.forEach(
        (category: { id: string | number; name: any }) => {
          categoryMapping[category.id] = category.name;
        }
      );
      setCategories(categoryMapping);
    }
  }, [getCategory.data]);

  useEffect(() => {
    // setLoadingData(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // setLoadingData(false);
    }, 500);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  function formatPrice(price: any) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const filteredData = productsData?.data.data
    .filter((product: any) => {
      return (
        product.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        (minPrice === null || product.price >= minPrice) &&
        (maxPrice === null || product.price <= maxPrice)
      );
    })
    .map((product: any) => ({
      key: product.id,
      ...product,
      created_at: moment(product.created_at).format("DD/MM/YYYY "),
      updated_at: moment(product.updated_at).format("DD/MM/YYYY "),
      categories: categories[product.category_id] || "Unknown",
      price: formatPrice(product.price), // Chuyển đổi giá thành định dạng có dấu chấm
    }));

  const handleStatusChange = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleConfirmStatusChange = () => {
    setLoading(true);

    if (selectedProduct) {
      updateProductStatus({
        ...selectedProduct,
        product_status: selectedProduct.product_status === "0" ? "1" : "0",
      })
        .unwrap()
        .then(() => {
          setLoading(false);
          message.success("Cập nhật trạng thái thành công");

          // Cập nhật trạng thái trong danh sách sản phẩm
          const updatedData = productsData?.data.data.map(
            (product: IProduct) => {
              if (product.id === selectedProduct.id) {
                return {
                  ...product,
                  product_status:
                    selectedProduct.product_status === "0" ? "1" : "0",
                };
              }
              return product;
            }
          );
          console.log(productsData.data);

          setProductsData({
            ...productsData,
            data: {
              ...productsData?.data,
              data: updatedData,
            },
          });

          setIsModalVisible(false);
        })
        .catch(() => {
          setLoading(false);
          message.error("Đã xảy ra lỗi khi cập nhật sản phẩm");
          setIsModalVisible(false);
        });
    }
  };

  const handleCancelStatusChange = () => {
    setSelectedProduct(null);
    setIsModalVisible(false);
  };
  const handleStatusFilter = (value: any, record: any) => {
    return record.product_status === value;
  };
  const handleResetFilter = () => {
    // Đặt lại giá trị của minPrice và maxPrice về null hoặc giá trị mặc định của bạn
    setMinPrice(null);
    setMaxPrice(null);
  };
  const columns: any = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <span className="flex  items-end">
          <div className=""> Giá</div>

          <Tooltip title="Lọc theo giá">
            <Button
              icon={
                <FilterOutlined
                  style={{
                    fontSize: "11px",
                    color: "gray",
                    textAlign: "left",
                    paddingTop: "17px",
                  }}
                />
              }
              onClick={showFilterModal}
              className="ml-5 border-hidden"
            />
          </Tooltip>
        </span>
      ),

      dataIndex: "price",
      key: "price",
      render: (price: number) => <span>{`${price.toLocaleString()}`}</span>,
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image: string) => (
        <Image
          className="rounded-md"
          src={image}
          width={50}
          height={50}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a: any, b: any) => {
        if (a.created_at && b.created_at) {
          return (
            moment(b.created_at, "DD/MM/YYYY HH:mm").unix() -
            moment(a.created_at, "DD/MM/YYYY HH:mm").unix()
          );
        } else {
          return 0;
        }
      },
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Trạng thái",
      dataIndex: "product_status",
      filters: [
        { text: "Khả dụng", value: "0" },
        { text: "Không khả dụng", value: "1" },
      ],
      onFilter: (value: any, record: any) => handleStatusFilter(value, record),
      render: (text: string, record: IProduct) => {
        const status = text === "0" ? true : false;
        const switchStyle = {
          backgroundColor: status ? "rgb(252, 106, 87)" : "",
        };
        return (
          <div className="d-flex align-items-center">
            <div>
              {status ? (
                <Tag color="green">Khả dụng</Tag>
              ) : (
                <Tag color="red">Không khả dụng</Tag>
              )}
            </div>
            <Switch
              className="bg-gray-400 "
              key={record.id}
              checked={status}
              onChange={() => handleStatusChange(record)}
              loading={loading}
              style={switchStyle}
            />
          </div>
        );
      },
    },

    {
      title: "Hành động",
      render: ({ key: id }: { key: number | string }) => (
        <div className="space-x-2 flex">
          <Link
            className="btn btn-outline-info btn-sm edit square-btn flex items-center"
            to={`/admin/products/${id}/update`}
          >
            <i className="tio-edit"></i>
          </Link>
          <Popconfirm
            title="Xóa sản phẩm "
            description="Bạn có chắc muốn xóa không ?"
            onConfirm={() => {
              // Thực hiện xóa
              removeProduct(id)
                .unwrap()
                .then(() => {
                  message.success({
                    type: "success",
                    content: "Xóa sản phẩm thành công",
                  });
                });
            }}
            okText="Có"
            okButtonProps={{
              style: { backgroundColor: "orange", color: "white" },
            }}
            cancelText="Không"
            overlayStyle={{ width: "250px" }}
          >
            <button
              type="button"
              className="btn btn-outline-danger btn-sm delete square-btn flex items-center"
            >
              <i className="tio-delete"></i>
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title={<h3>Chọn khoảng giá</h3>}
        visible={isFilterModalVisible}
        onCancel={() => setIsFilterModalVisible(false)}
        footer={null}
      >
        <div className="">
          <Slider
            range
            min={0}
            max={4000}
            step={10}
            value={[minPrice, maxPrice]}
            onChange={(values) => {
              handleMinPriceChange(values[0]);
              handleMaxPriceChange(values[1]);
            }}
          />
          <div className="flex justify-between items-end">
            <div>
              <InputNumber
                className="mr-2"
                placeholder="Min"
                min={0}
                step={10}
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <InputNumber
                placeholder="Max"
                min={0}
                step={10}
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
            <Button
              className="border-blue-500 text-blue-400 "
              onClick={handleResetFilter}
              size="small"
            >
              Đặt lại
            </Button>
          </div>
        </div>
      </Modal>

      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/product.png"
            alt=""
          />
          <span className="page-header-title">Danh sách sản phẩm</span>
        </h2>
        <span className="badge badge-soft-dark rounded-50 fz-14">
          {" "}
          {filteredData ? filteredData.length : 0}
        </span>
      </div>
      <div className="row g-2">
        <div className="col-12">
          <div className="card">
            <div className="card-top px-card pt-4">
              <div className="row justify-content-between align-items-center gy-2">
                <div className="col-lg-4">
                  <form>
                    <div className="input-group z-0">
                      <input
                        id="datatableSearch_"
                        type="search"
                        name="search"
                        className="form-control"
                        placeholder="Search by product name"
                        aria-label="Search"
                        autoComplete="off"
                        value={searchKeyword}
                        onChange={handleSearch}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ backgroundColor: "#fc6a57" }}
                        >
                          Tìm kiếm
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-8">
                  <div className="d-flex gap-3 justify-content-end text-nowrap flex-wrap">
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="tio-download-to"></i>
                        Export
                        <i className="tio-chevron-down"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li>
                          <a
                            type="submit"
                            className="dropdown-item d-flex align-items-center gap-2"
                            href="https://efood-admin.6amtech.com/admin/product/excel-import"
                          >
                            <img
                              width="14"
                              src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/excel.png"
                              alt=""
                            />
                            Excel
                          </a>
                        </li>
                      </ul>
                    </div>
                    <Link
                      to={`/admin/products/add`}
                      className="btn btn-primary"
                    >
                      <i className="tio-add"></i> Thêm mới
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="table-responsive datatable-custom">
                <div className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
                  <Skeleton
                    loading={isLoading}
                    active
                    title={false}
                    paragraph={{ rows: 5 }}
                  >
                    <Table
                      dataSource={filteredData}
                      columns={columns}
                      pagination={false}
                    />
                  </Skeleton>
                </div>

                {/* //////// */}

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
                              aria-current={link.active ? "page" : undefined}
                            >
                              {link.url ? (
                                <div
                                  className="page-link"
                                  data-page={productsData?.data.current_page}
                                  onClick={() => handlePageChange(link.url)}
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
          </div>
        </div>
      </div>
      <Modal
        title={
          <div className="d-flex align-items-center">
            <ExclamationCircleFilled
              style={{ fontSize: "24px", color: "orange", marginRight: "10px" }}
            />
            <span style={{ fontSize: "18px" }}>Cảnh báo</span>
          </div>
        }
        okText="Xác nhận"
        okType="danger"
        visible={isModalVisible}
        onOk={handleConfirmStatusChange}
        onCancel={handleCancelStatusChange}
        confirmLoading={loading}
        width={400}
      >
        <span>
          Bạn có chắc muốn thay đổi trạng thái sản phẩm{" "}
          <strong>{selectedProduct?.name}</strong> không?
        </span>
      </Modal>
    </div>
  );
};

export default AdminProducts;
