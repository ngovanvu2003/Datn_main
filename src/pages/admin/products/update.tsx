/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message, Progress, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation
} from "../../../api/product";
import { useEffect, useState } from "react";

import { useGetCategoriesQuery } from "../../../api/categories";
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
};
const AdminProductsUpdate = () => {
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const [form] = useForm();
  const { id } = useParams<{ id: string }>();
  const dataCate = useGetCategoriesQuery();
  const { data: productData } = useGetProductByIdQuery(id || "");

  const [status, setStatus] = useState("0");
  const [cdnImage, setCdnImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newImageUploaded, setNewImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const access_token = parsedUser.user ? parsedUser.user.access_token : "";
  const token = `Bearer ${access_token}`;
  useEffect(() => {
    form.setFieldsValue({ ...productData?.data });
    productData?.data?.product_status == "0" ? "Active" : "Inactive";
    form.setFieldsValue({ product_status: productData?.data?.product_status });
    setStatus(productData?.data?.product_status);
  }, [productData]);

  const onhashchange = (value: any) => {
    setStatus(value.value);
  };

  const onFinish = (values: any) => {
    values.categories_id = parseInt(values.categories_id, 10);
    values.image = newImageUploaded ? cdnImage : productData?.data?.image;
    updateProduct({ ...values, id: id, product_status: status })
      .unwrap()
      .then(() => {
        form.resetFields();
        message.success("Cập nhật sản phẩm thành công");
        navigate("/admin/products");
      })
      .catch(() => {
        message.error("Đã xảy ra lỗi khi thêm sản phẩm");
      });
    console.log(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const formData = new FormData();
      formData.append("image_upload", file);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: token
        },
        body: formData
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
          setNewImageUploaded(true);
          setUploading(false);
        })
        .catch((error) => {
          console.error("error", error);
          setUploading(false);
        });
    }
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
          <span className="page-header-title">Cập nhật sản phẩm</span>
        </h2>
      </div>

      <Form
        className=""
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 29 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="border rounded-lg p-4 ">
          <div className="grid grid-cols-2 gap-8">
            <div className="">
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <span>Name</span>
                  <span className="text-danger"> *</span>
                  <Form.Item<FieldType>
                    name="name"
                    className="my-2"
                    rules={[
                      { required: true, message: "Please input your name!" },
                      { min: 3, message: "Name must be more than 3 characters" }
                    ]}
                  >
                    <Input placeholder="Name Product" className="py-2 w-full" />
                  </Form.Item>
                </div>

                <div className="">
                  <div className="flex items-center pb-2 ">
                    <span>Price</span>
                    <span className="text-danger"> *</span>
                  </div>
                  <Form.Item<FieldType>
                    name="price"
                    rules={[
                      { required: true, message: "Please input your price!" },
                      { validator: validatePrice }
                    ]}
                  >
                    <Input className="py-2 w-full" />
                  </Form.Item>
                </div>
                <div className="  ">
                  <span>Status</span>
                  <span className="text-danger"> *</span>
                  <Form.Item
                    name="product_status"
                    className="my-2"
                    rules={[
                      {
                        required: true,
                        message: "Please select the product status!"
                      }
                    ]}
                  >
                    <Select
                      labelInValue
                      defaultValue={
                        productData?.data.product_status == "0"
                          ? "Hoạt động"
                          : "Không hoạt động "
                      }
                      style={{ width: 180 }}
                      onChange={onhashchange}
                      options={[
                        {
                          value: "0",
                          label: "Hoạt động"
                        },
                        {
                          value: "1",
                          label: "Không hoạt động "
                        }
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center pb-2">
                      <span>Unit</span>
                      <span className="text-danger"> *</span>
                    </div>
                    <Form.Item
                      name="unit"
                      rules={[
                        { required: true, message: "Please select the unit!" }
                      ]}
                    >
                       <Input className=" w-full" placeholder="Vd: Kg" />
                    </Form.Item>
                  </div>
                  {/* <div className="  ">
                    <div className="flex  items-center ">
                      <span>Category</span>
                      <span className="text-danger"> *</span>
                    </div>
                    <Form.Item
                      name="category_id"
                      className="py-2"
                     
                    >
                      <Select>
                        {dataCate.data?.data?.map((category) => (
                          <Select.Option key={category.id}>
                            {category.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <div className=" rounded-lg ">
                <span className="pb-2">
                  Product Image{" "}
                  <span className="text-[#ED4C78]">( Ratio 1:1 )</span>{" "}
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
                        className="upload-file__input first-letter:"
                      />
                      <div className="upload-file__img_drag upload-file__img flex justify-center w-[200px] h-[200px] object-cover m-auto  ">
                        <img
                          width="200"
                          srcSet={cdnImage || productData?.data?.image}
                          src="/src/assets/imgs/upload_img.png"
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" mb-4 ">
            <span>Description</span>
            <span className="text-danger"> *</span>
            <Form.Item<FieldType>
              className="py-2"
              name="description"
           
            >
              <Input.TextArea showCount className="h-[200px]" maxLength={100} />
            </Form.Item>
          </div>
        </div>
        <Form.Item className="flex justify-end  mt-4">
          <div className="flex gap-2">
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
    </>
  );
};

export default AdminProductsUpdate;
