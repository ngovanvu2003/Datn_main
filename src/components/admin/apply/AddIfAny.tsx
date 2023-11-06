import { useEffect, useState } from "react";
// import { useGetTablesQuery } from "../../../api/tables";
// import { useGetBranchesQuery } from "../../../api/branches";
import {
  useGetReservationsOptionQuery,
  usePaginateIfReservationMutation,
} from "../../../api/reservation";
import { IReservation } from "../../../interface/reservation";
import { Skeleton, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";

import toast from "react-hot-toast";
import { DateTimeFormat } from "../../DateTimeFormat";
const AddIfAny = (props: any) => {
  const { data: reservation, isLoading: isLoadingReservation } =
    useGetReservationsOptionQuery({ reservation_status: 1 });
  const [reservationData, setReservation] = useState(reservation);
  const [paginateReservation] = usePaginateIfReservationMutation();
  const [loadingPageChange, setLoadingPageChange] = useState(false);
  const [isLoadingAddReservation, setIsLoadingAddReservation] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setReservation(reservation);
  }, [reservation]);
  const [presently, setHidden] = useState(false);
 
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
  const add_new_row_button = () => {
    setHidden(true);
  };
  const removeOption = () => {
    setHidden(false);
  };

  const data: any = reservationData?.data?.data
    .filter((sdt: any) => {
      return sdt?.phone.toLowerCase().includes(search.toLowerCase());
    })
    .map((item: IReservation) => ({
      key: item.id,
      ...item,
    }));
    const addDataForm = (record: any) => {
 
      try {
        setIsLoadingAddReservation(true);
        props.onChildButtonClick(record);
        setIsLoadingAddReservation(false);
        toast.success("Thêm vào form thành công");
        
      } catch (error: any) {
        toast.error(error.message);
      }
      setHidden(false);
    };

  return (
    <>
      <div className="card mt-3">
        <div className="card-header">
          <h4 className="mb-0 d-flex gap-2 align-items-center">
            <i className="tio-canvas-text"></i>
            Khách đã đặt trước
          </h4>
        </div>
        <div className="card-body pb-0">
          <div className="row">
            <div className="col-md-12">
              <div id="add_new_option">
                {presently ? (
                  <div className="card-body">
                    <div className="row g-2">
                      <div className="col-lg-5 col-md-6">
                        <label htmlFor="">Tìm theo số điện thoại * </label>
                        <input
                          id="datatableSearch_"
                          type="search"
                          name="name"
                          className="form-control"
                          placeholder="VD: 0793576765"
                          aria-label="Search"
                          autoComplete="off"
                          onChange={onHandleSearch}
                        />
                      </div>
                      <div className="col-lg-5 col-md-6">
                        <label htmlFor="">Tìm theo tên* </label>
                        <input
                          id="datatableSearch_"
                          type="search"
                          name="name"
                          className="form-control"
                          placeholder="VD: Ngô Văn V"
                          aria-label="Search"
                          autoComplete="off"
                          onChange={onHandleSearch}
                        />
                      </div>
                      <div className="col-12 col-lg-2">
                        <div className="row g-2">
                          <div className="col-md-4">
                            <label className="d-md-block d-none">&nbsp;</label>
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm delete_input_button bg-red-400"
                                  onClick={removeOption}
                                  title="Delete"
                                >
                                  <i className="tio-add-to-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="option_price_9">
                      <div className="border rounded p-3 pb-0 mt-3">
                        <div id="option_price_view_9">
                          <div className="row g-3 add_new_view_row_class ">
                            {/* dd */}

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
                                  </div>
                                </div>
                                <div className="py-4">
                                {isLoadingAddReservation ? (
                                    <div>Loading...</div>
                                  ) : (
                                  <div className="table-responsive">
                                    {isLoadingReservation ||
                                    isLoadingReservation ||
                                    loadingPageChange ? (
                                      <Skeleton />
                                    ) : (
                                      <Table
                                        dataSource={data}
                                        pagination={false}
                                      >
                                        <Column
                                          title="Tên Khách Hàng"
                                          dataIndex="username"
                                        />
                                        <Column
                                          title="Số điện thoại"
                                          dataIndex="phone"
                                        />
                                        <Column
                                          title="Số người đi"
                                          dataIndex="quantity_person"
                                        />
                                        <Column
                                          title="Chi nhánh"
                                          dataIndex="branch_name"
                                        />
                                        <Column
                                          title="Đặt bàn lúc"
                                          dataIndex="created_at"
                                          sorter={(a: any, b: any) =>
                                            new Date(a.created_at).getTime() -
                                            new Date(b.created_at).getTime()
                                          }
                                          render={(record) => (
                                            <DateTimeFormat value={record} />
                                          )}
                                        />
                                        <Column
                                          title="Trạng thái"
                                          dataIndex="reservation_status"
                                          render={(text: string) => {
                                            const status = (text: string) => {
                                              if (text === "0") {
                                                return (
                                                  <Tag color="blue">
                                                    Khách chưa tới
                                                  </Tag>
                                                );
                                              } else if (text === "1") {
                                                return (
                                                  <Tag color="green">
                                                    Khách đã đến
                                                  </Tag>
                                                );
                                              } else if (text === "-1") {
                                                return (
                                                  <Tag color="red">
                                                    Khách đã hủy
                                                  </Tag>
                                                );
                                              }
                                            };
                                            return (
                                              <div className="">
                                                {status(text)}
                                              </div>
                                            );
                                          }}
                                        />
                                        <Column
                                          title="Hành động"
                                          key="action"
                                          render={(record: IReservation) => (
                                            <Space size="middle">
                                              <a
                                                className=" d-flex justify-content-lg-end btn btn-outline-info btn-sm edit square-btn flex items-center"
                                                onClick={() =>
                                                  addDataForm(record)
                                                }
                                              >
                                                <i className="tio-edit"></i>
                                              </a>
                                            </Space>
                                          )}
                                        />
                                      </Table>
                                    )}
                                  </div>
                                  )}
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
                                                aria-current={
                                                  link.active
                                                    ? "page"
                                                    : undefined
                                                }
                                              >
                                                {link.url ? (
                                                  <div
                                                    className="page-link"
                                                    onClick={() =>
                                                      handlePageChange(link.url)
                                                    }
                                                  >
                                                    {link.label ==
                                                    "&laquo; Previous" ? (
                                                      <span>‹</span>
                                                    ) : link.label ==
                                                      "Next &raquo;" ? (
                                                      <span>›</span>
                                                    ) : (
                                                      <span>{link.label}</span>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <span className="page-link">
                                                    {link.label ==
                                                      "&laquo; Previous" && (
                                                      <span>‹</span>
                                                    )}
                                                    {link.label ==
                                                      "Next &raquo;" && (
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
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <br />
              <div className="">
                <a
                  className="btn btn-outline-success"
                  id="add_new_option_button"
                  onClick={() => add_new_row_button()}
                >
                  Thêm khách hàng đã đặt trước
                </a>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddIfAny;
