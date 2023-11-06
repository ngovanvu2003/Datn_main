/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBranchByIdQuery,
  useUpdateBranchMutation,
} from "../../../api/branches";
import { toast } from "react-hot-toast";
import { Loader2, CheckCircle } from "lucide-react";
import { Switch } from "antd";

const AdminBranchesUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: branch, isSuccess } = useGetBranchByIdQuery(id || "");
  const [switchState, setSwitchState] = useState(false);

  const [updateBranch, { isLoading }] = useUpdateBranchMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const statusBranch = branch?.data.branch_status == "1" ? true : false;

  useEffect(() => {
    if (isSuccess) {
      setValue("id", branch?.data.id);
      setValue("name", branch?.data.name);
      setValue("street", branch?.data.street);
      setValue("district", branch?.data.district);
      setValue("city", branch?.data.city);
      setValue("address_details", branch?.data.address_details);
      setSwitchState(statusBranch);
    }
  }, [isSuccess, branch, setValue, statusBranch]);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchState(checked);
  };

  const onSubmit = (value: any) => {
    try {
      updateBranch({
        ...value,
        branch_status: switchState ? "1" : "0",
      })
        .unwrap()
        .then(({ meta }) => {
          toast.success(meta.message);
          reset();
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
          <span className="page-header-title">Cập nhật chi nhánh</span>
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
                  <div className="hidden col-lg-6">
                    <div className="form-group">
                      <label className="input-label" htmlFor="name">
                        Id
                      </label>
                      <input
                        id="id"
                        {...register("id", {
                          required: "Không được bỏ trống",
                        })}
                        className="form-control"
                      />
                      {errors.id && (
                        <span className="text-red-500">
                          {errors.id.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
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
                        placeholder="Vd: Cau Dien"
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
                        placeholder="Vd: Nam Tu Liem"
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
                        placeholder="Vd: Số 11, Cầu Diễn"
                      />
                      {errors.address_details && (
                        <span className="text-red-500">
                          {errors.address_details.message as React.ReactNode}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label
                        className="relative input-label"
                        htmlFor="branch_status"
                      >
                        Trạng thái
                        {switchState ? (
                          <span className="absolute top-1 pl-10">
                            <CheckCircle size={15} color="green" />
                          </span>
                        ) : (
                          <span className="absolute top-1 pl-10">
                            <CheckCircle size={15} color="gray" />
                          </span>
                        )}
                      </label>
                      <Switch
                        defaultChecked={statusBranch}
                        checked={switchState}
                        onChange={handleSwitchChange}
                        style={{ backgroundColor: `${switchState ? "#ff6767" : "gray"}` }}
                      />
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
                    {isLoading ? <Loader2 className="animate-spin" /> : "Gửi"}
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

export default AdminBranchesUpdate;
