/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Column from "antd/es/table/Column";
import { DateTimeFormat } from "../../../components/DateTimeFormat";
import { useDeleteComboMutation, useGetComboQuery } from "../../../api/combo";
import { Popconfirm, Skeleton, Space, Table, message } from "antd";
import ComboForm from "../../../components/admin/combo/ComboForm";
import { useGetCategoriesQuery } from "../../../api/categories";
const index = () => {
  const { data: combos, isLoading: isLoadingCombos } = useGetComboQuery();
  const [combosData, setCombos] = useState(combos);
  const [categories, setCategories] = useState<any>({});
  const getCategory :any = useGetCategoriesQuery();
  const [deleteCombo] = useDeleteComboMutation();
  
  const [search, setSearch] = useState("");
  useEffect(() => {
    setCombos(combos);
  }, [combos]);
  const user = localStorage.getItem("user");
  const { access_token = "" } = user ? JSON.parse(user) : {};
  const handlePageChange = (path: string) => {
    axios
      .post(`${path}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setCombos(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onHandleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (getCategory.data?.data) {
      const categoryMapping: any = {};
      getCategory.data?.data.forEach((category: any) => {
        categoryMapping[category.id] = category.name;
      });
      setCategories(categoryMapping);
    }
  }, [getCategory.data]);

  const data: any = combosData?.data?.data
    .filter((item: any) => {
      return item?.name.toLowerCase().includes(search.toLowerCase());
    })
    .map((item: any) => ({
      key: item.id,
      ...item,
      categories: categories[item.category_id] || "Unknown",
    }));

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/table.png"
            alt=""
          />
          <span className="page-header-title">Tạo mới</span>
        </h2>
      </div>
      <div className="row g-2">
        <div className="col-12">
          <ComboForm />
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-top px-card pt-4">
              <div className="row justify-content-between align-items-center gy-2">
                <div className="col-sm-4 col-md-6 col-lg-8">
                  <h5 className="d-flex gap-2">
                    Danh sách combo
                    <span className="badge badge-soft-dark rounded-50 fz-12">
                      {combos?.data?.total}
                    </span>
                  </h5>
                </div>
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <div className="input-group z-0">
                    <input
                      id="datatableSearch_"
                      type="search"
                      name="name"
                      className="form-control"
                      placeholder="Tìm kiếm theo tên combo"
                      aria-label="Search"
                      autoComplete="off"
                      onChange={onHandleSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="table-responsive">
                {isLoadingCombos || isLoadingCombos ? (
                  <Skeleton />
                ) : (
                  <Table dataSource={data} pagination={false}>
                    <Column title="Tên combo" dataIndex="name" />
                    <Column title="Giá combo" dataIndex="price" />
                    <Column title="Danh mục" dataIndex="categories" />
                    <Column
                      title="Ngày tạo"
                      dataIndex="created_at"
                      sorter={(a: any, b: any) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                      }
                      render={(record) => <DateTimeFormat value={record} />}
                    />

                    <Column
                      title="Hành động"
                      key="action"
                      render={(record: any) => (
                        <Space size="middle">
                          <Link
                            className=" d-flex justify-content-lg-end btn btn-outline-info btn-sm edit square-btn flex items-center"
                            to={`/admin/combos/${record.id}/update`}
                          >
                            <i className="tio-edit"></i>
                          </Link>
                          <Popconfirm
                            title="Xóa sản phẩm "
                            description="Bạn có chắc muốn xóa không ?"
                            onConfirm={() => {
                              // Thực hiện xóa
                              deleteCombo(record.id)
                                .unwrap()
                                .then(() => {
                                  message.success({
                                    type: "success",
                                    content: "Xóa sản phẩm thành công",
                                  });
                                });
                            }}
                            okText="Có"
                            okButtonProps={{
                              style: {
                                backgroundColor: "orange",
                                color: "white",
                              },
                            }}
                            cancelText="Không"
                            overlayStyle={{ width: "250px" }}
                          >
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm delete square-btn flex items-center"
                            >
                              <i className="tio-delete"></i>
                            </button>
                          </Popconfirm>
                        </Space>
                      )}
                    />
                  </Table>
                )}
              </div>
              <div className="table-responsive mt-4 px-3">
                <div className="d-flex justify-content-lg-end">
                  <nav>
                    <ul className="pagination">
                      {combosData?.data?.links?.map(
                        (link: any, index: number) => (
                          <li
                            key={index}
                            className={`page-item 
                            ${link.active ? "active z-0" : ""}
                            ${
                              link.url == null
                                ? "disabled cursor-not-allowed"
                                : ""
                            }
                          `}
                            aria-current={link.active ? "page" : undefined}
                          >
                            {link.url ? (
                              <div
                                className="page-link"
                                onClick={() => handlePageChange(link.url)}
                              >
                                {link.label == "&laquo; Previous" ? (
                                  <span>‹</span>
                                ) : link.label == "Next &raquo;" ? (
                                  <span>›</span>
                                ) : (
                                  <span>{link.label}</span>
                                )}
                              </div>
                            ) : (
                              <span className="page-link">
                                {link.label == "&laquo; Previous" && (
                                  <span>‹</span>
                                )}
                                {link.label == "Next &raquo;" && <span>›</span>}
                              </span>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
