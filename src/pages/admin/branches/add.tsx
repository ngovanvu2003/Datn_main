import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAddBranchMutation } from "../../../api/branches";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const AdminBranchesAdd = () => {
  const navigate = useNavigate();
  const [addBranch, { isLoading }] = useAddBranchMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (value: any) => {
    try {
      addBranch({
        ...value,
      })
        .unwrap()
        .then(({ meta }) => {
          toast.success(meta.message);
          navigate("/admin/branches");
        })
        .catch(({ data }) => {
          const { message } = data.meta;
          if (message && typeof message == "string") toast.error(message);
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
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/branch.png"
            alt="Branch Icon"
          />
          <span className="page-header-title">Thêm mới chi nhánh</span>
        </h2>
      </div>
      <div className="row g-2">
        <div className="col-12">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0 d-flex gap-2 align-items-center">
                  <i className="tio-user"></i>
                   Thông tin chi nhánh
                </h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="input-label" htmlFor="name">
                        Tên
                      </label>
                      <input
                        id="name"
                        {...register("name", {
                          required: "Không được bỏ trống",
                        })}
                        className="form-control"
                        placeholder="Vd: Chi Nhánh 1"
                      />
                      {errors.name && (
                        <span className="text-red-500">
                          {errors.name.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="input-label" htmlFor="street">
                        Đường/phố
                      </label>
                      <input
                        id="street"
                        {...register("street", {
                          required: "Không được bỏ trống",
                        })}
                        className="form-control"
                        placeholder="Vd: Cầu Diễn"
                      />
                      {errors.street && (
                        <span className="text-red-500">
                          {errors.street.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="input-label" htmlFor="district">
                        Quận/huyện
                      </label>
                      <input
                        id="district"
                        {...register("district", {
                          required: "Không được bỏ trống",
                        })}
                        className="form-control"
                        placeholder="Vd: Nam Từ Liêm"
                      />
                      {errors.district && (
                        <span className="text-red-500">
                          {errors.district.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="input-label" htmlFor="city">
                        Thành phố
                      </label>
                      <input
                        id="city"
                        {...register("city", {
                          required: "Không được bỏ trống",
                        })}
                        className="form-control"
                        placeholder="Vd: Hà Nội"
                      />
                      {errors.city && (
                        <span className="text-red-500">
                          {errors.city.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="input-label" htmlFor="address_details">
                        Địa chỉ chi tiết
                      </label>
                      <input
                        id="address_details"
                        {...register("address_details", {
                          required: "Không được bỏ trống",
                        })}
                        className="form-control"
                        placeholder="Vd: Số 10, ngõ 99"
                      />
                      {errors.address_details && (
                        <span className="text-red-500">
                          {errors.address_details.message as React.ReactNode}
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
                    className="btn btn-primary flex justify-center items-center"
                    disabled={isLoading}
                    style={{ backgroundColor: "#fc6a57" }}
                  >
                    {isLoading ? (
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

export default AdminBranchesAdd;
