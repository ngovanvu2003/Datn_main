/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { Navigate, Outlet, useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PrivateRoute = ({ isAuth, isToken }: any) => {
  const navigate = useNavigate();
  // Bắt đầu với giá trị là 3600 giây
  useEffect(() => {
    // Chặn router khi chưa đăng nhập
    if (!isAuth) window.location.href = "/";
    // lấy thời gian đăng nhập
    const user = JSON.parse(localStorage?.getItem("user") as string);
    const timeStart = user?.time_start;
    // kiểm tra thời gian hiện tại và thời gian dự tính hết hạn
    const expiresIn = timeStart + isToken;
    const isTokenExpired = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      return expiresIn <= currentTime;
    };
    // Kiểm tra xem token đã hết hạn hay chưa
    if (isTokenExpired()) {
      localStorage.removeItem("user");
      toast("Hết hạn đăng nhập !", {
        icon: "⌛",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 5000,
      });

      setTimeout(() => {
        window.location.href = "/auth/admin";
      }, 5000);
    } else {
      // Nếu token chưa hết hạn, hẹn giờ để kiểm tra lại sau một khoảng thời gian 1s
      const checkTokenInterval = setInterval(() => {
        if (isTokenExpired()) {
          // Token đã hết hạn, hiển thị thông báo và xóa hẹn giờ
          clearInterval(checkTokenInterval);
          localStorage.removeItem("user");
          toast("Hết hạn đăng nhập !", {
            icon: "⌛",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            duration: 5000,
          });
          setTimeout(() => {
            window.location.href = "/auth/admin";
          }, 5000);
        }
      }, 1000);
    }
  }, [isAuth, isToken, navigate]);

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

// eslint-disable-next-line react-refresh/only-export-components
export const localStorageSave = (user: any) => {
  const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (đơn vị: giây)
  localStorage.setItem(
    "user",
    JSON.stringify({ user, time_start: currentTime })
  );
};

export const Logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};
