import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAddReservationMutation } from "../../../api/reservation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../../../context";
import { formatDate, formatDateTime } from "../../../helpers/formatDate";

const BookingFinished = () => {
  const bookingContext = useContext(AppContext);
  console.log(bookingContext)
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [addCustomer, { isLoading }] = useAddReservationMutation();

  const onHandleSubmit = (values: any) => {
    const date =
      bookingContext.mealDateValue !== ""
        ? formatDate(bookingContext.mealDateValue)
        : formatDate(new Date());
    const time = bookingContext.mealtimeValue;
    const mealtime = date + " " + time;
    if (bookingContext.branchId == "") {
      toast.error("Bạn chưa chọn chi nhánh");
    } else if (bookingContext.mealtimeValue == "") {
      toast.error("Bạn chưa chọn giờ đặt bàn");
    } else if (mealtime < formatDateTime(new Date())) {
      toast.error("Thời gian đặt bàn không được chọn thời điểm trong quá khứ");
    } else {
      addCustomer({
        ...values,
        branch_id: bookingContext.branchId,
        meal_time: mealtime,
      })
        .unwrap()
        .then(({ meta }) => {
          if (meta) {
            toast.success(meta.message);
          }
          reset();
          onCancel();
          navigate("/booking");
        })
        .catch(({ data }) => {
          const { message } = data.meta;
          if (message && typeof message == "string") toast.error(message);
          if (message.branch_id)
            message.branch_id.map((err: any) => toast.error(err));
          if (message.mealtime)
            message.mealtime.map((err: any) => toast.error(err));
          if (message.quantity_person)
            message.quantity_person.map((err: any) => toast.error(err));
          if (message.phone) message.phone.map((err: any) => toast.error(err));
        });
    }
  };

  const onCancel = () => {
    bookingContext.setBranchId("");
    bookingContext.setMealDateValue("");
    bookingContext.setMealtimeValue("");
    bookingContext.setBookingInfo({
      username: "",
      email: "",
      quantity_person: "",
      phone: "",
      note: "",
    })
  };

  return (
    <div>
      <form
        className="row booking-form"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <div className="col-lg-6">
          {errors.username && (
            <span className="text-red-500 text-base font-semibold shadow-inherit drop-shadow-sm">
              {errors.username.message as React.ReactNode}
            </span>
          )}
          <input
            type="text"
            {...register("username", {
              required: "Tên khách hàng không được bỏ trống",
            })}
            onChange={(e) =>
              bookingContext.setBookingInfo({
                ...bookingContext.bookingInfo,
                username: e.target.value,
              })
            }
            value={bookingContext.bookingInfo.username}
            className="form-control"
            placeholder="Tên khách hàng*"
          />
        </div>
        <div className="col-lg-6">
          {errors.email && (
            <span className="text-red-500 text-base font-semibold shadow-inherit drop-shadow-sm">
              {errors.email.message as React.ReactNode}
            </span>
          )}
          <input
            type="text"
            {...register("email", {
              required: "Email không được bỏ trống",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Email không đúng định dạng",
              },
            })}
            onChange={(e) =>
              bookingContext.setBookingInfo({
                ...bookingContext.bookingInfo,
                email: e.target.value,
              })
            }
            value={bookingContext.bookingInfo.email}
            className="form-control"
            placeholder="Email*"
          />
        </div>
        <div className="col-lg-6">
          {errors.quantity_person && (
            <span className="text-red-500 text-base font-semibold shadow-inherit drop-shadow-sm">
              {errors.quantity_person.message as React.ReactNode}
            </span>
          )}
          <input
            type="number"
            {...register("quantity_person", {
              required: "Số người đi không được bỏ trống",
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Số người đi phải là số nguyên dương",
              },
            })}
            onChange={(e) =>
              bookingContext.setBookingInfo({
                ...bookingContext.bookingInfo,
                quantity_person: e.target.value,
              })
            }
            value={bookingContext.bookingInfo.quantity_person}
            className="form-control"
            placeholder="Số người đi*"
          />
        </div>

        <div className="col-lg-6">
          {errors.phone && (
            <span className="text-red-500 text-base font-semibold shadow-inherit drop-shadow-sm">
              {errors.phone.message as React.ReactNode}
            </span>
          )}
          <input
            type="tel"
            {...register("phone", {
              required: "Số điện thoại không được bỏ trống",
              pattern: {
                value: /^0\d{9}$/,
                message: "Số điện thoại không hợp lệ",
              },
            })}
            onChange={(e) =>
              bookingContext.setBookingInfo({
                ...bookingContext.bookingInfo,
                phone: e.target.value,
              })
            }
            value={bookingContext.bookingInfo.phone}
            className="form-control"
            placeholder="Số điện thoại*"
          />
        </div>
        <div className="col-md-12">
          <textarea
            {...register("note")}
            className="form-control"
            aria-rowcount={4}
            placeholder="Ghi chú ..."
            onChange={(e) =>
              bookingContext.setBookingInfo({
                ...bookingContext.bookingInfo,
                note: e.target.value,
              })
            }
            value={bookingContext.bookingInfo.note}
          />
        </div>
        <div className="col-md-12 mt-10 flex gap-3">
          <Link to="/booking/mealtime">
            <button
              type="submit"
              className="btn btn-md btn-red tra-red-hover submit"
            >
              Quay lại
            </button>
          </Link>
          <button
            type="submit"
            className="btn btn-md btn-red tra-red-hover submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Đặt bàn"}
          </button>
        </div>
        <div className="col-md-12 booking-form-msg text-center">
          <div className="sending-msg">
            <span className="loading"></span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingFinished;
