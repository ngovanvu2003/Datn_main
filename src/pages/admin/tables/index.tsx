import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Modal, Skeleton, Space, Table, Tag, Switch } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { ITable } from "../../../interface/table";
import {
  useDeleteTableMutation,
  useGetTablesQuery,
  usePaginateTableMutation,
  useSupportCustomerMutation,
  useUpdateTableMutation,
  useSearchTableMutation,
} from "../../../api/tables";

import { DateTimeFormat } from "../../../components/DateTimeFormat";
import ModalQr from "../../../components/admin/table/ModalQr";

const { confirm } = Modal;
const { Column } = Table;

const AdminTables = () => {
  const { data: tablesApi, isLoading: isLoadingTables } = useGetTablesQuery();
  const [deleteTable] = useDeleteTableMutation();
  const [paginateTable] = usePaginateTableMutation();
  const [updateTable] = useUpdateTableMutation();
  const [searchTable, { isLoading: isLoadingSearchTable }] =
    useSearchTableMutation();

  const [loadingPageChange, setLoadingPageChange] = useState(false);
  const [tablesData, setTablesData] = useState(tablesApi);
  const [tablesListData, setTablesListData] = useState(tablesApi?.data.data);

  useEffect(() => {
    setTablesData(tablesApi);
    setTablesListData(tablesApi?.data.data);
  }, [tablesApi]);

  const handlePageChange = (path: string) => {
    setLoadingPageChange(true);
    const page = path.slice(-1);
    paginateTable(page)
      .unwrap()
      .then((data) => {
        setTablesData(data);
        setTablesListData(data.data.data);
        setLoadingPageChange(false);
      })
      .catch((err) => console.log(err));
  };

  const onSwitchChange = (table: ITable) => {
    const statusConfirm = table.table_status == "0" ? "bàn mở" : "bàn đóng";
    confirm({
      title: "Thay đổi trạng thái !",
      icon: <ExclamationCircleFilled />,
      content: `Trạng thái ${table.name} sẽ được thay đổi sang ${statusConfirm} ?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await updateTable({
            ...table,
            table_status: table.table_status == "0" ? "1" : "0",
          })
            .unwrap()
            .then(({ meta }) => {
              toast.success(meta.message);

              // Cập nhật trạng thái trong danh sách
              const updatedData = tablesListData?.map((item: any) => {
                if (item.id === table.id) {
                  return {
                    ...item,
                    table_status: table.table_status === "0" ? "1" : "0",
                  };
                }
                return item;
              });

              setTablesListData(updatedData);
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

  const showDeleteConfirm = (table: ITable) => {
    confirm({
      title: "Cảnh báo !",
      icon: <ExclamationCircleFilled />,
      content: `${table.name} sẽ bị xoá, bạn có chắc muốn tiếp tục ?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await deleteTable(table)
            .unwrap()
            .then(({ meta }) => {
              toast.success(meta.message);
              const newData = tablesListData?.filter(
                (item: any) => item.id != table.id
              );
              setTablesListData(newData);
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
    searchTable({
      name: e.target.value,
    })
      .unwrap()
      .then((response: any) => {
        setTablesData(response);
        setTablesListData(response.data.data);
      })
      .catch((err: any) => console.log(err));
  };

  // Hỗ trỡ khi không vào đc bàn
  const [supportCustomer] = useSupportCustomerMutation();
  const onHandleSupport = (id: string | number) => {
    confirm({
      title: "Cảnh báo !",
      icon: <ExclamationCircleFilled />,
      content: `Hỗ trợ khách hàng quét lại mã Qr ?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await supportCustomer({
            id: id,
          })
            .unwrap()
            .then(({ meta }) => toast.success(meta.message))
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

  const data: any = tablesListData?.map((table: ITable) => ({
    key: table.id,
    ...table,
  }));
  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/table.png"
            alt=""
          />
          <span className="page-header-title">Quản lý bàn</span>
        </h2>
      </div>
      
      <div className="card">
        <div className="card-top px-card pt-4">
          <div className="row justify-content-between align-items-center gy-2">
            <div className="flex justify-start items-center gap-4 col-sm-4 col-md-6 col-lg-8">
              <h5 className="d-flex gap-2">
                Danh sách bàn
                <span className="badge badge-soft-dark rounded-50 fz-12">
                  {tablesApi?.data?.total}
                </span>
              </h5>
              <Link to="/admin/tables/add" className="btn btn-primary">
                <i className="tio-add"></i> Thêm mới
              </Link>
            </div>
            <div className="col-sm-8 col-md-6 col-lg-4">
              <div className="input-group z-0">
                <input
                  id="datatableSearch_"
                  type="search"
                  name="name"
                  className="form-control"
                  placeholder="Tìm kiếm theo tên bàn"
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
            {isLoadingTables || loadingPageChange || isLoadingSearchTable ? (
              <Skeleton active/>
            ) : (
              <Table dataSource={data} pagination={false}>
                <Column title="Tên bàn" dataIndex="name" />
                <Column title="Số ghế" dataIndex="quantity_chair" />
                <Column title="Chi nhánh" dataIndex="branch_name" />
                <Column
                  title="Ngày tạo"
                  dataIndex="created_at"
                  sorter={(a: any, b: any) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                  }
                  render={(record) => (
                    <DateTimeFormat value={record} isBreak isTime />
                  )}
                />
                <Column
                  title="Trạng thái"
                  dataIndex="table_status"
                  filters={[
                    {
                      text: "Bàn đóng",
                      value: "0",
                    },
                    {
                      text: "Bàn mở",
                      value: "1",
                    },
                  ]}
                  onFilter={(
                    value: string | number | boolean,
                    record: ITable
                  ) => record.table_status === value}
                  render={(text: string, record: ITable) => {
                    const status = text == "0" ? false : true;
                    return (
                      <div className="flex justify-between pr-5">
                        {status ? (
                          <Tag color="green">Bàn mở</Tag>
                        ) : (
                          <Tag color="red">Bàn đóng</Tag>
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
                  render={(record: ITable) => (
                    <Space size="middle">
                      <ModalQr value={record} />
                      <button
                        data-toggle="modal"
                        data-target={`#qr-modal-${record.id}`}
                        type="button"
                        className="btn btn-outline-danger btn-sm delete square-btn flex items-center focus:bg-[#ed4c78]"
                      >
                        <i className="tio-qr-code"></i>
                      </button>
                      <Link
                        className="btn btn-outline-info btn-sm edit square-btn flex items-center"
                        to={`/admin/tables/${record.id}/update`}
                      >
                        <i className="tio-edit"></i>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm delete square-btn flex items-center focus:bg-[#ed4c78]"
                        onClick={() => showDeleteConfirm(record)}
                      >
                        <i className="tio-delete"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm delete square-btn flex items-center focus:bg-[#ed4c78]"
                        onClick={() => onHandleSupport(record.id)}
                      >
                        <i className="tio-help"></i>
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
                  {tablesData?.data?.links?.map((link: any, index: number) => (
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
                          data-page={tablesData?.data.current_page}
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
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTables;
