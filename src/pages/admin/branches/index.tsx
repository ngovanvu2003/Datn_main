/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  useDeleteBranchMutation,
  useGetBranchesQuery,
  useUpdateBranchMutation,
} from "../../../api/branches";
import { IBranch } from "../../../interface/branch";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Modal, Skeleton, Space, Switch, Table, Tag } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { DateTimeFormat } from "../../../components/DateTimeFormat";
import axios from "axios";

const { confirm } = Modal;
const { Column } = Table;

const AdminBranches = () => {
  const { data: branches, isLoading: isLoadingBranches } =
    useGetBranchesQuery();
  const [deleteBranch, { isLoading }] = useDeleteBranchMutation();
  const [updateBranch] = useUpdateBranchMutation();
  const [branchesData, setBranchesData] = useState(branches);
  const [branchesListData, setBranchesListData] = useState(branches?.data.data);
  const [search, setSearch] = useState("");
  const [loadingPageChange, setLoadingPageChange] = useState(false);

  useEffect(() => {
    setBranchesData(branches);
    setBranchesListData(branches?.data.data);
  }, [branches]);

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";
  const handlePageChange = (path: string) => {
    setLoadingPageChange(true)
    axios
      .get(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setBranchesData(response.data);
        setBranchesListData(response.data.data)
        setLoadingPageChange(false)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onSwitchChange = (branch: IBranch) => {
    const statusConfirm =
      branch.branch_status == "0" ? "hoạt động" : "đóng cửa";
    confirm({
      title: "Thay đổi trạng thái !",
      icon: <ExclamationCircleFilled />,
      content: `Trạng thái của ${branch.name} sẽ được thay đổi sang ${statusConfirm} ?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await updateBranch({
            ...branch,
            branch_status: branch.branch_status == "0" ? "1" : "0",
          })
            .unwrap()
            .then(({ meta }: any) => {
              toast.success(meta.message);
              // Cập nhật trạng thái trong danh sách
              const updatedData = branchesListData?.map((item: any) => {
                if (item.id === branch.id) {
                  return {
                    ...item,
                    branch_status: branch.branch_status === "0" ? "1" : "0",
                  };
                }
                return item;
              });

              setBranchesListData(updatedData);
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

  const showDeleteConfirm = (value: IBranch) => {
    confirm({
      title: "Cảnh báo",
      icon: <ExclamationCircleFilled />,
      content: `${value.name} sẽ bị xoá, bạn có chắc muốn tiếp tục?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await deleteBranch(value)
            .unwrap()
            .then(({ meta }) => {
              toast.success(meta.message)
              const newData = branchesListData?.filter(
                (item: any) => item.id != value.id
              );
              setBranchesListData(newData);
            })
            .catch(({ data }) => {
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

  const onHandleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  
  const data: IBranch[] = branchesListData
    ?.filter((branch: IBranch) => {
      return branch.name.toLowerCase().includes(search.toLowerCase());
    })
    ?.map((branch: IBranch) => ({
      key: branch.id,
      ...branch,
    }));
  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/branch.png"
            alt=""
          />
          <span className="page-header-title">Danh sách chi nhánh</span>
        </h2>
      </div>
      <div className="card">
        <div className="card-top px-card pt-4">
          <div className="row justify-content-between align-items-center gy-2">
            <div className="flex gap-4 col-sm-4 col-md-6 col-lg-8">
              <h5 className="d-flex align-items-center gap-2 mb-0">
                Chi nhánh
                <span className="badge badge-soft-dark rounded-50 fz-12">
                  {branches?.data.total}
                </span>
              </h5>
              <Link to="/admin/branches/add" className="btn btn-primary">
                <i className="tio-add"></i> Thêm mới
              </Link>
            </div>
            <div className="col-sm-8 col-md-6 col-lg-4">
              <form >
                <div className="input-group z-0">
                  <input
                    id="datatableSearch_"
                    type="search"
                    name="search"
                    className="form-control"
                    placeholder="Tìm kiếm theo tên"
                    aria-label="Search"
                    defaultValue=""
                    required
                    autoComplete="off"
                    onChange={onHandleSearch}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="card-body px-0 pb-0">
          <div className="table-responsive datatable-custom">
            {isLoadingBranches || loadingPageChange ? (
              <Skeleton active/>
            ) : (
              <Table dataSource={data} pagination={false}>
                <Column title="Tên chi nhánh" dataIndex="name" />
                <Column title="Đường/phố" dataIndex="street" />
                <Column title="Quận/huyện" dataIndex="district" />
                <Column title="Thành phố" dataIndex="city" key="city" />
                <Column
                  title="Ngày tạo"
                  dataIndex="created_at"
                  sorter={(a: any, b: any) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                  }
                  render={(record) => <DateTimeFormat value={record} isTime />}
                />
                <Column
                  title="Trạng thái"
                  dataIndex="branch_status"
                  filters={[
                    {
                      text: "Hoạt động",
                      value: "1",
                    },
                    {
                      text: "Đóng cửa",
                      value: "0",
                    },
                  ]}
                  onFilter={(
                    value: string | number | boolean,
                    record: IBranch
                  ) => record.branch_status === value}
                  render={(text: string, record: IBranch) => {
                    const status = text == "1" ? true : false;
                    return (
                      <div>
                        {status ? (
                          <Tag color="green">Hoạt động</Tag>
                        ) : (
                          <Tag color="red">Đóng cửa</Tag>
                        )}
                        <Switch
                          checked={status}
                          onChange={() => onSwitchChange(record)}
                          style={{
                            backgroundColor: `${status ? "#ff6767" : "gray"}`,
                          }}
                        />
                      </div>
                    );
                  }}
                />
                <Column
                  title="Hành động"
                  key="action"
                  render={(record: IBranch) => (
                    <Space size="middle">
                      <Link
                        className="btn btn-outline-info btn-sm edit square-btn flex items-center"
                        to={`/admin/branches/${record.id}/update`}
                      >
                        <i className="tio-edit"></i>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm delete square-btn flex items-center focus:bg-[#ed4c78]"
                        onClick={() => showDeleteConfirm(record)}
                        disabled={isLoading}
                      >
                        <i className="tio-delete"></i>
                      </button>
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
                  {branchesData?.data?.links?.map(
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
                            {link.label == "&laquo; Previous" && <span>‹</span>}
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
    </>
  );
};

export default AdminBranches;
