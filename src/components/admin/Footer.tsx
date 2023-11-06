const Footer = () => {
  return (
    <div className="footer">
      <div className="row justify-content-between align-items-center gy-2">
        <div className="col-md-4">
          <p className="font-size-sm mb-0 text-center text-md-left">
            FireBBQ @ 2023
          </p>
        </div>
        <div className="col-md-8">
          <ul className="list-inline-menu justify-content-center justify-content-md-end">
            <li>
              <a href="https://efood-admin.6amtech.com/admin/business-settings/restaurant/restaurant-setup">
                <span>Business Setup</span>
                <img
                  width="12"
                  className="avatar-img rounded-0"
                  src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/business_setup.png"
                  alt="Image Description"
                />
              </a>
            </li>
            <li>
              <a href="https://efood-admin.6amtech.com/admin/settings">
                <span>Profile</span>
                <img
                  width="12"
                  className="avatar-img rounded-0"
                  src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/profile.png"
                  alt="Image Description"
                />
              </a>
            </li>
            <li>
              <a href="https://efood-admin.6amtech.com/admin">
                <span>Home</span>
                <img
                  width="12"
                  className="avatar-img rounded-0"
                  src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/home.png"
                  alt="Image Description"
                />
              </a>
            </li>
            <li>
              <label className="badge badge-soft-c1 font-weight-bold fz-12 mb-0">
                Software Version : 10.0
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
