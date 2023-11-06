/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useGetBranchesQuery } from "../../../api/branches";
import { useSearchTableMutation } from "../../../api/tables";

import QrCodeSvg from "../../../components/QrCodeSvg";
import { IBranch } from "../../../interface/branch";
import { ITable } from "../../../interface/table";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminTablesAvailability = () => {
  const [tables, setTables] = useState([]);
  const [search, { isLoading }] = useSearchTableMutation();
  const { data: branches } = useGetBranchesQuery();

  const onHandleChange = (e: any) => {
    search({ branch_id: e.target.value })
      .unwrap()
      .then(({ data }) => {
        setTables(data.data);
      });
  };
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
          <span className="page-header-title">Bàn khả dụng</span>
        </h2>
      </div>
      <div className="card card-body">
        <div className="d-flex gap-3 flex-wrap align-items-center justify-content-between mb-4">
          <select
            name="branch_id"
            className="custom-select max-w220"
            id="select_branch"
            defaultValue="0"
            onChange={onHandleChange}
          >
            <option value="0" disabled>
              --- Lựa chọn chi nhánh ---
            </option>
            {branches?.data.data.map((branch: IBranch) => {
              return (
                <option key={branch?.id} value={branch?.id}>
                  {branch.name}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className="table_box_list justify-content-center gap-2 gap-md-3"
          id="table_list"
        >
          {isLoading ? (
            <>
              <Skeleton width={250} height={170} />
            </>
          ) : (
            <>
              {tables?.length == 0 && (
                <div className="dropright">Không có kết quả</div>
              )}
              {tables?.map((table: ITable) => {
                return (
                  <div className="dropright" key={table?.id}>
                    <div
                      className={`card table_hover-btn py-4 ${
                        table.table_status == "0" ? "bg-gray-200" : "bg-c1"
                      } stopPropagation`}
                    >
                      <div className="card-body mx-3 position-relative text-center">
                        <h3 className="card-title mb-2 text-xl font-bold">
                          {table.name}
                        </h3>
                        <h5 className="card-title mb-1 font-bold">
                          Số ghế: {table.quantity_chair}
                        </h5>
                      </div>
                    </div>
                    <div className="table_hover-menu px-3">
                      <h3 className="mb-3 text-xl font-bold">{table.name}</h3>
                      <div className="fz-14 mb-1">
                        Trạng thái -{" "}
                        <strong>
                          {table.table_status == "0"
                            ? "Bàn trống"
                            : "Bàn có người ngồi"}
                        </strong>
                      </div>
                      <div className="fz-14 mb-1">
                        <strong>
                          <QrCodeSvg value={table.qr_code} />
                        </strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* tAble Info Modal */}
          <div
            className="modal fade"
            id="tableInfoModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="tableInfoModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="text-center position-relative px-4 py-5">
                  <button
                    type="button"
                    className="close text-primary position-absolute right-2 top-2 fz-24"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <h3 className="mb-3">Table# - D2</h3>
                  <div className="fz-14 mb-1">
                    Current status - <strong>Available</strong>
                  </div>
                  <div className="fz-14 mb-1">
                    Any reservation - <strong>5 Reservation</strong>
                  </div>
                  <div className="d-flex flex-wrap justify-content-center text-nowrap gap-2 mt-4">
                    <div className="bg-gray rounded d-flex flex-column gap-2 p-3">
                      <h6 className="mb-0">Today</h6>
                      <p className="mb-0">12:00 - 23:00</p>
                    </div>
                    <div className="bg-gray rounded d-flex flex-column gap-2 p-3">
                      <h6 className="mb-0">Tomorrow</h6>
                      <p className="mb-0">12:00 - 23:00</p>
                      <p className="mb-0">12:00 - 23:00</p>
                    </div>
                    <div className="bg-gray rounded d-flex flex-column gap-2 p-3">
                      <h6 className="mb-0">Today</h6>
                      <p className="mb-0">12:00 - 23:00</p>
                    </div>
                  </div>
                  <div className="d-flex mt-5 mx-lg-5">
                    <a
                      href="#"
                      className="btn btn-outline-primary w-100 text-nowrap"
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#reservationModal"
                    >
                      <i className="tio-alarm-alert"></i> Create Reservation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Modal */}
          <div
            className="modal fade"
            id="reservationModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="reservationModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="position-relative px-4 py-5">
                  <button
                    type="button"
                    className="close text-primary position-absolute right-2 top-2 fz-24"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <form action="#">
                    <div className="text-center">
                      <h3 className="mb-3">Table# - D2</h3>
                      <div className="fz-14 mb-1">
                        Current status - <strong>Available</strong>
                      </div>
                    </div>

                    <div className="mb-4 mt-5">
                      <label htmlFor="table_no">Table No</label>
                      <select
                        name="table_no"
                        id="table_no"
                        className="custom-select"
                      >
                        <option defaultValue="#" disabled>
                          Select Tables
                        </option>
                        <option defaultValue="#">D1</option>
                        <option defaultValue="#">D2</option>
                        <option defaultValue="#">D3</option>
                        <option defaultValue="#">D4</option>
                        <option defaultValue="#">D5</option>
                        <option defaultValue="#">D6</option>
                        <option defaultValue="#">D7</option>
                      </select>
                    </div>

                    <div className="mb-4 mt-5">
                      <label htmlFor="reservation_time">Reservation Time</label>
                      <input
                        type="date"
                        id="reservation_time"
                        className="form-control"
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="start_time">Start Time</label>
                          <input
                            type="time"
                            id="start_time"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="end_time">End Time</label>
                          <input
                            type="time"
                            id="end_time"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-primary text-center mt-3">
                      {" "}
                      * Sorry, There is already another reservation in this time{" "}
                    </p>

                    <div className="d-flex justify-content-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary px-lg-5 text-nowrap"
                      >
                        Book Reservation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTablesAvailability;
