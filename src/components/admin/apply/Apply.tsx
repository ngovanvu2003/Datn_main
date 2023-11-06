/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetBranchesQuery } from "../../../api/branches";
import { useForm } from "react-hook-form";
import { IBranch } from "../../../interface/branch";
import { useState } from "react";
import { useGetTablesQuery, useUpdateTableMutation } from "../../../api/tables";
import { format } from "date-fns";

import { useAddReservationMutation } from "../../../api/reservation";
import toast from "react-hot-toast";
import { useAddOrderMutation } from "../../../api/order";
import AddIfAny from "./AddIfAny";
import { useGetComboQuery } from "../../../api/combo";
import { Spin } from "antd";

/* eslint-disable @typescript-eslint/no-unused-vars */
const Apply = () => {
  const [tables, setTables] = useState([]);
  const { data: tableDatas } = useGetTablesQuery();
  const { data: branches } = useGetBranchesQuery();

  const { data: combo } = useGetComboQuery();
  const [addReservations] = useAddReservationMutation();
  const [addOrder] = useAddOrderMutation();
  const [currentDate] = useState(new Date());
  const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
  const [updateTable]: any = useUpdateTableMutation();
  //addifAny
  const [idReservations, setIdReservations] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [arryDataCombo, setArryDataCombo] = useState<any>([]);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const onHandleChange = (e: any) => {
    const branch_id = e.target.value;
    setTables(
      tableDatas?.data.data.filter(
        (item: any) => item.branch_id == branch_id && item.table_status != "1"
      )
    );
  };

  const handleChildButtonClick = (data: any) => {
    setValue("phone", data.phone);
    setValue("username", data.username);
    setValue("branch_id", data.branch_id);
    setValue("quantity_person", data.quantity_person);
    setValue("table_id", data.table_id);
    setTables(
      tableDatas?.data.data.filter(
        (item: any) =>
          item.branch_id == data.branch_id && item.table_status != "1"
      )
    );
    setIdReservations(data.id);
  };

  const handleComboChange = (event: any) => {
    const selectedValue = event.target.value;
    const nameCombo = combo?.data?.data?.filter(
      (item: any) => item.id == selectedValue
    );
    console.log(nameCombo);

    setArryDataCombo([
      ...arryDataCombo,
      { id: selectedValue, name: `${nameCombo[0].name}`, tag: "combo" },
    ]);
  };

  const handleRemoveImage = (index: any) => {
    const newImages = [...arryDataCombo];
    newImages.splice(index, 1);
    setArryDataCombo(newImages);
  };

  const onSubmit = (value: any) => {
    setLoading(true);
    try {
      if (idReservations) {
        addOrder({
          reservation_id: idReservations,
          table_id: value.table_id,
          item_id: arryDataCombo,
        })
          .unwrap()

          .then((response: any) => {
            updateTable({
              id: response.data.table_id,
              table_status: "1",
            });
            toast.success(response.meta.message);
            setArryDataCombo([]);
            reset();
            setLoading(false);
            reset();
            setLoading(false);
          })

          .catch(({ data }) => {
            console.log(data);

            const { message } = data.meta;
            if (message && typeof message == "string") toast.error(message);
            if (message.id) message.id.map((err: any) => toast.error(err));
          });
      } else {
        addReservations({
          username: value.username,
          branch_id: value.branch_id,
          phone: value.phone,
          quantity_person: value.quantity_person,
          reservation_status: 1,
          meal_time: formattedDate,
        })
          .unwrap()
          .then(({ data }: any) => {
            const idTable = value.table_id;
            const reservation_id = data.id;
            updateTable({
              id: idTable,
              table_status: "1",
            });
            addOrder({
              reservation_id: reservation_id,
              table_id: idTable,
              item_id: [{ id: value.item_id, tag: "combo" }],
            })
              .unwrap()
              .then(({ meta }: any) => {
                toast.success(meta.message);
                setArryDataCombo([]);
                reset();
                setLoading(false);
              })
              .catch(({ data }) => {
                const { message } = data.meta;
                if (message && typeof message == "string") toast.error(message);
                if (message.id) message.id.map((err: any) => toast.error(err));
              });
          });
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    }
  };
  return (
    <div>
      <Spin spinning={loading} size="large">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card">
            <div className="card-body">
              <div className="row">
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
                          value: /^[0-9]+$/,
                          message: "Phải là số nguyên",
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
                    <label className="input-label" htmlFor="branch_id">
                      Chi nhánh <span className="text-danger"> *</span>
                    </label>
                    <select
                      id="branch_id"
                      {...register("branch_id", {
                        required: "Không được bỏ trống chi nhánh",
                      })}
                      className="custom-select"
                      defaultValue=""
                      onChange={onHandleChange}
                      disabled={idReservations}
                    >
                      <option value="" disabled>
                        -- Chọn chi nhánh --
                      </option>
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
                    <label htmlFor="quantity_person">
                      Combo <span className="text-danger">*</span>
                    </label>
                    <select
                      className="custom-select"
                      defaultValue=""
                      {...register("item_id", {
                        required: "Không được bỏ trống combo",
                      })}
                      onChange={handleComboChange}
                    >
                      <option value="" disabled>
                        Chọn có combo !
                      </option>
                      {combo?.data?.data?.map((item: IBranch) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="quantity_person">
                      Bàn <span className="text-danger">*</span>
                    </label>
                    <select
                      className="custom-select"
                      defaultValue=""
                      {...register("table_id", {
                        required: "Không được bỏ trống bàn",
                      })}
                    >
                      {tables.length === 0 && (
                        <option value="">Không có bàn !</option>
                      )}
                      {tables?.map((table: IBranch) => {
                        return (
                          <option key={table.id} value={table.id}>
                            {table.name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.table_id && (
                      <span className="text-red-500">
                        {errors.table_id.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="form-group ">
                    <label htmlFor="quantity_person">
                      Combo đã chọn <span className="text-danger">*</span>
                    </label>
                    <div className="flex flex-wrap border rounded ">
                      {arryDataCombo?.map((item: any, index: any) => {
                        return (
                          <>
                            <div
                              key={item}
                              className="flex rounded-sm  items-center text-center border-2 bg-[#e7eaf3]  text-sm font-semibold pl-1 pr-1 m-2"
                            >
                              <div className="text-[#677788]">{item.name}</div>
                              <span
                                onClick={() => handleRemoveImage(index)}
                                className="cursor-pointer text-base font-black text-[#71869d] pl-2 pr-2 hover:text-black"
                              >
                                ×
                              </span>
                            </div>
                          </>
                        );
                      })}
                      <div className="m-2 ">
                        {arryDataCombo == "" ? "Chưa chọn combo !" : ""}
                      </div>
                    </div>
                    {errors.item_id && (
                      <span className="text-red-500">
                        {errors.item_id.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* user nếu có */}
              <AddIfAny onChildButtonClick={handleChildButtonClick} />
              {/* ---------------------------------------------------------------- */}
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3 gap-3">
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
              {"Thêm"}
            </button>
          </div>
        </form>
      </Spin>
    </div>
  );
};

export default Apply;
