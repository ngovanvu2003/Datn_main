/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { IProduct } from "../../../interface/product";
import {
  Table,
  Switch,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Tag,
  Skeleton,
} from "antd";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  usePaginateTableMutation,
  useUpdateCategoryMutation,
} from "../../../api/categories";
import { ICategory } from "../../../interface/categories";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

const AdminCategories = () => {
  const { data }: any = useGetCategoriesQuery<ICategory[]>();
  const [removeCategory] = useDeleteCategoryMutation();
  const [updataCategoryStatus] = useUpdateCategoryMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoriesData, setcategoriesData] = useState(data);
  const [addCategory] = useAddCategoryMutation();
  const [paginateTable] = usePaginateTableMutation();
  const [form] = useForm();
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    setIsLoadingData(true);

    const loadingTimeout = setTimeout(() => {
      setIsLoadingData(false);
    }, 1000);
    setcategoriesData(data);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [data]);

  const onFinish = (values: any) => {
    addCategory(values)
      .unwrap()
      .then(() => {
        form.resetFields();
        message.success("Thêm sản phẩm thành công");
      })
      .catch(() => {
        message.error("Đã xảy ra lỗi khi thêm sản phẩm");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const filteredData = categoriesData?.data
    .filter((category: any) => {
      return category.name.toLowerCase().includes(searchKeyword.toLowerCase());
    })
    .map((category: ICategory) => ({
      key: category.id,
      ...category,
      created_date: moment(category.created_at).format("DD/MM/YYYY"),
      created_time: moment(category.created_at).format("HH:mm"),
      updated_at: moment(category.updated_at).format("DD/MM/YYYY HH:mm"),
    }));

  const handleStatusChange = (categories: ICategory) => {
    setSelectedCategory(categories);
    setIsModalVisible(true);
  };
  const handlePageChange = (path: string) => {
    const page = path.slice(-1);
    paginateTable(page)
      .unwrap()
      .then((data) => {
        setcategoriesData(data);
      })
      .catch((err) => console.log(err));
  };

  const handleConfirmStatusChange = () => {
    setLoading(true);

    if (selectedCategory && Array.isArray(categoriesData?.data)) {
      updataCategoryStatus({
        ...selectedCategory,
        category_status: selectedCategory.category_status === "0" ? "1" : "0",
      })
        .unwrap()
        .then(() => {
          setLoading(false);
          message.success("Cập nhật trạng thái thành công");
          // Cập nhật trạng thái trong danh sách sản phẩm
          const updatedData = categoriesData?.data.map((category: IProduct) => {
            if (category.id === selectedCategory.id) {
              return {
                ...category,
                category_status:
                  selectedCategory.category_status === "0" ? "1" : "0",
              };
            }
            return category;
          });

          setcategoriesData({
            ...categoriesData,
            data: updatedData,
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
    setSelectedCategory(null);
    setIsModalVisible(false);
  };

  const columns: any = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày tạo",
      render: (record: any) => <div>{record.created_date}</div>,
      sorter: (a: any, b: any) => {
        if (a.created_date && b.created_date) {
          return (
            moment(b.created_date, "DD/MM/YYYY ").unix() -
            moment(a.created_date, "DD/MM/YYYY").unix()
          );
        } else {
          return 0;
        }
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Giờ tạo",
      render: (record: any) => <div>{record.created_time}</div>,
    },
    {
      title: "Trạng thái",
      dataIndex: "category_status",
      filters: [
        { text: "Khả dụng", value: "0" },
        { text: "Không khả dụng", value: "1" },
      ],
      onFilter: (value: any, record: any) => record.category_status === value,
      render: (text: any, record: ICategory) => {
        const status = text === "0" ? true : false;
        const switchStyle = {
          backgroundColor: status ? "rgb(252, 106, 87)" : "gray",
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
              className="bg-gray-400"
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
            to={`/admin/categories/${id}/update`}
          >
            <i className="tio-edit"></i>
          </Link>
          <Popconfirm
            title="Xóa sản phẩm "
            description="Bạn có chắc muốn xóa không ?"
            onConfirm={() => {
              // Thực hiện xóa
              removeCategory(id)
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
      <div className="row g-2">
        <div className="col-12">
          <div className="card">
            <div className="card-top px-card pt-4">
              <div className="">
                <div className="">
                  <div className="">
                    <Form
                      className=" "
                      form={form}
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 29 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <div className="">
                        <h2 className="h1 d-flex align-items-center gap-2 mb-4">
                          <img
                            width="20"
                            className="avatar-img"
                            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/product.png"
                            alt=""
                          />
                          <span className="page-header-title">
                            Thêm mới danh mục
                          </span>
                        </h2>
                        <div className="">
                          <div className="grid grid-cols-2 border rounded-md mb-4 p-2">
                            <Form.Item
                              name="name"
                              className="m-4"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập tên danh mục!",
                                },
                                {
                                  min: 3,
                                  message: "Tên danh mục ít nhất 3 ký tự",
                                },
                              ]}
                            >
                              <div>
                                <span>Tên danh mục</span>
                                <span className="text-danger"> *</span>
                                <Input
                                  className=" my-2  h-[40px] border rounded-md"
                                  placeholder="Vd:Đồ ăn"
                                />
                              </div>
                            </Form.Item>
                          </div>
                          <div className="">
                            <Form.Item wrapperCol={{ offset: 19, span: 3 }}>
                              <div className="flex gap-2 ">
                                <Button
                                  className="pb-5 pt-2 px-4 bg-gray-300 hover:border-gray-400 text-white"
                                  htmlType="reset"
                                >
                                  Làm lại
                                </Button>
                                <Button
                                  className="pb-5 pt-2 px-3 bg-orange-500 text-white"
                                  danger
                                  htmlType="submit"
                                >
                                  <i className="tio-add"></i> Danh mục
                                </Button>
                              </div>
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                  <form className="flex justify-between items-center">
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <h2 className="h1 mb-0 d-flex align-items-center gap-2">
                        <img
                          width="20"
                          className="avatar-img"
                          src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/product.png"
                          alt=""
                        />
                        <span className="page-header-title">Danh mục</span>
                      </h2>
                      <span className="badge badge-soft-dark rounded-50 fz-14">
                        {" "}
                        {filteredData ? filteredData.length : 0}
                      </span>
                    </div>
                    <div className="rounded-md w-[300px] ">
                      <input
                        id="datatableSearch_"
                        type="search"
                        name="search"
                        className="form-control "
                        placeholder="Search by product name"
                        aria-label="Search"
                        autoComplete="off"
                        value={searchKeyword}
                        onChange={handleSearch}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="table-responsive datatable-custom">
                <div className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
                  {isLoadingData ? (
                    <Skeleton active />
                  ) : (
                    <Table
                      dataSource={filteredData}
                      columns={columns}
                      pagination={false}
                    />
                  )}
                </div>
                {/*Paginate */}
                <div className="table-responsive mt-4 px-3">
                  <div className="d-flex justify-content-lg-end">
                    <nav>
                      <ul className="pagination">
                        {categoriesData?.meta?.links?.map(
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
                                  data-page={categoriesData?.meta.current_page}
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
        width={400}
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
        okButtonProps={{ style: { backgroundColor: "orange", color: "white" } }}
      >
        {selectedCategory && (
          <span>
            Bạn có chắc muốn thay đổi trạng thái sản phẩm{" "}
            <strong>{selectedCategory.name}</strong> không?
          </span>
        )}
      </Modal>
    </div>
  );
};

export default AdminCategories;
