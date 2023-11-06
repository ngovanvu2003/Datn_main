/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../api/product";
import { Progress } from "antd";
import { useState } from "react";
// import { useGetCategoriesQuery } from "../../../api/categories";

type FieldType = {
  name?: string;
  price?: string;
  unit?: string;
  image?: string;
  description?: string;
  product_status?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  category_id?: number;
  add_to_stock?: number;
  stock_unit?: string;
};

const AdminProductsAdd = () => {
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();
  const [form] = useForm();

  // const [selectedFile, setSelectedFile] = useState(null);
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";
  const token = `Bearer ${access_token}`;
  const [cdnImage, setCdnImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    // setSelectedFile(file);
    if (file) {
      const formData = new FormData();
      formData.append("image_upload", file);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      };

      setUploading(true); // Bắt đầu upload
      setUploadProgress(0);
      // Đặt phần trăm về 0
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete); // Cập nhật phần trăm
        }
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          // Xử lý phản hồi từ API (nếu cần)
          console.log("Upload successful");
        } else {
          // Xử lý lỗi (nếu có)
          console.error("Upload failed");
        }
        setUploading(false); // Kết thúc upload
      };

      xhr.open("POST", "https://api.firebbq.id.vn/api/upload/image", true);
      xhr.send(formData);
      fetch("https://api.firebbq.id.vn/api/upload/image", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const cdn = data.data.cdn_image;
          setCdnImage(cdn);
          setUploading(false); // Kết thúc upload
        })
        .catch((error) => {
          console.error("error", error);
          setUploading(false); // Kết thúc upload nếu có lỗi
        });
    }
  };

  const onFinish = (values: any) => {
    values.category_id = parseInt(values.category_id, 10);

    addProduct({ ...values, image: cdnImage })
      .unwrap()
      .then(() => {
        form.resetFields();
        message.success("Thêm sản phẩm thành công");
        navigate("/admin/products");
      })
      .catch(() => {
        message.error("Đã xảy ra lỗi khi thêm sản phẩm");
      });
    console.log(values);
  };

  const onFinishFailed = () => {
    // console.log("Failed:", errorInfo);
  };
  const validatePrice = (_: any, value: string) => {
    if (!value) {
      return Promise.reject("Vui lòng nhập giá sản phẩm");
    }
    if (!/^\d+$/.test(value)) {
      return Promise.reject("Giá sản phẩm không hợp lệ");
    }
    const price = parseFloat(value);
    if (price <= 0) {
      return Promise.reject("Giá sản phẩm phải > 0");
    }
    return Promise.resolve();
  };

  const validateUnitWareHouse = (_: any, value: string) => {
    if (!value) {
      return Promise.reject("Vui lòng nhập số lượng");
    }
    const unitWarehouse = parseFloat(value);
    if (isNaN(unitWarehouse) || !/^\d+$/.test(value)) {
      return Promise.reject("Số lượng kho không hợp lệ");
    }
    if (unitWarehouse <= 0) {
      return Promise.reject("Số lượng kho phải > 0");
    }
    return Promise.resolve();
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/product.png"
            alt=""
          />
          <span className="page-header-title">Thêm mới sản phẩm</span>
        </h2>
      </div>
      <div className="">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 29 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="border rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 text-left ">
              <div className=" col-span-2 md:col-span-1">
                <div className=" rounded-lg ml-4 mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <span>Tên </span>
                    <span className="text-danger"> *</span>

                    <Form.Item<FieldType>
                      name="name"
                      className="py-2"
                      rules={[
                        { required: true, message: "Please input your name!" },
                        {
                          min: 3,
                          message: "Name must be more than 3 characters",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Tên sản phẩm"
                        className=" w-[200px]"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <div className="flex items-center ">
                      <span>Giá</span> <span className="text-danger"> *</span>
                    </div>
                    <Form.Item<FieldType>
                      name="price"
                      className="py-2"
                      rules={[
                        { required: true, message: "Please input your price!" },
                        { validator: validatePrice },
                      ]}
                    >
                      <Input className=" w-[200px]" placeholder="Nhập giá" />
                    </Form.Item>
                  </div>
                  <div>
                    <div className="flex items-center ">
                      <span>Số lượng vào kho </span>{" "}
                      <span className="text-danger"> *</span>
                    </div>
                    <Form.Item<FieldType>
                      name="add_to_stock"
                      className="py-2"
                      rules={[
                        { required: true, message: "Please input your price!" },
                        { validator: validateUnitWareHouse },
                      ]}
                    >
                      <Input
                        className=" w-[200px]"
                        placeholder="Nhập số lượng vào kho"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <div className="flex items-center ">
                      <span>Đơn vị vào kho</span>
                      <span className="text-danger"> *</span>
                    </div>
                    <Form.Item
                      name="stock_unit"
                      className="py-2 w-[200px]"
                      rules={[
                        {
                          required: true,
                          message: "Bạn chưa nhập đơn vị vào kho !",
                        },
                      ]}
                    >
                      <Input className=" w-full" placeholder="Vd: Kg" />
                    </Form.Item>
                  </div>
                  <div>
                    <div className="flex items-center ">
                      <span>Đơn vị sản phẩm</span>
                      <span className="text-danger"> *</span>
                    </div>
                    <Form.Item
                      name="unit"
                      className="py-2 w-[200px]"
                      rules={[
                        { required: true, message: "Please select the unit!" },
                      ]}
                    >
                      <Input className=" w-full" placeholder="Vd: Kg" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className=" rounded-lg px-4 pt-4">
                <span className="pb-2">
                  Thêm ảnh <span className="text-[#ED4C78]">( Ratio 1:1 )</span>{" "}
                </span>
                <div className="py-4 bg-[#fff] text-center border rounded-md my-2">
                  {uploading ? (
                    <div>
                      <Progress
                        type="circle"
                        percent={uploadProgress}
                        width={80}
                      />
                      <p>Đang tải lên: {uploadProgress.toFixed(2)}%</p>
                    </div>
                  ) : (
                    <div className="upload-file">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        className="object-cover upload-file__input first-letter:"
                      />
                      <div className="upload-file__img_drag upload-file__img flex justify-center">
                        <img
                          className="object-cover w-[200px] h-[200px]"
                          width="200"
                          srcSet={cdnImage}
                          src="/src/assets/imgs/upload_img.png"
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-2 md:col-span-1"></div>
            </div>
            <div className="  rounded-lg px-4 pb-4">
              <span>Mô tả</span>
              <span className="text-danger"> *</span>
              <Form.Item<FieldType> name="description">
                <Input.TextArea
                  showCount
                  className="h-[250px] my-2"
                  maxLength={200}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <div className="flex gap-2 justify-end ">
              <Button
                className="pb-5 pt-2 px-4 bg-gray-400 hover:border-gray-400 text-white"
                htmlType="reset"
              >
                Resert
              </Button>
              <Button
                className="pb-5 pt-2 px-4 bg-orange-500 text-white"
                danger
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AdminProductsAdd;
