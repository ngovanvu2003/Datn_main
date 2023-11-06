/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { useGetCategoriesQuery } from "../../../api/categories";
import { useAddComboMutation } from "../../../api/combo";
const ComboForm = () => {
  const { data: categories } = useGetCategoriesQuery();
  console.log(categories);

  const [AddCombo, { isLoading: isLoadingCombo }] = useAddComboMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (value: any) => {
    try {
      AddCombo({
        ...value,
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
                <label htmlFor="name">
                  Tên Combo <span className="text-danger">*</span>
                </label>
                <input
                  id="name"
                  {...register("name", {
                    required: "Không được bỏ trống tên combo",
                  })}
                  className="form-control"
                  placeholder="Vd: combo 149k"
                />
                {errors.name && (
                  <span className="text-red-500">
                    {errors.name.message as React.ReactNode}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="input-label" htmlFor="category_id">
                  Danh mục <span className="text-danger">*</span>
                </label>
                <select
                  id="category_id"
                  {...register("category_id", {
                    required: "Không được bỏ trống danh mục",
                  })}
                  className="custom-select"
                  defaultValue=""
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories?.data.map((item: any) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {errors.category_id && (
                  <span className="text-red-500">
                    {errors.category_id.message as React.ReactNode}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="price">
                  Giá <span className="text-danger">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  {...register("price", {
                    required: "Không được bỏ trống số giá",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phải là số nguyên",
                    },
                  })}
                  className="form-control"
                  placeholder="Vd: 1"
                />
                {errors.price && (
                  <span className="text-red-500">
                    {errors.price.message as React.ReactNode}
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
              {isLoadingCombo ? <Loader2 className="animate-spin" /> : "Thêm"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ComboForm;
