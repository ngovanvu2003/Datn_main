/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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

const Aside = () => {
  const { data: orders } = useGetOrdersQuery();

  const orderPeding = orders?.data?.data.filter(
    (order: any) => order.order_status == 0
  );
  const orderPaid = orders?.data?.data.filter(
    (order: any) => order.order_status != 0
  );

  const location = useLocation();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [roleId, setRoleId] = useState<any>(0);
  useEffect(() => {
    const updatedMenuItems = menuItems?.map((item: any) => {
      if (item.link) {
        item.isActive = item.link === location.pathname;
      }
      return item;
    });
    updatedMenuItems.forEach((item: any) => {
      if (item.subItems) {
        item.subItems.forEach((subItem: any) => {
          if (subItem.link) {
            subItem.isActive = subItem.link === location.pathname;
          }
        });
      }
    });
    setMenuItems(updatedMenuItems);
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

  const handleCollapseToggle = (index: number) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].isCollapsed = !updatedMenuItems[index].isCollapsed;
    setMenuItems(updatedMenuItems);
  };

  return (
    <aside className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered default navbar-vertical-aside-initialized">
      <div className="navbar-vertical-container text-capitalize">
        <div className="navbar-vertical-footer-offset">
          <div className="navbar-brand-wrapper justify-content-between">
            <Link className="navbar-brand" to="/admin" aria-label="Front">
              <img
                className="navbar-brand-logo"
                style={{ objectFit: "contain" }}
                src="/Images - Copy/Logo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="navbar-vertical-content">
            <div className="sidebar--search-form py-3">
              <div className="search--form-group">
                <button type="button" className="btn">
                  <i className="tio-search" />
                </button>
                <input
                  type="text"
                  className="js-form-search form-control form--control"
                  id="search-bar-input"
                  placeholder="Tìm kiếm ..."
                />
              </div>
            </div>
            {/* link menu */}
            <ul className="navbar-nav navbar-nav-lg nav-tabs">
              {menuItems?.map((item: any, index: any) => (
                <li
                  key={index}
                  className={`navbar-vertical-aside-has-menu ${
                    item.isActive ? "active" : ""
                  }`}
                >
                  {item?.isSubtitle ? (
                    <small className="nav-subtitle">{item.title}</small>
                  ) : (
                    <React.Fragment>
                      {item.subItems ? (
                        <div
                          className="js-navbar-vertical-aside-menu-link nav-link  docs-creator"
                          onClick={() => handleCollapseToggle(index)}
                        >
                          {item.icon && <i className={item.icon}></i>}
                          <span className="navbar-vertical-aside-mini-mode-hidden-elements cursor-pointer text-truncate">
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
                        </div>
                      ) : (
                        <Link
                          className={`js-navbar-vertical-aside-menu-link nav-link ${
                            item.isActive ? "active" : ""
                          }`}
                          to={item.link || ""}
                          title={item.title}
                        >
                          {item.icon && <i className={item.icon}></i>}
                          <span className="text-truncate">{item.title}</span>
                          {item.badge && (
                            <span className="badge badge-soft-info badge-pill ml-1">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                      {item.subItems && !item.isCollapsed && (
                        <ul className={`navbar-nav navbar-nav-lg nav-tabs`}>
                          {item?.subItems?.map(
                            (subItem: any, subIndex: any) => (
                              <li
                                key={subIndex}
                                className={`nav-item ${
                                  subItem.isActive ? "active" : ""
                                }`}
                              >
                                <Link
                                  className={`js-navbar-vertical-aside-menu-link nav-link nav-link docs-creator ${
                                    subItem.isActive ? "active" : ""
                                  }`}
                                  to={subItem.link}
                                  title={subItem.title}
                                >
                                  <span className="tio-circle nav-indicator-icon"></span>
                                  <span className="text-truncate sidebar--badge-container">
                                    <span className="text-truncate">
                                      {subItem.title}
                                    </span>
                                    {subItem.badge && (
                                      <span className="badge badge-soft-info badge-pill ml-1">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </span>
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
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
