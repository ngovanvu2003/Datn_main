import { Link } from "react-router-dom";
import {
  useDeleteCustomerMutation,
  useGetAllCustomerQuery,
} from "../../../api/customer";
import { Popconfirm, Skeleton, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Column from "antd/es/table/Column";
import { DateTimeFormat } from "../../../components/DateTimeFormat";

const AdminCustomers = () => {
  const { data: customers, isLoading: isLoadingCustomer } =
    useGetAllCustomerQuery();
  const [customersData, setCombos] = useState(customers);
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [search, setSearch] = useState("");
  useEffect(() => {
    setCombos(customers);
  }, [customers]);
  const user = localStorage.getItem("user");
  const { access_token = "" } = user ? JSON.parse(user) : {};
  const handlePageChange = (path: string) => {
    axios
      .post(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setCombos(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onHandleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const data: any = customersData?.data?.data
    .filter((item: any) => {
      return item?.phone.toLowerCase().includes(search.toLowerCase());
    })
    .map((item: any) => ({
      key: item.id,
      ...item,
    }));

  return (
    <>
      <div className="row g-2">
        <div className="col-12">
          <div className="card">
            <div className="card-top px-card pt-4">
              <div className="row justify-content-between align-items-center gy-2">
                <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
                  <h2 className="h1 mb-0 d-flex align-items-center gap-2">
                    <img
                      width="20"
                      className="avatar-img"
                      src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/customer.png"
                      alt=""
                    />
                    <span className="page-header-title">Người dùng</span>
                  </h2>
                  <span className="badge badge-soft-dark rounded-50 fz-12">
                    {customers?.data?.total}
                  </span>
                </div>
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <div className="input-group z-0">
                    <input
                      id="datatableSearch_"
                      type="search"
                      name="name"
                      className="form-control"
                      placeholder="Tìm kiếm theo số điện thoại"
                      aria-label="Search"
                      autoComplete="off"
                      onChange={onHandleSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="table-responsive">
                {isLoadingCustomer || isLoadingCustomer ? (
                  <Skeleton />
                ) : (
                  <Table dataSource={data} pagination={false}>
                    <Column title="Tên khách hàng" dataIndex="name" />
                    <Column title="Email" dataIndex="email" />
                    <Column title="phone" dataIndex="phone" />
                    <Column title="Ngày sinh" dataIndex="date_of_birth" />
                    <Column
                      title="Ngày tạo"
                      dataIndex="created_at"
                      sorter={(a: any, b: any) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                      }
                      render={(record) => <DateTimeFormat value={record} />}
                    />

                    <Column
                      title="Hành động"
                      key="action"
                      render={(record: any) => (
                        <Space size="middle">
                          <Link
                            className=" d-flex justify-content-lg-end btn btn-outline-info btn-sm edit square-btn flex items-center"
                            to={`/admin/customers/view/${record.id}`}
                          >
                            <i className="tio-visible"></i>
                          </Link>
                          <Popconfirm
                            title="Xóa sản phẩm "
                            description="Bạn có chắc muốn xóa không ?"
                            onConfirm={() => {
                              // Thực hiện xóa
                              deleteCustomer(record.id)
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
                              style: {
                                backgroundColor: "orange",
                                color: "white",
                              },
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
                        </Space>
                      )}
                    />
                  </Table>
                )}
              </div>
              <div className="table-responsive mt-4 px-3">
                <div className="d-flex justify-content-lg-end">
                  <nav>
                    <ul className="pagination">
                      {customersData?.data?.links?.map(
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
                                {link.label == "Next &raquo;" && <span>›</span>}
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
    </>
  );
};

export default AdminCustomers;
