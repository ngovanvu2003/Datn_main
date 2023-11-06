import { Link } from "react-router-dom";
import { useGetBranchesQuery } from "../../api/branches";
import { useContext } from "react";
import { AppContext } from "../../context";

const AdminSettingInfo = () => {
  const { data: branches } = useGetBranchesQuery();
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const sendBranhName = useContext(AppContext);
  const onHandleChooseBranch = (e: any) => {
    parsedUser.user.information.branch_id = e.target.value;
    localStorage.setItem("user", JSON.stringify(parsedUser));
    // Gửi name sang header
    const name = branches?.data?.data.filter(
      (item: any) => item.id == e.target.value
    );

    sendBranhName.setBranchName(name[0].name);
  };
  return (
    <>
      <div className="page-header">
        <div className="row align-items-end">
          <div className="col-sm mb-2 mb-sm-0">
            <h1 className="page-header-title">Settings</h1>
          </div>
          <div className="col-sm-auto">
            <Link className="btn btn-primary" to="">
              <i className="tio-home mr-1"></i> Dashboard
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <form
            action=""
            method="post"
            encType="multipart/form-data"
            id="admin-settings-form"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="2j8ykdSKaIB2OD5ytd2pcivOfc0A4gRL7NTi4wFQ"
            />
            <div className="card mb-3 mb-lg-5" id="generalDiv">
              <div className="profile-cover">
                <div className="profile-cover-img-wrapper" />
              </div>
              <label
                className="avatar avatar-xxl avatar-circle avatar-border-lg avatar-uploader profile-cover-avatar"
                htmlFor="avatarUploader"
              >
                <img
                  id="viewer"
                  className="avatar-img"
                  src="https://efood-admin.6amtech.com/public/assets/admin/img/160x160/img1.jpg"
                  alt="Image"
                />
                <input
                  type="file"
                  name="image"
                  className="js-file-attach avatar-uploader-input"
                  id="customFileEg1"
                  accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                />
                <label
                  className="avatar-uploader-trigger"
                  htmlFor="customFileEg1"
                >
                  <i className="tio-edit avatar-uploader-icon shadow-soft" />
                </label>
              </label>
            </div>
            <div className="card mb-3 mb-lg-5">
              <div className="card-header">
                <h2 className="card-title h4">
                  <i className="tio-info" /> Basic information
                </h2>
              </div>
              <div className="card-body">
                <div className="row form-group">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label input-label label-has-tooltip"
                  >
                    Full name{" "}
                    <i
                      className="tio-help-outlined text-body ml-1"
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="Display name"
                    />
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group input-group-sm-down-break">
                      <input
                        type="text"
                        className="form-control"
                        name="f_name"
                        id="firstNameLabel"
                        placeholder="Your first name"
                        aria-label="Your first name"
                        defaultValue="admin"
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="l_name"
                        id="lastNameLabel"
                        placeholder="Your last name"
                        aria-label="Your last name"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row form-group">
                  <label
                    htmlFor="phoneLabel"
                    className="col-sm-3 col-form-label input-label"
                  >
                    Phone{" "}
                    <span className="input-label-secondary">(Optional)</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="js-masked-input form-control"
                      name="phone"
                      id="phoneLabel"
                      placeholder="+x(xxx)xxx-xx-xx"
                      aria-label="+(xxx)xx-xxx-xxxxx"
                      defaultValue={+8801100000000}
                      data-hs-mask-options='{
                                     "template": "+(880)00-000-00000"
                                   }'
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <label
                    htmlFor="newEmailLabel"
                    className="col-sm-3 col-form-label input-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="newEmailLabel"
                      defaultValue="admin@admin.com"
                      placeholder="Enter new email address"
                      aria-label="Enter new email address"
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <label
                    htmlFor="newEmailLabel"
                    className="col-sm-3 col-form-label input-label"
                  >
                    Chi Nhánh
                  </label>
                  <div className="col-sm-9">
                    <select
                      name=""
                      id="branch_id"
                      className="js-masked-input form-control"
                      onChange={onHandleChooseBranch}
                      defaultValue=""
                    >
                      {branches?.data?.data?.map((item: any) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="btn btn-primary"
                    style={{ backgroundColor: "#ff6767" }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div id="passwordDiv" className="card mb-3 mb-lg-5">
            <div className="card-header">
              <h4 className="card-title">
                <i className="tio-lock" /> Change your password
              </h4>
            </div>
            <div className="card-body">
              <form
                id="changePasswordForm"
                action=""
                method="post"
                encType="multipart/form-data"
              >
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="2j8ykdSKaIB2OD5ytd2pcivOfc0A4gRL7NTi4wFQ"
                />
                <div className="row form-group">
                  <label
                    htmlFor="newPassword"
                    className="col-sm-3 col-form-label input-label"
                  >
                    New password
                  </label>
                  <div className="col-sm-9 input-group input-group-merge">
                    <input
                      type="password"
                      name="password"
                      className="js-toggle-password form-control form-control input-field"
                      id="password"
                      placeholder="Enter new password"
                      required
                      data-hs-toggle-password-options='{
                                  "target": "#changePassTarget",
                                  "defaultClass": "tio-hidden-outlined",
                                  "showClass": "tio-visible-outlined",
                                  "classChangeTarget": "#changePassIcon"
                                  }'
                    />
                    <div id="changePassTarget" className="input-group-append">
                      <a className="input-group-text" href="">
                        <i
                          id="changePassIcon"
                          className="mr-3 tio-hidden-outlined"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row form-group">
                  <label
                    htmlFor="confirmNewPasswordLabel"
                    className="col-sm-3 col-form-label input-label"
                  >
                    Confirm password
                  </label>
                  <div className="col-sm-9 input-group input-group-merge">
                    <input
                      type="password"
                      name="confirm_password"
                      className="js-toggle-password form-control form-control input-field"
                      id="confirm_password"
                      placeholder="Confirm your new password"
                      required
                      data-hs-toggle-password-options='{
                                          "target": "#changeConPassTarget",
                                          "defaultClass": "tio-hidden-outlined",
                                          "showClass": "tio-visible-outlined",
                                          "classChangeTarget": "#changeConPassIcon"
                                          }'
                    />
                    <div
                      id="changeConPassTarget"
                      className="input-group-append"
                    >
                      <a className="input-group-text" href="">
                        <i
                          id="changeConPassIcon"
                          className="mr-3 tio-hidden-outlined"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="btn btn-primary"
                    style={{ backgroundColor: "#ff6767" }}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div id="stickyBlockEndPoint" />
        </div>
      </div>
    </>
  );
};

export default AdminSettingInfo;
