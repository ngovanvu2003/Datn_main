/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetReservationIdQuery,
  useUpdateReservationMutation,
} from "../../../api/reservation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useGetBranchesQuery } from "../../../api/branches";
import { IBranch } from "../../../interface/branch";

import { useNavigate, useParams } from "react-router-dom";
const AdminReserUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: branches } = useGetBranchesQuery();
  const { data: reservation, isSuccess } = useGetReservationIdQuery(id || "");
  const [updateTable, { isLoading: isLoadingTableUpdate }] =
    useUpdateReservationMutation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reservationStatus = () => {
    const statusRV = reservation?.data.reservation_status;
    if (statusRV === "0") {
      return 0;
    } else if (statusRV === "1") {
      return 1;
    } else if (statusRV === "-1") {
      return -1;
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      setValue("id", reservation?.data.id);
      setValue("username", reservation?.data.username);
      setValue("phone", reservation?.data.phone);
      setValue("quantity_person", reservation?.data.quantity_person);
      setValue("branch_id", reservation?.data.branch_id);
      setValue("reservation_status", reservationStatus());
    }
  }, [isSuccess, reservation, setValue, reservationStatus]);

  const onSubmit = (value: any) => {
    console.log(value.reservation_status);

    try {
      updateTable({
        ...value,
      })
        .unwrap()
        .then(({ meta }: any) => {
          toast.success(meta.message);
          navigate("/admin/reservation");
        })
        .catch(({ data }: any) => {
          const { message } = data.meta;
          if (message) toast.error(message);
          if (message.city) message.city.map((err: any) => toast.error(err));
          if (message.district)
            message.district.map((err: any) => toast.error(err));
          if (message.street)
            message.street.map((err: any) => toast.error(err));
          if (message.address_details)
            message.address_details.map((err: any) => toast.error(err));
        });
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/reservation.png"
            alt=""
          />
          <span className="page-header-title">Cập nhật bàn</span>
        </h2>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="username">
                        Tên khách hàng <span className="text-danger">*</span>
                      </label>
                      <input
                        id="username"
                        {...register("username", {
                          required: "Không được bỏ trống tên khách hàng",
                        })}
                        className="form-control"
                        placeholder="Vd: Nguyễn Văn A"
                      />
                      {errors.username && (
                        <span className="text-red-500">
                          {errors.username.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone">
                        Số điện thoại <span className="text-danger">*</span>
                      </label>
                      <input
                        id="phone"
                        type="number"
                        {...register("phone", {
                          required: "Không được bỏ trống số điện thoại",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Số điện thoại không hợp lệ",
                          },
                        })}
                        className="form-control"
                        placeholder="Vd: 1"
                      />
                      {errors.phone && (
                        <span className="text-red-500">
                          {errors.phone.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="input-label" htmlFor="branch_id">
                        Chi nhánh <span className="text-danger">*</span>
                      </label>
                      <select
                        id="branch_id"
                        {...register("branch_id", {
                          required: "Không được bỏ trống chi nhánh",
                        })}
                        className="custom-select"
                        defaultValue={branches?.data?.data[0].id}
                      >
                        {branches?.data?.data?.map((branch: IBranch) => {
                          return (
                            <option key={branch.id} value={branch.id}>
                              {branch.name}
                            </option>
                          );
                        })}
                      </select>
                      {errors.branch_id && (
                        <span className="text-red-500">
                          {errors.branch_id.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="quantity_person">
                        Số người đi <span className="text-danger">*</span>
                      </label>
                      <input
                        id="quantity_person"
                        type="number"
                        {...register("quantity_person", {
                          required: "Không được bỏ trống số người đi",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Phải là số nguyên",
                          },
                        })}
                        className="form-control"
                        placeholder="Vd: 1"
                      />
                      {errors.quantity_person && (
                        <span className="text-red-500">
                          {errors.quantity_person.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="input-label" htmlFor="branch_id">
                        Chi nhánh <span className="text-danger">*</span>
                      </label>
                      <select
                        id="reservation_status"
                        defaultValue={reservationStatus()}
                        {...register("reservation_status", {
                          required: "Trạng thái lôi",
                        })}
                        className=" font-bold custom-select"
                      >
                        <option className="font-bold text-green-500" value={1}>
                          Khách đã đến
                        </option>
                        <option className=" font-bold text-blue-500" value={0}>
                          Khách chưa tới
                        </option>
                        <option className="font-bold text-red-500" value={-1}>
                          Đã hủy
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="reset"
                    className="btn btn-text"
                    style={{ backgroundColor: "#e3e3e3" }}
                  >
                    Làm lại
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#fc6a57" }}
                  >
                    {isLoadingTableUpdate ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Gửi"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminReserUpdate;
