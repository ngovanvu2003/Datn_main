import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton, Space, Table, Tag } from "antd";

import {
  useGetReservationsQuery,
  usePaginateReservationMutation,
} from "../../../api/reservation";
import FormReservation from "../../../components/admin/reservation/FormReservation";

import Column from "antd/es/table/Column";
import { IReservation } from "../../../interface/reservation";
import { DateTimeFormat } from "../../../components/DateTimeFormat";

const Index = () => {
  const { data: reservation, isLoading: isLoadingReservation } =
    useGetReservationsQuery();
  const [reservationData, setReservation] = useState(reservation);
  const [search, setSearch] = useState("");
  const [paginateReservation] = usePaginateReservationMutation();

  const [loadingPageChange, setLoadingPageChange] = useState(false);

  useEffect(() => {
    setReservation(reservation);
  }, [reservation]);

  const handlePageChange = (path: string) => {
    setLoadingPageChange(true);
    const page = path.slice(-1);
    paginateReservation(page)
      .unwrap()
      .then((data) => {
        setReservation(data);
        setLoadingPageChange(false);
      })
      .catch((err) => console.log(err));
  };
  const onHandleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const data: any = reservationData?.data?.data
    .filter((sdt: any) => {
      return sdt?.phone.toLowerCase().includes(search.toLowerCase());
    })
    .map((item: IReservation) => ({
      key: item.id,
      ...item,
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
          <span className="page-header-title">Tạo mới</span>
        </h2>
      </div>
      <div className="row g-2">
        <div className="col-12">
          <FormReservation />
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-top px-card pt-4">
              <div className="row justify-content-between align-items-center gy-2">
                <div className="col-sm-4 col-md-6 col-lg-8">
                  <h5 className="d-flex gap-2">
                    Danh sách người đặt bàn
                    <span className="badge badge-soft-dark rounded-50 fz-12">
                      {reservation?.data?.total}
                    </span>
                  </h5>
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
                {isLoadingReservation ||
                isLoadingReservation ||
                loadingPageChange ? (
                  <Skeleton />
                ) : (
                  <Table dataSource={data} pagination={false}>
                    <Column title="Tên Khách Hàng" dataIndex="username" />
                    <Column title="Số điện thoại" dataIndex="phone" />
                    <Column title="Số người đi" dataIndex="quantity_person" />
                    <Column title="Chi nhánh" dataIndex="branch_name" />
                    <Column title="Giờ ăn" dataIndex="meal_time" />
                    <Column
                      title="Đặt bàn lúc"
                      dataIndex="created_at"
                      sorter={(a: any, b: any) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                      }
                      render={(record) => <DateTimeFormat value={record} />}
                    />
                    <Column
                      title="Trạng thái"
                      dataIndex="reservation_status"
                      filters={[
                        {
                          text: "Chưa đến",
                          value: "0",
                        },
                        {
                          text: "Đã đến",
                          value: "1",
                        },
                        {
                          text: "Đã hủy",
                          value: "-1",
                        },
                      ]}
                      onFilter={(
                        value: string | number | boolean,
                        record: IReservation
                      ) => record.reservation_status === value}
                      render={(text: string) => {
                        const status = (text: string) => {
                          console.log(text);
                          if (text === "0") {
                            return <Tag color="blue">Khách chưa tới</Tag>;
                          } else if (text === "1") {
                            return <Tag color="green">Khách đã đến</Tag>;
                          } else if (text === "-1") {
                            return <Tag color="red">Khách đã hủy</Tag>;
                          }
                        };
                        return <div className="">{status(text)}</div>;
                      }}
                    />
                    <Column
                      title="Hành động"
                      key="action"
                      render={(record: IReservation) => (
                        <Space size="middle">
                          <Link
                            className=" d-flex justify-content-lg-end btn btn-outline-info btn-sm edit square-btn flex items-center"
                            to={`/admin/reservation/${record.id}/update`}
                          >
                            <i className="tio-edit"></i>
                          </Link>
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
                      {reservationData?.data?.links?.map(
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

export default Index;
