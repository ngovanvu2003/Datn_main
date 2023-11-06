/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAddTableMutation } from "../../../api/tables";
import { IBranch } from "../../../interface/branch";
import { useGetBranchesQuery } from "../../../api/branches";
import { useNavigate } from "react-router-dom";

const FormAdd = () => {
  const navigate = useNavigate();
  const { data: branches } = useGetBranchesQuery();
  const [addTable, { isLoading: isLoadingTableAdd }] = useAddTableMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (value: any) => {
    try {
      addTable({
        ...value,
      })
        .unwrap()
        .then(({ meta }) => {
          reset();
          toast.success(meta.message);
          navigate("/admin/tables");
        })
        .catch(({ data }) => {
          const { message } = data.meta;
          if (message && typeof message == "string") toast.error(message);
          if (message.name) message.name.map((err: any) => toast.error(err));
          if (message.quantity_chair)
            message.quantity_chair.map((err: any) => toast.error(err));
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
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="name">
                  Tên bàn <span className="text-danger">*</span>
                </label>
                <input
                  id="name"
                  {...register("name", {
                    required: "Không được bỏ trống",
                  })}
                  className="form-control"
                  placeholder="Vd: Bàn 1"
                />
                {errors.name && (
                  <span className="text-red-500">
                    {errors.name.message as React.ReactNode}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="quantity_chair">
                  Số ghế <span className="text-danger">*</span>
                </label>
                <input
                  id="quantity_chair"
                  type="number"
                  {...register("quantity_chair", {
                    required: "Không được bỏ trống",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phải là số nguyên",
                    },
                  })}
                  className="form-control"
                  placeholder="Vd: 1"
                />
                {errors.quantity_chair && (
                  <span className="text-red-500">
                    {errors.quantity_chair.message as React.ReactNode}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="input-label" htmlFor="branch_id">
                  Chi nhánh <span className="text-danger">*</span>
                </label>
                <select
                  id="branch_id"
                  {...register("branch_id", {
                    required: "Không được bỏ trống",
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
              style={{ backgroundColor: "#fc6a57" }}
            >
              {isLoadingTableAdd ? <Loader2 className="animate-spin" /> : "Gửi"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormAdd;
