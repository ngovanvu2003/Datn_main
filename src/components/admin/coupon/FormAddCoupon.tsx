import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { useAddCouponMutation } from "../../../api/coupons";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { formatDateTime } from "../../../helpers/formatDate";

const FormAddCoupon = () => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [expirationDate, setExpirationDate] = useState("");
  const [addCoupon, { isLoading: isLoadingCouponAdd }] = useAddCouponMutation();

  const generateCouponCode = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const code = `SALE${randomNumber}%`;
    setValue("coupon_code", code);
  };

  const onHandleSetExpirationDate = (e: any) => {
    setExpirationDate(e);
  };

  const onSubmit = (value: any) => {
    try {
      addCoupon({
        ...value,
        expiration_date: formatDateTime(expirationDate),
      })
        .unwrap()
        .then(({ meta }) => {
          reset();
          navigate("/admin/coupons");
          toast.success(meta.message);
        })
        .catch(({ data }) => {
          const { message } = data.meta;
          if (message && typeof message == "string") toast.error(message);
          if (message.coupon_code)
            message.coupon_code.map((err: any) => toast.error(err));
          if (message.amount_discount)
            message.amount_discount.map((err: any) => toast.error(err));
          if (message.coupon_quantity)
            message.coupon_quantity.map((err: any) => toast.error(err));
          if (message.expiration_date)
            message.expiration_date.map((err: any) => toast.error(err));
        });
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };

  return (
    <div className="col-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="form-group">
                  <div className="d-flex justify-content-between">
                    <label className="input-label" htmlFor="coupon_code">
                      Mã giảm giá
                    </label>
                    <button
                      type="button"
                      className="float-right c1 fz-12"
                      onClick={generateCouponCode}
                    >
                      Tạo mã ngẫu nhiên
                    </button>
                  </div>
                  <input
                    type="text"
                    {...register("coupon_code", {
                      required: "Không được bỏ trống",
                    })}
                    id="coupon_code"
                    className="form-control"
                    placeholder="kpB0p9c4"
                  />
                  {errors.coupon_code && (
                    <span className="text-red-500">
                      {errors.coupon_code.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="form-group">
                  <label
                    className="input-label text-capitalize"
                    htmlFor="amount_discount"
                  >
                    Giá trị được giảm(%)
                  </label>
                  <input
                    type="number"
                    id="amount_discount"
                    {...register("amount_discount", {
                      required: "Không được bỏ trống",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Phải là số nguyên",
                      },
                    })}
                    className="form-control"
                    placeholder="Vd: 5"
                  />
                  {errors.amount_discount && (
                    <span className="text-red-500">
                      {errors.amount_discount.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="form-group">
                  <label
                    className="input-label text-capitalize"
                    htmlFor="coupon_quantity"
                  >
                    Số lượng
                  </label>
                  <input
                    type="number"
                    id="coupon_quantity"
                    {...register("coupon_quantity", {
                      required: "Không được bỏ trống",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Phải là số nguyên",
                      },
                    })}
                    className="form-control"
                    placeholder="Vd: 50"
                  />
                  {errors.coupon_quantity && (
                    <span className="text-red-500">
                      {errors.coupon_quantity.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="form-group">
                  <label
                    className="input-label text-capitalize"
                    htmlFor="expiration_date"
                  >
                    Ngày hết hạn
                  </label>
                  <DateTimePicker
                    onChange={onHandleSetExpirationDate}
                    disablePast
                    slotProps={{
                      textField: {
                        color: "warning",
                        focused: true,
                        size: "small",
                      },
                    }}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="description">Mô tả</label>
                  <textarea
                    id="description"
                    {...register("description")}
                    className="form-control resize-none"
                    placeholder="Hãy nhập gì đó..."
                    rows={5}
                  ></textarea>
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
                style={{ backgroundColor: "#fe6767" }}
              >
                {isLoadingCouponAdd ? (
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
  );
};

export default FormAddCoupon;
