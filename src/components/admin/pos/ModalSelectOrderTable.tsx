import { useContext, useEffect, useState } from "react";
import { useGetOrdersOptionQuery } from "../../../api/order";
import { AppContext } from "../../../context";
import { pusher } from "../../../libs/pusher";

const ModalSelectOrderTable = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const roleId = parsedUser.user ? parsedUser.user.information.role_id : "";
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const orderTableContext = useContext(AppContext);
  const { data: order } = useGetOrdersOptionQuery(`?orderBy=id&order_status=0`);
  const [orderTable, setOrderTable] = useState<any[]>([]);

  useEffect(() => {
    setOrderTable(order?.data.data);
  }, [order?.data.data]);

  useEffect(() => {
    const channelGetPos = pusher.subscribe("ToAll");
    channelGetPos.bind(
      `role-${roleId}-${branchId}`,
      function (data: { data: any[] }) {
        data.data.forEach((elementOrValue: any) => {
          setOrderTable((prevData) => [elementOrValue, ...prevData]);
        });
      }
    );
    return () => {
      pusher.unsubscribe("ToAll");
    };
  }, [roleId, branchId]);

  return (
    <div className="modal fade" id="select-order-table">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chọn bàn</h5>
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
            <div className="flex pb-4 px-3">
              <div className="grid grid-cols-2 gap-4 w-screen">
                {orderTable?.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className={`flex justify-center items-center min-w-20 ${
                        item.id == orderTableContext.orderTable?.id
                          ? "bg-[#ff6767]"
                          : "bg-[#e3e3e3]"
                      }  rounded-md cursor-pointer p-1`}
                    >
                      <input type="checkbox" id={item.id} hidden />
                      <label
                        htmlFor={item.id}
                        onClick={() => orderTableContext.setOrderTable(item)}
                        className="flex justify-center items-center py-3 m-0 cursor-pointer"
                      >
                        {item.table_name}:
                        <span className="pl-2 flex flex-col text-xs">
                          <span>{item.username}</span>
                          <span>{item.phone}</span>
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="d-flex justify-content-end">
              <button type="reset" className="btn btn-secondary mr-1">
                Làm lại
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#fc6a57" }}
              >
                Gửi
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectOrderTable;
