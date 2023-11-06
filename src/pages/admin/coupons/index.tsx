import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { DateTimeFormat } from "../../../components/DateTimeFormat";
import { ICoupon } from "../../../interface/coupon";
import { Modal, Skeleton, Space, Switch, Table, Tag } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import ModalCouponDetail from "../../../components/admin/coupon/ModalCoupon";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
} from "../../../api/coupons";
import axios from "axios";

const { confirm } = Modal;
const { Column } = Table;

const AdminCoupons = () => {
  const [search, setSearch] = useState("");
  const { data: couponApi, isLoading: isLoadingCouponApi } = useGetCouponsQuery(
    `?coupon_code=${search}`
  );
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();
  const [couponsData, setCouponsData] = useState(couponApi);
  const [couponsListData, setCouponsListData] = useState(couponApi?.data);
  const [loadingPageChange, setLoadingPageChange] = useState(false);

  useEffect(() => {
    setCouponsData(couponApi);
    setCouponsListData(couponApi?.data);
  }, [couponApi]);

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";

  const handlePageChange = (path: string) => {
    setLoadingPageChange(true);
    axios
      .get(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setCouponsData(response.data);
        setCouponsListData(response.data.data);
        setLoadingPageChange(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onSwitchChange = (coupon: ICoupon) => {
    const statusConfirm =
      coupon.coupon_status == "0" ? "có hiệu lực" : "hết hạn";
    confirm({
      title: "Thay đổi trạng thái !",
      icon: <ExclamationCircleFilled />,
      content: `Phiếu ${coupon.coupon_code} sẽ được thay đổi sang ${statusConfirm} ?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await updateCoupon({
            ...coupon,
            coupon_status: coupon.coupon_status == "0" ? "1" : "0",
          })
            .unwrap()
            .then(({ meta }) => {
              toast.success(meta.message);

              // Cập nhật trạng thái trong danh sách
              const updatedData = couponsListData?.map((item: any) => {
                if (item.id === coupon.id) {
                  return {
                    ...item,
                    coupon_status: coupon.coupon_status === "0" ? "1" : "0",
                  };
                }
                return item;
              });

              setCouponsListData(updatedData);
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

  const showDeleteConfirm = (coupon: ICoupon) => {
    confirm({
      title: "Cảnh báo !",
      icon: <ExclamationCircleFilled />,
      content: `${coupon.coupon_code} sẽ bị xoá, bạn có chắc muốn tiếp tục ?`,
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Huỷ",
      async onOk() {
        try {
          await deleteCoupon(coupon.id)
            .unwrap()
            .then(({ meta }) => {
              toast.success(meta.message);
              const newData = couponsListData?.filter(
                (item: any) => item.id != coupon.id
              );
              setCouponsListData(newData);
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
    setCouponsData(couponApi);
    setCouponsListData(couponApi?.data);
  };

  const data: any = couponsListData?.map((item: any) => ({
    key: item.id,
    ...item,
  }));
  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width={20}
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/coupon.png"
            alt=""
          />
          <span className="page-header-title">Danh sách phiếu giảm giá</span>
        </h2>
      </div>
      <div className="row g-2">
        <div className="col-12">
          <div className="card">
            <div className="card-top px-card pt-4">
              <div className="row justify-content-between align-items-center gy-2">
                <div className="col-sm-4 col-md-6 col-lg-8">
                  <h5 className="d-flex align-items-center gap-2 mb-0">
                    Phiếu giảm giá
                    <span className="badge badge-soft-dark rounded-50 fz-12">
                      {couponsData?.meta?.total}
                    </span>
                    <Link to="/admin/coupons/add" className="btn btn-primary">
                      <i className="tio-add"></i> Thêm mới
                    </Link>
                  </h5>
                </div>

                {/* Search */}
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <form className="mb-0">
                    <div className="input-group">
                      <input
                        id="`datatableSearch_`"
                        type="search"
                        name="search"
                        className="form-control"
                        placeholder="Tìm kiếm theo mã"
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
            <div className="py-4">
              <div className="table-responsive datatable-custom">
                {isLoadingCouponApi || loadingPageChange ? (
                  <Skeleton active />
                ) : (
                  <Table dataSource={data} pagination={false}>
                    <Column title="Mã giảm giá" dataIndex="coupon_code" />
                    <Column
                      title="Giảm"
                      dataIndex="amount_discount"
                      render={(text: any) => <span>{text}%</span>}
                    />
                    <Column title="Ngày hết hạn" dataIndex="expiration_date" />
                    <Column title="Số lượng" dataIndex="coupon_quantity" />
                    <Column
                      title="Ngày tạo"
                      dataIndex="created_at"
                      sorter={(a: any, b: any) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                      }
                      render={(record: any) => (
                        <DateTimeFormat value={record} isBreak isTime />
                      )}
                    />
                    <Column
                      title="Trạng thái"
                      dataIndex="coupon_status"
                      filters={[
                        {
                          text: "Hết hạn",
                          value: "0",
                        },
                        {
                          text: "Có hiệu lực",
                          value: "1",
                        },
                      ]}
                      onFilter={(value: any, record: ICoupon) =>
                        record.coupon_status === value
                      }
                      render={(text: string, record: ICoupon) => {
                        const status = text == "0" ? false : true;
                        return (
                          <div className="flex justify-between pr-5">
                            {status ? (
                              <Tag color="green">Có hiệu lực</Tag>
                            ) : (
                              <Tag color="red">Hết hạn</Tag>
                            )}
                            <Switch
                              checked={status}
                              onChange={() => onSwitchChange(record)}
                              style={{
                                backgroundColor: `${
                                  status ? "#ff6767" : "gray"
                                }`,
                              }}
                            />
                          </div>
                        );
                      }}
                    />
                    <Column
                      title="Hành động"
                      key="action"
                      render={(record: ICoupon) => (
                        <Space size="middle">
                          <ModalCouponDetail value={record} />
                          <button
                            data-toggle="modal"
                            data-target={`#coupon-detail-${record.id}`}
                            type="button"
                            className="btn btn-outline-danger btn-sm delete square-btn flex items-center focus:bg-[#ed4c78]"
                          >
                            <i className="tio-invisible"></i>
                          </button>
                          <Link
                            className="btn btn-outline-info btn-sm edit square-btn flex items-center"
                            to={`/admin/coupons/${record.id}/update`}
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
                      {couponsData?.meta.links?.map(
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

export default AdminCoupons;
