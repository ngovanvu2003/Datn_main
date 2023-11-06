import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { pusher } from "../libs/pusher";
// import { FormattedTime } from "react-intl";
import { useGetOrderDetailsOptionQuery } from "../api/order-detail";
import { DateTimeFormat } from "./DateTimeFormat";

const NotificationPos = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const roleId = parsedUser.user ? parsedUser.user.information.role_id : "";
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const { data: orderPosDetailApi } = useGetOrderDetailsOptionQuery(
    "?orderBy=updated_at"
  );
  const [orderPosDetailData, setOrderPosDetailData] = useState<any[]>([]);

  useEffect(() => {
    setOrderPosDetailData(orderPosDetailApi?.data.data);
  }, [orderPosDetailApi]);

  useEffect(() => {
    const channelGetPos = pusher.subscribe("CustomerToPos");
    channelGetPos.bind(
      `role-${roleId}-${branchId}`,
      function (data: { data: any[] }) {
        data.data.forEach((elementOrValue: any) => {
          setOrderPosDetailData((prevFood) => [elementOrValue, ...prevFood]);
        });
      }
    );
    return () => {
      pusher.unsubscribe("CustomerToPos");
    };
  }, [roleId, branchId]);

  useEffect(() => {
    const channelGetKitchen = pusher.subscribe("ToAll");
    channelGetKitchen.bind(
      `role-${roleId}-${branchId}`,
      function (data: { data: any[] }) {
        data.data.forEach((elementOrValue: any) => {
          setOrderPosDetailData((prevFood) => [elementOrValue, ...prevFood]);
        });
      }
    );
    return () => {
      pusher.unsubscribe("ToAll");
    };
  }, [roleId, branchId]);

  return (
    <div className="fixed top-2 px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle`}
            >
              <i className="tio-notifications-outlined relative text-lg" />
              {orderPosDetailData?.length != 0 && (
                <span className="absolute top-2 right-2 rounded-full bg-[#ff6767] text-xs w-2 h-2"></span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute w-[450px] z-50 mt-2 -translate-x-1/2 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative gap-8 bg-white px-2 overflow-y-auto h-[300px]">
                    <span className="flex items-center text-sm font-medium text-gray-900 pt-4 pb-2 px-3">
                      Thông báo
                    </span>
                    {orderPosDetailData?.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col mb-2 items-start rounded-lg p-2 transition duration-150 ease-in-out  hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="relative px-2 w-full flex justify-between">
                          <p className="flex flex-col gap-1 text-sm text-gray-900 capitalize">
                            {item.table_name}:{" "}
                            {(() => {
                              switch (item.orderable_status) {
                                case "-2":
                                  return "Đơn đã bị huỷ";
                                case "-1":
                                  return "Bếp đã trả đơn";
                                case "1":
                                  return "Nhà bếp đã nhận đơn";
                                case "2":
                                  return "Bếp đã làm xong";
                                default:
                                  return "Có đơn gọi món";
                              }
                            })()}
                            <span className="flex justify-start items-center gap-3">
                              <img
                                src={item?.image}
                                alt=""
                                className="rounded-full w-6 h-6"
                              />
                              <span className="flex flex-col items-start">
                                <p className="text-xs text-gray-900 capitalize">
                                  {item.product_name}
                                </p>
                                <p className="text-xs text-gray-900 capitalize">
                                  x{item.quantity}
                                </p>
                              </span>
                            </span>
                          </p>
                          <span className="absolute bottom-0 right-0 text-xs">
                            {/* <FormattedTime value={item.updated_at} /> */}
                            {item.updated_at && (
                              <DateTimeFormat value={item.updated_at} isBreak />
                            )}
                          </span>
                          <span className="absolute -top-0 right-0 w-2 h-2 rounded-full bg-[#ff6767]"></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default NotificationPos;
