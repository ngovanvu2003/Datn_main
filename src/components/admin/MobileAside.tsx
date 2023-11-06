import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetOrdersQuery } from "../../api/order";

interface MenuItem {
  title: string;
  icon?: string;
  link?: string;
  badge?: number | string;
  isActive?: boolean;
  isSubtitle?: boolean;
  isCollapsed?: boolean;
  subItems?: SubMenuItem[];
}
interface SubMenuItem {
  title: string;
  link: string;
  badge?: number | string;
  isActive?: boolean;
}
const MobileAside = () => {
  const location = useLocation();
  const { data: orders } = useGetOrdersQuery();

  const orderPeding = orders?.data?.data.filter(
    (order: any) => order.order_status == 0
  );
  const orderPaid = orders?.data?.data.filter(
    (order: any) => order.order_status != 0
  );
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [roleId, setRoleId] = useState<any>(0);
  useEffect(() => {
    const updatedMenuItems = menuItems.map((item) => {
      if (item.link) {
        item.isActive = item.link === location.pathname;
      }
      return item;
    });
    updatedMenuItems.forEach((item) => {
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (subItem.link) {
            subItem.isActive = subItem.link === location.pathname;
          }
        });
      }
    });
    setMenuItems(updatedMenuItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, setMenuItems]);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : {};
    const role = parsedUser.user ? parsedUser.user.information.role_id : "";
    setRoleId(role);
    if (role == 1) {
      setMenuItems([
        {
          title: "Thống kê",
          icon: "tio-home-vs-1-outlined nav-icon",
          link: "/admin/dashboard",
          isActive: location.pathname === "/admin",
        },
        {
          title: "Báo cáo & Thống kê",
          isSubtitle: true,
        },
        {
          title: "Doanh thu",
          icon: "tio-chart-pie-1 nav-icon",
          link: "/admin/statistics/revenue",
          isActive: location.pathname === "/admin/statistics/revenue",
        },
        {
          title: "Sản phẩm",
          icon: "tio-chart-bubble nav-icon",
          link: "/admin/statistics/product",
          isActive: location.pathname === "/admin/statistics/product",
        },
        {
          title: "Đặt chỗ",
          icon: "tio-chart-donut-2 nav-icon",
          link: "/admin/statistics/reservation",
          isActive: location.pathname === "/admin/statistics/reservation",
        },
        {
          title: "Đơn hàng",
          icon: "tio-chart-bar-2 nav-icon",
          link: "/admin/statistics/order",
          isActive: location.pathname === "/admin/statistics/order",
        },
        {
          title: "Máy POS ",
          isSubtitle: true,
        },
        {
          title: "POS",
          icon: "tio-shopping nav-icon",
          isCollapsed: true,

          link: "/admin/pos",
          isActive: location.pathname === "/admin/pos",
        },
        {
          title: "Tạo đơn",
          icon: "tio-shopping-basket-add nav-icon",
          badge: "Booking",
          link: "/admin/apply",
          isActive: location.pathname === "/admin/apply",
        },
        {
          title: "Lên Món",
          icon: "tio-unarchive nav-icon",
          link: "/admin/orders-detail/all",
          isActive: location.pathname === "/admin/orders-detail/all",
        },
        {
          title: "Đặt chỗ",
          icon: "tio-event nav-icon",
          link: "/admin/reservation/list",
          isActive: location.pathname === "/admin/reservation/list",
        },
        {
          title: "Quản lý đơn hàng",
          isSubtitle: true,
        },
        {
          title: "Đơn Hàng",
          icon: "tio-shopping-cart nav-icon",
          badge: "Booking",
          isCollapsed: true,
          subItems: [
            {
              title: "Tất cả",
              link: "/admin/orders/all",
              badge: orders?.data?.total,
              isActive: location.pathname === "/admin/orders",
            },
            {
              title: "Đang xử lý",
              link: "/admin/orders/pending",
              badge: orderPeding?.length,
              isActive: location.pathname === "/admin/orders/pending",
            },
            {
              title: "Đã thanh toán",
              link: "/admin/orders/paid",
              badge: orderPaid?.length,
              isActive: location.pathname === "/admin/orders/paid",
            },
          ],
        },
        {
          title: "Quản lý kho",
          isSubtitle: true,
        },
        {
          title: "Nhà kho",
          icon: "tio-inboxes nav-icon",
          badge: "kitchen",
          link: "/admin/warehouse/list",
          isActive: location.pathname === "/admin/warehouse",
        },
        {
          title: "Quản lý bếp",
          isSubtitle: true,
        },
        {
          title: "Nhà bếp",
          icon: "tio-meal-outlined nav-icon",
          badge: "kitchen",
          link: "/admin/kitchen/list",
          isActive: location.pathname === "/admin/kitchen",
        },
        {
          title: "Quản lý sản phẩm",
          isSubtitle: true,
        },
        {
          title: "Danh mục",
          icon: "tio-category nav-icon",
          link: "/admin/categories/list",
          isActive: location.pathname === "/admin/categories",
        },
        {
          title: "Combo",
          icon: "tio-fastfood nav-icon",
          isCollapsed: true,
          subItems: [
            {
              title: "Tất cả",
              link: "/admin/combo/list",
              isActive: location.pathname === "/admin/combo/list",
            },
            {
              title: "Món ăn",
              link: "/admin/combo/add-product",
              isActive: location.pathname === "/admin/combo/add-product",
            },
          ],
        },
        {
          title: "Sản phẩm",
          icon: "tio-pizza-outlined nav-icon",
          isCollapsed: true,
          badge: "Products",
          subItems: [
            {
              title: "Thêm sản phẩm",
              link: "/admin/products/add",
              isActive: location.pathname === "/admin/products/add",
            },
            {
              title: "Tất cả ",
              link: "/admin/products/list",
              isActive: location.pathname === "/admin/products",
            },
          ],
        },
        {
          title: "Quản lý bàn",
          isSubtitle: true,
        },
        {
          title: "Bàn",
          icon: "tio-table nav-icon",
          badge: "Table",
          isCollapsed: true,
          subItems: [
            {
              title: "Tất cả bàn",
              link: "/admin/tables/list",
              isActive: location.pathname === "/admin/tables",
            },
            {
              title: "Khả dụng",
              link: "/admin/tables/availability",
              isActive: location.pathname === "/admin/tables/availability",
            },
          ],
        },
        {
          title: "Quản lý chi nhánh",
          isSubtitle: true,
        },
        {
          title: "Chi nhánh",
          icon: "tio-shop-outlined nav-icon",
          badge: "branch",
          isCollapsed: true,
          subItems: [
            {
              title: "Tất cả chi nhánh",
              link: "/admin/branches/list",
              isActive: location.pathname === "/admin/branches",
            },
            {
              title: "Thêm chi nhánh",
              link: "/admin/branches/add",
              isActive: location.pathname === "/admin/branches/add",
            },
          ],
        },
        {
          title: "Quản lý người dùng",
          isSubtitle: true,
        },
        {
          title: "Người dùng",
          icon: "tio-group-equal nav-icon",
          link: "/admin/customers/list",
          isActive: location.pathname === "/admin/customers",
          isCollapsed: true,
        },
        {
          title: "Vai trò",
          icon: "tio-lock-outlined nav-icon",
          link: "/admin/roles/list",
          isActive: location.pathname === "/admin/roles",
        },
        {
          title: "Khác",
          isSubtitle: true,
        },
        {
          title: "Tin tức",
          icon: "tio-feed nav-icon",
          link: "/admin/news/list",
          isActive: location.pathname === "/admin/news",
        },
        {
          title: "Phiếu giảm giá",
          icon: "tio-gift nav-icon",
          link: "/admin/coupons/list",
          isActive: location.pathname === "/admin/coupons",
        },
        {
          title: "Nhận xét",
          icon: "tio-star-half nav-icon",
          link: "/admin/feedback",
          isActive: location.pathname === "/admin/feedback",
        },
      ]);
    } else if (role == 2) {
      setMenuItems([
        {
          title: "Máy POS ",
          isSubtitle: true,
        },
        {
          title: "POS",
          icon: "tio-shopping nav-icon",
          isCollapsed: true,

          link: "/admin/pos",
          isActive: location.pathname === "/admin/pos",
        },
        {
          title: "Tạo đơn",
          icon: "tio-shopping-basket-add nav-icon",
          badge: "Booking",
          link: "/admin/apply",
          isActive: location.pathname === "/admin/apply",
        },
        {
          title: "Lên Món",
          icon: "tio-unarchive nav-icon",
          link: "/admin/orders-detail/all",
          isActive: location.pathname === "/admin/orders-detail/all",
        },
        {
          title: "Đặt chỗ",
          icon: "tio-event nav-icon",
          link: "/admin/reservation/list",
          isActive: location.pathname === "/admin/reservation/list",
        },
        {
          title: "Quản lý đơn hàng",
          isSubtitle: true,
        },
        {
          title: "Đơn Hàng",
          icon: "tio-shopping-cart nav-icon",
          badge: "Booking",
          isCollapsed: true,
          subItems: [
            {
              title: "Tất cả",
              link: "/admin/orders/all",
              badge: orders?.data?.total,
              isActive: location.pathname === "/admin/orders",
            },
            {
              title: "Đang xử lý",
              link: "/admin/orders/pending",
              badge: orderPeding?.length,
              isActive: location.pathname === "/admin/orders/pending",
            },
            {
              title: "Đã thanh toán",
              link: "/admin/orders/paid",
              badge: orderPaid?.length,
              isActive: location.pathname === "/admin/orders/paid",
            },
          ],
        },
        {
          title: "Quản lý bàn",
          isSubtitle: true,
        },
        {
          title: "Bàn",
          icon: "tio-table nav-icon",
          badge: "Table",
          isCollapsed: true,
          subItems: [
            {
              title: "Tất cả bàn",
              link: "/admin/tables/list",
              isActive: location.pathname === "/admin/tables",
            },
            {
              title: "Khả dụng",
              link: "/admin/tables/availability",
              isActive: location.pathname === "/admin/tables/availability",
            },
          ],
        },
      ]);
    } else if (role == 3) {
      setMenuItems([
        {
          title: "Quản lý bếp",
          isSubtitle: true,
        },
        {
          title: "Nhà bếp",
          icon: "tio-meal-outlined nav-icon",
          badge: "kitchen",
          link: "/admin/kitchen/list",
          isActive: location.pathname === "/admin/kitchen",
        },
        {
          title: "Quản lý kho",
          isSubtitle: true,
        },
        {
          title: "Nhà kho",
          icon: "tio-inboxes nav-icon",
          badge: "warehouse",
          link: "/admin/warehouse/list",
          isActive: location.pathname === "/admin/warehouse",
        },
      ]);
    }
  }, [roleId]);
  const [open, setOpen] = useState<boolean>(false);
  const handleCollapseToggle = (index: number) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].isCollapsed = !updatedMenuItems[index].isCollapsed;
    setMenuItems(updatedMenuItems);
    console.log(updatedMenuItems);
  };

  useEffect(() => {
    // Hàm kiểm tra kích thước màn hình và cập nhật trạng thái 'open' tùy thuộc vào kích thước
    const checkScreenSize = () => {
      if (window.innerWidth > 1199) {
        setOpen(false);
      }
    };
    // Gọi hàm kiểm tra khi component được render
    checkScreenSize();

    // Đăng ký event listener để theo dõi sự thay đổi kích thước màn hình
    window.addEventListener("resize", checkScreenSize);
    // Loại bỏ event listener khi component bị hủy
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <aside style={{ zIndex: 9999 }}>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <i
          className="tio-last-page navbar-vertical-aside-toggle-full-align collapsed"
          data-template='<div class="tooltip d-none d-sm-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
          data-toggle="tooltip"
          data-placement="right"
          title=""
          data-original-title="Expand"
        />
      </button>
      {/* mobile aside */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="z-50 overflow-y-auto" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white py-6 shadow-xl ">
                      <div className="relative  mt-6 flex-1 px-4 sm:px-6 ">
                        {/* Content */}
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900"></Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Đóng</span>
                              <i
                                className="tio-first-page navbar-vertical-aside-toggle-short-align"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <nav className="flex flex-1 flex-col overflow-y-scroll pb-5 h-[75%]">
                          <ul
                            role="list"
                            className=" flex flex-1 flex-col px-4 "
                          >
                            {menuItems.map((item, index) => (
                              <li
                                key={index}
                                className={`navbar-vertical-aside-has-menu ${
                                  item.isActive ? "active" : ""
                                }`}
                              >
                                {item.isSubtitle ? (
                                  <small className="nav-subtitle">
                                    {item.title}
                                  </small>
                                ) : (
                                  <React.Fragment>
                                    {item.subItems ? (
                                      <a
                                        className="nav-link js-navbar-vertical-aside-menu-link  nav-link-toggle "
                                        onClick={() =>
                                          handleCollapseToggle(index)
                                        }
                                      >
                                        {item.icon && (
                                          <i className={item.icon}></i>
                                        )}
                                        <span className=" px-2 navbar-vertical-aside-mini-mode-hidden-elements cursor-pointer text-truncate">
                                          {item.title}
                                        </span>
                                        {item.badge && (
                                          <label className="badge badge-danger">
                                            {item.badge}
                                          </label>
                                        )}
                                        <span
                                          className={`tio-chevron-${
                                            item.isCollapsed ? "right" : "down"
                                          }`}
                                        ></span>
                                      </a>
                                    ) : (
                                      <Link
                                        className={`js-navbar-vertical-aside-menu-link nav-link ${
                                          item.isActive ? "active" : ""
                                        }`}
                                        to={item.link || ""}
                                        title={item.title}
                                      >
                                        {item.icon && (
                                          <i className={item.icon}></i>
                                        )}
                                        <span className="px-2 text-truncate">
                                          {item.title}
                                        </span>
                                        {item.badge && (
                                          <span className="badge badge-soft-info badge-pill ml-1">
                                            {item.badge}
                                          </span>
                                        )}
                                      </Link>
                                    )}

                                    {item.subItems && !item.isCollapsed && (
                                      <ul className=" navbar-nav navbar-nav-lg nav-tabs">
                                        {item.subItems.map(
                                          (subItem, subIndex) => (
                                            <li
                                              key={subIndex}
                                              className={`nav-item ${
                                                subItem.isActive ? "active" : ""
                                              }`}
                                            >
                                              <Link
                                                className={`js-navbar-vertical-aside-menu-link nav-link nav-link docs-creator ${
                                                  subItem.isActive
                                                    ? "active"
                                                    : ""
                                                }`}
                                                to={subItem.link}
                                                title={subItem.title}
                                              >
                                                <span className="tio-circle nav-indicator-icon"></span>

                                                <span className="px-2 text-truncate">
                                                  {subItem.title}
                                                </span>
                                                {subItem.badge && (
                                                  <span className="badge badge-soft-info badge-pill ml-1">
                                                    {subItem.badge}
                                                  </span>
                                                )}
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                  </React.Fragment>
                                )}
                              </li>
                            ))}
                            <li className="nav-item pt-10">
                              <div className=""></div>
                            </li>
                          </ul>
                        </nav>

                        {/* content end */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
          <div />
        </Dialog>
      </Transition.Root>
    </aside>
  );
};

export default MobileAside;
