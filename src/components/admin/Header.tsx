import { Link } from "react-router-dom";
import MobileAside from "./MobileAside";
import { Logout } from "../../helpers/private-route";
import NotificationOrder from "../NotificationOrder";
import NotificationPos from "../NotificationPos";

import { useContext } from "react";
import { AppContext } from "../../context";

type Props = {
  toggle: () => void;
  open: boolean;
};
const Header = (props: Props) => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const roleId = parsedUser.user ? parsedUser.user.information.role_id : "";
  const userName = parsedUser.user ? parsedUser.user.information.name : "";
  const emailUser = parsedUser.user ? parsedUser.user.information.email : "";
  const nameBranchContext = useContext(AppContext);

  return (
    <header
      id="header"
      className="z-10 navbar navbar-expand-lg navbar-fixed navbar-height navbar-flush navbar-container navbar-bordered"
    >
      <div className="navbar-nav-wrap">
        <div className="navbar-brand-wrapper">
          <Link className="navbar-brand" to="/admin" aria-label="">
            <img
              className="navbar-brand-logo"
              style={{ objectFit: "contain" }}
              src="/ImagesCLient/Logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="navbar-nav-wrap-content-left d-xl-none">
          <MobileAside />
        </div>
        <div className="navbar-nav-wrap-content-right">
          <ul className="navbar-nav align-items-center flex-row">
            <li className="nav-item d-none d-sm-inline-block">
              <div className="hs-unfold">
                <button
                  type="button"
                  className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                >
                  {roleId == "2" ? <NotificationPos /> : <NotificationOrder />}
                </button>
              </div>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <div className="hs-unfold">
                <a
                  className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                  href=""
                  data-hs-unfold-invoker=""
                >
                  <i className="tio-shopping-cart-outlined" />
                  <span className="btn-status btn-status-c1">0</span>
                </a>
              </div>
            </li>
            <li className="nav-item ml-4">
              <div className="hs-unfold">
                <div
                  className="js-hs-unfold-invoker navbar-dropdown-account-wrapper media gap-2"
                  data-hs-unfold-options='{
                                 "target": "#accountNavbarDropdown",
                                 "type": "css-animation"
                               }'
                  data-hs-unfold-target="#accountNavbarDropdown"
                  data-hs-unfold-invoker=""
                >
                  <button onClick={props.toggle} className="flex gap-3">
                    <div className="media-body d-flex align-items-end flex-column">
                      <span className="card-title h5">{userName}</span>
                      <span className="card-text fz-12 font-weight-bold">
                        {nameBranchContext.branchName
                          ? nameBranchContext.branchName
                          : "Chưa chọn chi nhánh"}
                      </span>
                    </div>
                    <div className="avatar avatar-sm avatar-circle">
                      <img
                        className="avatar-img"
                        src="https://efood-admin.6amtech.com/public/assets/admin/img/160x160/img1.jpg"
                        alt="Image Description"
                      />
                      <span className="avatar-status avatar-sm-status avatar-status-success" />
                    </div>
                  </button>
                </div>
                <div
                  id="accountNavbarDropdown"
                  className={`hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account navbar-dropdown-lg hs-unfold-content-initialized hs-unfold-css-animation animated ${
                    props?.open ? "slideInUp" : "hs-unfold-hidden"
                  }`}
                  data-hs-target-height="185.578"
                  data-hs-unfold-content=""
                  data-hs-unfold-content-animation-in="slideInUp"
                  data-hs-unfold-content-animation-out="fadeOut"
                  style={{ animationDuration: "300ms" }}
                >
                  <div className="dropdown-item-text">
                    <div className="media align-items-center">
                      <div className="avatar avatar-sm avatar-circle mr-2">
                        <img
                          className="avatar-img"
                          src="https://efood-admin.6amtech.com/public/assets/admin/img/160x160/img1.jpg"
                          alt="Image Description"
                        />
                      </div>
                      <div className="media-body">
                        <span className="card-title h5">{userName}</span>
                        <span className="card-text">
                          {emailUser ? emailUser : "Chưa có"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <Link className="dropdown-item" to="/admin/settings">
                    <span className="text-truncate pr-2" title="Settings">
                      Settings
                    </span>
                  </Link>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={Logout}
                  >
                    <span className="text-truncate pr-2" title="Sign out">
                      Sign out
                    </span>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
