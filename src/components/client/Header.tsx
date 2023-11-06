import { Link } from "react-router-dom";

// type Props = {};

const Header = () => {
  return (
    <div>
      <header
        id="header-1"
        className="header navik-header header-shadow center-menu-1 header-transparent"
      >
        <div className="container">
          <div className="navik-header-container">
            <div className="callusbtn">
              <a href="tel:0793576765">
                <i className="fas fa-phone"></i>
              </a>
            </div>
            <div
              className="logo"
              data-mobile-logo="/ImagesCLient/Logo.png"
              data-sticky-logo="/ImagesCLient/Logo.png"
            >
              <a href="#hero-1">
                <img src="/ImagesCLient/Logo.png" alt="header-logo" />
              </a>
            </div>
            <div className="burger-menu">
              <div className="line-menu line-half first-line"></div>
              <div className="line-menu"></div>
              <div className="line-menu line-half last-line"></div>
            </div>

            <nav className="navik-menu menu-caret navik-yellow">
              <ul className="top-list">
                <li>
                  <a href="/">Trang Chủ</a>
                </li>
                <li>
                  <Link to="/booking">Đặt chỗ</Link>
                </li>
                <li>
                  <a href="/Menu">Menu</a>
                  <ul>
                    <li>
                      <a href="">Buffet 149k</a>
                    </li>
                    <li>
                      <a href="">Buffet 269k</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="/Blog">Blog</a>
                </li>
                <li>
                  <a href="#">Về chúng tôi</a>
                </li>
                <li>
                  <a className="!text-yellow-400" href="">
                    Liên hệ : 0793576765
                  </a>
                </li>
                {/* DROPDOWN User */}
                {/* <li>
                  <a href="#" style={{ color: "#f7be27" }}>
                    Ngô Văn Vụ
                  </a>
                  <ul>
                    <li>
                      <Link to="/infor">Thông tin cá nhân</Link>
                    </li>
                    <li>
                      <a href="menu-2.html">Khuyễn mãi</a>
                    </li>
                    <li>
                      <a href="menu-3.html">Đăng xuất</a>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
