/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddReservationMutation } from "../../../api/reservation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useGetBranchesQuery } from "../../../api/branches";
import { IBranch } from "../../../interface/branch";
import { format } from "date-fns";
const FormReservation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
  const { data: branches } = useGetBranchesQuery();
  const [AddReservation, { isLoading: isLoadingTableAdd }] =
    useAddReservationMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (value: any) => {
    try {
      AddReservation({
        ...value,
        user_id: 0,
        meal_time: formattedDate,
      })
        .unwrap()
        .then(({ meta }) => {
          reset();
          toast.success(meta.message);
        })
        .catch(({ data }) => {
          const { message } = data.meta;
          if (message) toast.error(message);
          if (message.id) message.id.map((err: any) => toast.error(err));
        });
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  return (
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
              {isLoadingTableAdd ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Thêm"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormReservation;
