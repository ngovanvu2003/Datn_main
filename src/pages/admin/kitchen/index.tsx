import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useGetMenusQuery,
  useGetMenusRightQuery,
  useUpdateMenuMutation
} from "../../../api/kitchen";
import { IKitchen } from "../../../interface/kitchen";
import moment from "moment";
import { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { pusher } from "../../../libs/pusher";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const AdminKitchen = () => {
  const { data: menusLeft, refetch: refetchMenusLeft }: any = useGetMenusQuery<
    IKitchen[]
  >("?orderable_status=1&orderBy=updated_at");
  const [updateMenu] = useUpdateMenuMutation();
  const [loading, setLoading] = useState(false);
  const [orderGetKitchen, setOrderGetKitchen] = useState<any[]>(
    menusLeft?.data?.data || []
  );
  const { data: menusRight }: any = useGetMenusRightQuery<IKitchen[]>(
    "?orderable_status=2&orderBy=updated_at"
  );
  const [menusData, setmenusData] = useState([]);
  const [menusRightData, setmenusRightData] = useState([]);
  const [MenusDataOption, setMenusDataOption] = useState(menusLeft);
  const [MenusRightDataOption, setMenusRightDataOption] = useState(menusRight);

  useEffect(() => {
    setMenusDataOption(menusLeft);
    setmenusData(menusLeft?.data?.data);
  }, [menusLeft, menusLeft?.data?.data]);
  useEffect(() => {
    setMenusRightDataOption(menusRight);
    setmenusRightData(menusRight?.data?.data);
  }, [menusRight, menusRight?.data?.data]);

  const handlePageChange = (path: string) => {
    axios
      .get(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((response) => {
        setMenusDataOption(response.data);

        setmenusData(response.data?.data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePageChange2 = (path: string) => {
    axios
      .get(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((response) => {
        setMenusRightDataOption(response.data);
        setmenusRightData(response.data?.data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const pollMenusLeft = async () => {
    try {
      await refetchMenusLeft();
    } catch (error) {
      console.error("Error while polling menusLeft", error);
    }
  };

  useEffect(() => {
    const pollInterval = setInterval(() => {
      pollMenusLeft();
    }, 10000);
    return () => {
      clearInterval(pollInterval);
    };
  }, [refetchMenusLeft]);

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const roleId = parsedUser.user ? parsedUser.user.information.role_id : "";
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";
  console.log("roleId",roleId ,"branchId",branchId);
   
  useEffect(() => {
    const channelGetKitchen = pusher.subscribe("ToAll");
    channelGetKitchen.bind(
      `role-${roleId}-${branchId}`,
      function (data: { data: any[] }) {
        data.data.forEach((elementOrValue: any) => {
          console.log(elementOrValue);
          
          setOrderGetKitchen((prevFood) => [elementOrValue, ...prevFood]);
        });
      }
    );
    return () => {
      pusher.unsubscribe("ToAll");
    };
  }, [roleId, branchId]);

  const formatDateTime = (dateTime: any) => {
    return moment(dateTime).format("YYYY-MM-DD HH:mm");
  };

  const getMinutesAgo = (dateTime: any) => {
    const createdTime = moment(dateTime);
    const currentTime = moment();
    const minutesAgo = currentTime.diff(createdTime, "minutes");

    if (minutesAgo < 60) {
      return `${minutesAgo} phút trước`;
    } else if (minutesAgo < 1440) {
      const hoursAgo = Math.floor(minutesAgo / 60);
      return `${hoursAgo} giờ trước`;
    } else {
      const daysAgo = Math.floor(minutesAgo / 1440);
      return `${daysAgo} ngày trước`;
    }
  };

  const handleMoveToRight = async (menu: any) => {
    try {
      await updateMenu({
        ...menu,
        orderableId: menu.id,
        orderable_status: 2
      });
      message.success("Chuyển trạng thái thành công");

      const updatedOrderGetKitchen = orderGetKitchen.filter(
        (item) => item.id !== menu.id
      );
      setOrderGetKitchen(updatedOrderGetKitchen);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [confirmingMenu, setConfirmingMenu] = useState<any>(null);

  const handleConfirmMoveToRight = (menu: any) => {
    setConfirmingMenu(menu);
    setIsConfirmModalVisible(true);
  };

  const handleConfirmModalOk = () => {
    setLoading(true);
    handleMoveToRight(confirmingMenu);
    setTimeout(() => {
      setLoading(false);
      setIsConfirmModalVisible(false);
    }, 1000);
  };

  const handleConfirmModalCancel = () => {
    setIsConfirmModalVisible(false);
  };

  return (
    <div>
      <div className="flex items-center mb-4 gap-2">
        <h2 className="font-bold text-2xl">Quản lý bếp</h2>
        <img
          width="40"
          src="/src/assets/imgs/roasted-chicken-removebg-preview.png"
          alt=""
        />
      </div>
      <div className="grid grid-cols-2 gap-10">
        {/* left */}
        <div className="border-r-2 pr-6">
          <div className="flex justify-between">
            <span className="font-bold ">Chờ chế biến</span>
            <div className="flex gap-4 font-semibold">
              <Link
                to={{}}
                className="underline underline-offset-8 text-orange-500 "
              >
              Danh sách các món ăn
              </Link>
            </div>
          </div>
          {menusData?.map((menu: any) => (
            <div className="my-4 flex justify-between">
              <div>
                <span className="font-bold ">
                  {menu.product_name}({menu.quantity})
                </span>
                <p className="text-xs leading-8">
                  {formatDateTime(menu.created_at)}-Bởi{" "}
                  <span className="uppercase">{menu.username}</span>
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <div>
                  <span className="font-medium">{menu.table_name}</span>
                  <p className="text-xs leading-8">
                    {getMinutesAgo(menu.created_at)}
                  </p>
                </div>
                <div className="space-x-2 py-2">
                  <button
                    className="border-2 border-red-300 bg-red-400 rounded-full px-4 py-2 text-white "
                    onClick={() => handleConfirmMoveToRight(menu)}
                  >
                    <AiOutlineDoubleRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Paginate */}
          <div className="table-responsive mt-4 px-3 ">
            <div className="">
              <nav>
                <ul className="pagination ">
                  {menusData?.length != 0 && (
                    <div className="table-responsive mt-4 px-3">
                      <div className=" justify-content-lg-end">
                        <nav>
                          <ul className="pagination  justify-end">
                            {MenusDataOption?.data?.links?.map(
                              (link: any, index: number) => (
                                <li
                                  key={index}
                                  className={`page-item 
                                    ${link.active ? "active z-0" : ""}
                                    ${
                                      link.url == null
                                        ? "disabled cursor-not-allowed"
                                        : ""
                                    }
                                  `}
                                  aria-current={
                                    link.active ? "page" : undefined
                                  }
                                >
                                  {link.url ? (
                                    <div
                                      className={`page-link ${
                                        !link.active ? "active" : ""
                                      }`}
                                      onClick={() => handlePageChange(link.url)}
                                    >
                                      {link.label == "&laquo; Previous" ? (
                                        <span>‹</span>
                                      ) : link.label == "Next &raquo;" ? (
                                        <span>›</span>
                                      ) : (
                                        <span>{link.label}</span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="page-link">
                                      {link.label == "&laquo; Previous" && (
                                        <span>‹</span>
                                      )}
                                      {link.label == "Next &raquo;" && (
                                        <span>›</span>
                                      )}
                                    </span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* right */}
        <div>
          <div className="flex justify-between  ">
            <span className="font-bold ">Đã xong</span>
          </div>
          {menusRightData?.map((menu: any) => (
            <div className="my-4 flex justify-between" key={menu.id}>
              <div>
                <span className="font-bold">
                  {menu.product_name}({menu.quantity})
                </span>
                <p className="text-xs leading-8">
                  {formatDateTime(menu.created_at)} - Bởi{" "}
                  <span className="uppercase">{menu.username}</span>
                </p>
              </div>
              <div className="flex justify-between gap-12">
                <div>
                  <span className="font-medium">{menu.table_name}</span>
                  <p className="text-xs leading-8">
                    {getMinutesAgo(menu.updated_at)}
                  </p>
                </div>
                <div className="space-x-2 py-2">
                  <button className="border-2  border-green-300 bg-green-400 rounded-full px-4 py-2 text-white ">
                  <FaCheck/>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Paginate */}
          <div className="table-responsive mt-4 px-3">
            <div className="">
              <nav>
                <ul className="pagination">
                  <div className="table-responsive mt-4 px-3">
                    <div className="d-flex justify-content-lg-end">
                      <nav>
                        <ul className="pagination">
                          {MenusRightDataOption?.data?.links?.map(
                            (link: any, index: number) => (
                              <li
                                key={index}
                                className={`page-item 
                                    ${link.active ? "active z-0" : ""}
                                    ${
                                      link.url == null
                                        ? "disabled cursor-not-allowed"
                                        : ""
                                    }
                                  `}
                                aria-current={link.active ? "page" : undefined}
                              >
                                {link.url ? (
                                  <div
                                    className={`page-link ${
                                      !link.active ? "active" : ""
                                    }`}
                                    onClick={() => handlePageChange2(link.url)}
                                  >
                                    {link.label == "&laquo; Previous" ? (
                                      <span>‹</span>
                                    ) : link.label == "Next &raquo;" ? (
                                      <span>›</span>
                                    ) : (
                                      <span>{link.label}</span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="page-link">
                                    {link.label == "&laquo; Previous" && (
                                      <span>‹</span>
                                    )}
                                    {link.label == "Next &raquo;" && (
                                      <span>›</span>
                                    )}
                                  </span>
                                )}
                              </li>
                            )
                          )}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={<h2>Xác nhận chuyển món</h2>}
        visible={isConfirmModalVisible}
        onOk={handleConfirmModalOk}
        confirmLoading={loading}
        onCancel={handleConfirmModalCancel}
        width={400}
        okType="danger"
      >
        <span>
          Bạn có muốn chuyển món này sang{" "}
          <span className="font-bold">Đã xong</span> ?
        </span>
      </Modal>
    </div>
  );
};

export default AdminKitchen;
