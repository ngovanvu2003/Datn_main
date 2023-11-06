/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useSignupMutation } from "../../api/auth";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthSignup } from "../../interface/user";
const SignupPage = () => {
  const [signup] = useSignupMutation();
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthSignup>();
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

  // check
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // dang ky
  const onSubmit = async (value: AuthSignup) => {
    try {
      const password = value.password;
      const confirmPassword = value.confirmPassword;
      if (isChecked === true) {
        if (password === confirmPassword) {
          const data: any = await signup(value);
          if (data.data) {
            toast.success("Bạn đã đăng ký thành công mời bạn đăng nhập !");
            setTimeout(() => {
              window.location.href = "/signin";
            }, 1000);
          }
          if (data.error) {
            const errorMessage = data.error.data.meta.message.phone;
            toast.error(errorMessage);
          }
        } else {
          toast.error("Mật khẩu không giống nhau");
        }
      } else{
        toast.error("Bạn chưa đồng ý chính sách của chúng tôi");
      }
    } catch (error) {
      console.log("Lỗi hiện tại:", error);
    }
  };
  return (
    <div className="form-auth">
      <section className="page-section login-page">
        <div className="full-width-screen">
          <div className="container-fluid p-0">
            <div className="content-detail p-0">
              {/* Signup form */}
              <form
                className="signup-form"
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
                    alt="logo"
                    className="avatar"
                  />
                </div>
                <div className="input-control">
                  <div className="row p-l-5 p-r-5">
                    {/* account */}
                    <div className="col-md-6 p-l-10 p-r-10">
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
                      <small className="text-danger text-xs">
                        {errors.account && errors.account.message}
                      </small>
                    </div>
                    {/* họ tên */}
                    <div className="col-md-6 p-l-10 p-r-10">
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        className={` ${errors.name ? "is-invalid" : ""}`}
                        {...register("name", {
                          required: "Không được bỏ trống họ tên",
                          validate: (value: string) =>
                            value.trim() !== "" || "Không được chứa dấu cách",
                        })}
                      />
                      <small className="text-danger text-xs">
                        {errors.name && errors.name.message}
                      </small>
                    </div>
                    {/*  date_of_birth:Date;*/}
                    <div className="col-md-6 p-l-10 p-r-10">
                      <input
                        type="date" // Sử dụng input type date cho ngày sinh
                        placeholder="Ngày sinh"
                        className={`form-date ${
                          errors.date_of_birth ? "is-invalid" : ""
                        }`}
                        {...register("date_of_birth", {
                          required: "Không được bỏ trống ngày sinh",
                        })}
                      />
                      <small className="text-danger text-xs">
                        {errors.date_of_birth && errors.date_of_birth.message}
                      </small>
                    </div>
                    {/* số điện thoại */}
                    <div className="col-md-6 p-l-10 p-r-10">
                      <input
                        type="number"
                        placeholder="Số điện thoại"
                        className={` ${errors.phone ? "is-invalid" : ""}`}
                        {...register("phone", {
                          required: "Không được bỏ trống email",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Số điện thoại phải không hợp lệ",
                          },
                        })}
                      />
                      <small className="text-danger text-xs">
                        {errors.phone && errors.phone.message}
                      </small>
                    </div>
                    {/* email */}
                    <div className="col-md-12 p-l-10 p-r-10">
                      <input
                        type="text"
                        placeholder="Email"
                        className={` ${errors.email ? "is-invalid" : ""}`}
                        {...register("email", {
                          required: "Không được bỏ trống email",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Địa chỉ email không hợp lệ",
                          },
                        })}
                      />
                      <small className="text-danger text-xs">
                        {errors.email && errors.email.message}
                      </small>
                    </div>
                    {/* Trường nhập mật khẩu và kiểm tra */}
                    <div className="col-md-12 p-l-10 p-r-10">
                      <span className="password-field-show">
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="password"
                              placeholder="Nhập lại mật khẩu"
                              className={`password input-checkmark ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              {...field}
                            />
                          )}
                          rules={{
                            required: "Không được bỏ trống  mật khẩu",
                            validate: (value) => {
                              // Kiểm tra mật khẩu ở đây
                              return (
                                (value.trim() !== "" &&
                                  value.length >= 8 &&
                                  /[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/.test(
                                    value
                                  )) ||
                                "Mật khẩu phải có ít nhất 8 ký tự và một ký tự đặc biệt"
                              );
                            },
                          }}
                        />
                        <span
                          data-toggle=".password"
                          className="fa fa-fw fa-eye field-icon toggle-password"
                        ></span>
                        <small className="text-danger text-xs">
                          {errors.password && errors.password.message}
                        </small>
                      </span>
                    </div>
                    {/* repasss */}
                    <div className="col-md-12 p-l-10 p-r-10">
                      <span className="password-field-show">
                        <input
                          type="password"
                          placeholder="Nhập lại mật khẩu"
                          className={`password-field input-checkmark ${
                            errors.confirmPassword ? "is-invalid" : ""
                          }`}
                          {...register("confirmPassword", {
                            required: "Không được bỏ trống nhập lại mật khẩu",
                            validate: (value: string) =>
                              value.trim() !== "" || "Không được chứa dấu cách",
                          })}
                        />
                        <span
                          data-toggle=".password-field"
                          className="fa fa-fw fa-eye field-icon toggle-password"
                        ></span>
                        <small className="text-danger text-xs">
                          {errors.confirmPassword &&
                            errors.confirmPassword.message}
                        </small>
                      </span>
                    </div>
                  </div>
                  {/* checkbox */}
                  <div>
                    <label className="label-container">
                      Tôi đồng ý với chính sách <a href="#">bảo mật</a>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                    {isChecked && (
                      <div>
                        {/* Hiển thị thông báo khi checkbox được chọn */}
                        <small className="text-danger text-xs">
                          Đã được chọn! Bạn đã đồng ý với chính sách bảo mật.
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="login-btns">
                    <button type="submit">Đăng ký</button>
                  </div>
                  <div className="division-lines">
                    <p>hoặc đăng ký bằng</p>
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
                      Bạn đã có tài khoản?{" "}
                      <button className="login-btn">Đăng nhập</button>
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

export default SignupPage;
