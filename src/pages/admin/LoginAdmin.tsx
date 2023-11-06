/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../api/auth";
import { AuthSignin } from "../../interface/user";
import { localStorageSave } from "../../helpers/private-route";
import { Loader2 } from "lucide-react";

const LoginAdmin = () => {
  const [signin, { isLoading: isLoadingSignin }] = useSigninMutation();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignin>();
  // xem mật khẩu
  useEffect(() => {
    const handleToggleClick = (event: MouseEvent) => {
      const element = event.currentTarget as HTMLElement;
      element.classList.toggle("tio-hidden-outlined");
      element.classList.toggle("tio-visible-outlined");
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

  // đăng nhập
  const onSubmit = async (value: AuthSignin) => {
    try {
      const data: any = await signin(value);
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
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {data.data.information.name}
                  </p>
                  <p className="mt-1 text-sm text-red-500">
                    Xin chào {data.data.information.name} !
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Đóng
              </button>
            </div>
          </div>
        ));
        localStorageSave(data.data);
        setTimeout(() => {
          if (data.data.information.role_id == 1) {
            window.location.href = "/admin";
          } else if (data.data.information.role_id == 2) {
            window.location.href = "/admin/pos";
          } else if (data.data.information.role_id == 3) {
            window.location.href = "/admin/kitchen/list";
          }
        }, 1000);
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
    <main id="content" role="main" className="main">
      <div className="auth-wrapper">
        <div className="auth-wrapper-left">
          <div className="auth-left-cont">
            <img width="310" src="/Images - Copy/Logo.png" alt="Logo" />
            <h2 className="title">
              <span className="d-block text-capitalize"> </span>{" "}
              <strong className="text--039D55 c1 text-capitalize">
                Quản trị viên
              </strong>
            </h2>
          </div>
        </div>

        <div className="auth-wrapper-right">
          <div className="auth-wrapper-form">
            <form
              className=""
              id="form-id"
              action="https://efood-admin.6amtech.com/admin/auth/login"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="auth-header">
                <div className="mb-5">
                  <h2 className="title">Đăng nhập</h2>
                  <div className="text-capitalize">Welcome back</div>
                  <p className="mb-0 text-capitalize">
                    Muốn quay về trang chủ ?<a href="/">Quay về</a>
                  </p>
                  <span className="badge mt-2">
                    ( Admin or employee sign in )
                  </span>
                </div>
              </div>
              <div className="js-form-message form-group">
                <label
                  className="input-label text-capitalize"
                  htmlFor="signinSrEmail"
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    errors.account ? "is-invalid" : ""
                  }`}
                  id="signinSrEmail"
                  {...register("account", {
                    required: "Không được bỏ trống tài khoản",
                    validate: (value) =>
                      value.trim() !== "" || "Không được chứa dấu cách",
                  })}
                />
                <small className="text-danger text-sm">
                  {errors.account && errors.account.message}
                </small>
              </div>
              <div className="js-form-message form-group">
                <label className="input-label" htmlFor="signupSrPassword">
                  <span className="d-flex justify-content-between align-items-center">
                    Mật khẩu
                  </span>
                </label>
                <div className="input-group input-group-merge">
                  <input
                    type="password"
                    className={`js-toggle-password form-control form-control-lg password-field input-checkmark ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="signinSrEmail"
                    {...register("password", {
                      required: "Không được bỏ trống tài khoản",
                      validate: (value) =>
                        value.trim() !== "" || "Không được chứa dấu cách",
                    })}
                  />

                  <div id="changePassTarget" className="input-group-append">
                    <a className="input-group-text">
                      <i
                        data-toggle=".password-field"
                        className="tio-hidden-outlined field-icon toggle-password"
                      ></i>
                    </a>
                  </div>
                </div>
                <small className="text-danger text-sm ">
                  {errors.account && errors.account.message}
                </small>
              </div>

              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="termsCheckbox"
                    name="remember"
                  />
                  <label
                    className="custom-control-label text-muted"
                    htmlFor="termsCheckbox"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <br />
              <button
                type="submit"
                className="flex justify-center items-center btn btn-lg btn-block btn-primary text-red-500"
                disabled={isLoadingSignin}
              >
                {isLoadingSignin ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </form>
            <div className="border-top border-primary pt-3 mt-5">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="text-left">
                  <span>Account : admin</span>
                  <br />
                  <span>Password : 1</span>
                </div>
                <div>
                  <button className="btn btn-primary px-3">
                    <i className="tio-copy"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginAdmin;
