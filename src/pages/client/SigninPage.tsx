/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSigninMutation } from "../../api/auth";
import { localStorageSave } from "../../helpers/private-route";
import toast from "react-hot-toast";
import { AuthSignin } from "../../interface/user";
import { useForm } from "react-hook-form";
const SigninPage = () => {
  const [signin] = useSigninMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignin>();
  useEffect(() => {
    const handleToggleClick = (event: MouseEvent) => {
      const element = event.currentTarget as HTMLElement;
      element.classList.toggle("fa-eye");
      element.classList.toggle("fa-eye-slash");
      const dataToggle = element.getAttribute("data-toggle");

      if (dataToggle) {
        const input = document.querySelector<HTMLInputElement>(dataToggle);
        if (input && input.getAttribute("type") === "password") {
          input.setAttribute("type", "text");
        } else if (input) {
          input.setAttribute("type", "password");
        }
      }
    };

    const toggleElements =
      document.querySelectorAll<HTMLElement>(".toggle-password");
    toggleElements.forEach(function (element) {
      element.addEventListener("click", handleToggleClick);
    });

    return () => {
      toggleElements.forEach(function (element) {
        element.removeEventListener("click", handleToggleClick);
      });
    };
  }, []);

  const onSubmit = async (value: AuthSignin) => {
    try {
      const data:any = await signin(value);
      if (data.data) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpwgiaebLy-WxtOtx4O4onYyxZ2uAcFhb_cw&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Ngô Văn Vụ</p>
                  <p className="mt-1 text-sm text-red-500">Xin chào Vụ !</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
        localStorageSave(data.data);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
      if (data.error) {
        const errorMessage = data.error.data.meta.message;
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log("Lỗi hiện tại:", error);
    }
  };
  return (
    <div>
      {/* 02 Main page */}
      <section className="page-section login-page">
        <div className="full-width-screen">
          <div className="container-fluid p-0">
            <div className="content-detail p-0">
              {/* Login form */}
              <form
                className="login-form"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="blobs_1"></div>
                <div className="blobs_2"></div>
                <div className="blobs_5"></div>
                <div className="blobs_6"></div>
                <div className="blobs_7"></div>
                <div className="imgcontainer">
                  <img
                    src="https://efood-admin.6amtech.com/storage/app/public/restaurant/2023-03-08-64096f9b691d3.png"
                    alt="Avatar"
                    className="avatar"
                  />
                </div>
                <div className="input-control">
                  <input
                    type="text"
                    placeholder="Tài khoản"               
                    className={` ${errors.account ? "is-invalid" : ""}`}
                    {...register("account", {
                      required: "Không được bỏ trống tài khoản",
                      validate: (value: string) =>
                        value.trim() !== "" || "Không được chứa dấu cách",
                    })}
                  />
                  <small className="text-danger text-sm">
                    {errors.account && errors.account.message}
                  </small>
                  <span className="password-field-show">
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      className={`password-field input-checkmark ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      {...register("password", {
                        required: "Không được bỏ trống tài khoản",
                        validate: (value: string) =>
                          value.trim() !== "" || "Không được chứa dấu cách",
                      })}
                    />
                    <small className="text-danger text-sm">
                      {errors.password && errors.password.message}
                    </small>
                    <span
                      data-toggle=".password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                    ></span>
                  </span>
                  <label className="label-container">
                    Ghi nhớ
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                  <span className="psw">
                    <Link to="/forgot" className="forgot-btn">
                      Quên mật khẩu ?
                    </Link>
                  </span>
                  <div className="login-btns">
                    <button type="submit">Đăng nhập</button>
                  </div>
                  <div className="division-lines">
                    <p>hoặc đăng nhập bằng</p>
                  </div>
                  <div className="login-with-btns">
                    <button type="button" className="google">
                      <i className="fab fa-google"></i>
                    </button>
                    <button type="button" className="facebook">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button type="button" className="twitter">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button type="button" className="linkedin">
                      <i className="fab fa-linkedin-in"></i>
                    </button>
                    <span className="already-acc">
                      Bạn chưa có tài khoản?{" "}
                      <Link to="/signup" className="signup-btn">
                        Đăng ký
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SigninPage;
