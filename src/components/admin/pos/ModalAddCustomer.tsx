import { useForm } from "react-hook-form";
import { useAddReservationMutation } from "../../../api/reservation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";

const ModalAddCustomer = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [addCustomer, { isLoading }] = useAddReservationMutation();

  const onHandleSubmit = (values: any) => {
    if (values.branch_id != "0") {
      addCustomer({
        username: values.username,
        phone: values.phone,
        branch_id: branchId,
        quantity_person: values.quantity_person,
        meal_time: formattedDate,
      })
        .unwrap()
        .then(({ meta }) => {
          if (meta) {
            toast.success(meta.message);
          }
          reset();
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
    } else {
      toast.error("Không được bỏ trống chi nhánh");
    }
  };
  return (
    <div className="modal fade" id="add-customer">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Thêm khách hàng mới</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onHandleSubmit)} id="customer-form">
              <div className="row pl-2">
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <label className="input-label">
                      Tên khách hàng
                      <span className="input-label-secondary text-danger">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("username", {
                        required: "Tên khách hàng không được bỏ trống",
                      })}
                      className="form-control"
                      placeholder="Vd: Pham Viet Hoang"
                    />
                    {errors.username && (
                      <span className="text-red-500">
                        {errors.username.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <label className="input-label" htmlFor="phone">
                      Số điện thoại
                      <span className="input-label-secondary text-danger">
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      id="phone"
                      {...register("phone", {
                        required: "Số điện thoại không được bỏ trống",
                        pattern: {
                          value: /^0\d{9}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      })}
                      className="form-control"
                      placeholder="Vd: 038017****"
                    />
                    {errors.phone && (
                      <span className="text-red-500">
                        {errors.phone.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row pl-2">
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <label className="input-label">
                      Số người đi
                      <span className="input-label-secondary text-danger">
                        *
                      </span>
                    </label>
                    <input
                      {...register("quantity_person", {
                        required: "Số người đi không được bỏ trống",
                      })}
                      className="form-control"
                      placeholder="Vd: 6"
                    />
                    {errors.quantity_person && (
                      <span className="text-red-500">
                        {errors.quantity_person.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="reset" className="btn btn-secondary mr-1">
                  Làm lại
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#fc6a57" }}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Gửi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCustomer;
