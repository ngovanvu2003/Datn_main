/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState } from 'react'
import {  useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../../../api/categories";

// ... (import phần cần thiết)

const AdminCategoriesUpdate = () => {
  const [updateCategory] = useUpdateCategoryMutation();
  const navigate = useNavigate();
  const [form] = useForm();
  const { id } = useParams<{ id: string }>();
  const [status,setStatus]=useState("0")
  const { data: categoryData } = useGetCategoryByIdQuery(id || "");

  useEffect(() => {
    form.setFieldsValue({ ...categoryData?.data });
    categoryData?.data?.category_status == '0'? "Active" : "Inactive"
    form.setFieldsValue({ category_status: categoryData?.data?.category_status });
    setStatus(categoryData?.data?.category_status)
  }, [categoryData]);

  const onFinish = (values: any) => {
 
    updateCategory({ ...values, id: id ,category_status: status})
      .unwrap()
      .then(() => {
        form.resetFields();
        message.success("Cập nhật danh mục thành công");
        navigate("/admin/categories");
      })
      .catch(() => {
        message.error("Đã xảy ra lỗi khi cập nhật danh mục");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onhashchange= (value:any)=>{    
    setStatus(value.value)
   }

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
          <span className="page-header-title">Cập nhật danh mục</span>
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
          <div className="">
            <div className="border rounded-lg grid grid-cols-3 ">
              <div className=" rounded-lg p-4 ">
              <span className=" text-gray-400 font-normal ">Name category</span>
              <Form.Item
                name="name"
                className="py-2"
                rules={[
                  { required: true, message: "Please input your name!" },
                  { min: 3, message: "Name must be more than 3 characters" }
                ]}
              >
                <Input  
                className="py-2 w-[300px]"
                  placeholder="Name category"
                />
              </Form.Item></div>
              <div className=" rounded-lg p-4 ">
              <span className=" text-gray-400 font-normal ">Price </span>
              <Form.Item
                name="price"
                className="py-2"
                // rules={[
                //   { required: true, message: "Please input your name!" },
                //   { min: 3, message: "Name must be more than 3 characters" }
                // ]}
              >
                <Input
                className="py-2 w-[300px]"
                  placeholder="Price"
                />
              </Form.Item></div>
             <div className=" rounded-lg p-4">
            <span className="pb-2  text-gray-400 font-normal">Status</span>
              <Form.Item
                name="category_status"
                className="py-2"
                rules={[
                  {
                    required: true,
                    message: "Please select the category status!"
                  }
                ]}
              >
                <Select
                  labelInValue
                  defaultValue={categoryData?.data.category_status == "0" ? "Hoạt động": "Không hoạt động "}
                  style={{ width: 120 }}
                  onChange={onhashchange}
                
                  options ={[
                    {
                      value: '0',
                      label: 'Hoạt động',
                    },
                    {
                      value: '1',
                      label: 'Không hoạt động ',
                    },
                  ]}
                />
              </Form.Item>
              </div>
              </div>
          </div>
          <div className="mt-4">
            <Form.Item>
              <div className="flex justify-end gap-2">
                <Button
                  className="pb-5 pt-2 px-4 bg-gray-400 hover:border-gray-400 text-white"
                  htmlType="reset"
                >
                  Reset
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
          </div>
        </Form>
      </div>
    </>
  );
};

export default AdminCategoriesUpdate;
