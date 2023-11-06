/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  useGetTableByIdQuery,
  useUpdateTableMutation,
} from "../../../api/tables";
import { useGetBranchesQuery } from "../../../api/branches";
import { Loader2, CheckCircle } from "lucide-react";
import { Switch } from "antd";
import { IBranch } from "../../../interface/branch";

const AdminTablesUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [switchState, setSwitchState] = useState(false);
  const { data: branches } = useGetBranchesQuery();
  const { data: table, isSuccess } = useGetTableByIdQuery(id || "");
  const [updateTable, { isLoading: isLoadingTableUpdate }] =
    useUpdateTableMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const statusTable = table?.data.table_status == "0" ? false : true;

  useEffect(() => {
    if (isSuccess) {
      setValue("id", table?.data.id);
      setValue("name", table?.data.name);
      setValue("quantity_chair", table?.data.quantity_chair);
      setValue("description", table?.data.description);
      setValue("branch_id", table?.data.branch_id);
      setValue("table_status", statusTable);
      setSwitchState(statusTable);
    }
  }, [isSuccess, table, setValue]);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchState(checked);
  };

  const onSubmit = (value: any) => {
    try {
      updateTable({
        ...value,
        table_status: switchState ? "1" : "0",
      })
        .unwrap()
        .then(({ meta }: any) => {
          toast.success(meta.message);
          navigate("/admin/tables");
        })
        .catch(({ data }: any) => {
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
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/table.png"
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
                  <div className="hidden col-md-4">
                    <div className="form-group">
                      <label htmlFor="name">
                        Id <span className="text-danger">*</span>
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
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="name">
                        Tên <span className="text-danger">*</span>
                      </label>
                      <input
                        id="name"
                        {...register("name", {
                          required: "Không được bỏ trống",
                        })}
                        className="form-control"
                        placeholder="Ex: Bàn 1"
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
                        {...register("branch_id")}
                        className="custom-select"
                        defaultValue={0}
                      >
                        <option value={0} disabled>
                          --- Chọn chi nhánh ---
                        </option>
                        {branches?.data?.data.map((branch: IBranch) => {
                          return (
                            <option
                              key={branch.id}
                              value={branch.id}
                              defaultChecked={
                                table?.data.branch_id == branch.id
                                  ? true
                                  : false
                              }
                            >
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
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label
                          className="relative input-label"
                          htmlFor="branch_status"
                        >
                          <span>Trạng thái</span>
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
                          defaultChecked={statusTable}
                          checked={switchState}
                          onChange={handleSwitchChange}
                          style={{
                            backgroundColor: `${
                              switchState ? "#ff6767" : "gray"
                            }`,
                          }}
                        />
                      </div>
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

export default AdminTablesUpdate;
