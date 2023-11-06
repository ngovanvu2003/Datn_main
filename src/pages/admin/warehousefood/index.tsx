    import { Image, Modal, Table, Tag, message } from "antd";
    import { useEffect, useState } from "react";
    import { AiOutlineShop } from "react-icons/ai";
    import { Link } from "react-router-dom";
    import { useGetStocksQuery, useUpdateStockMutation } from "../../../api/stock";
    import { IStock } from "../../../interface/stock";
    import { useGetProductsQuery } from "../../../api/product";
    import { ExclamationCircleFilled } from "@ant-design/icons";
import moment from "moment";
    const AdminWareHouse = () => {
        const { data: stock, refetch: refetchStock }: any = useGetStocksQuery<IStock[]>();
        const { data: products }: any = useGetProductsQuery();
        const [productList, setProductList] = useState<any[]>([]);
        const [loading, setLoading] = useState(false);
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [selectedStock, setSelectedStock] = useState<IStock | null>(null);
        const [updateStock] = useUpdateStockMutation()
        const [searchKeyword, setSearchKeyword] = useState("");
        useEffect(() => {
            // Kiểm tra xem stock và products đã có dữ liệu chưa
            if (stock && stock.data && stock.data.data && products && products.data && products.data.data) {
                // Lưu danh sách sản phẩm vào state
                setProductList(products.data.data);
            }
        }, [stock, products]);


        const dataSource = stock?.data?.data?.map((stock: IStock) => ({
            key: stock.id,
            ...stock,
          }))
          .filter((stock: IStock) => {
            return (  
              stock.product_name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
          })
        
          

         const handleConfirmStatusChange = (values:any) => {
            setLoading(true);
            if (selectedStock) {      
                const newStockStatus = selectedStock.stock_status == "1" ? "0" : "1";
                updateStock({
                  ...values,
                  product_id:selectedStock.product_id,
                  stock_status:newStockStatus
                })
                
                  .unwrap()
                  .then(() => {
                    setLoading(false);
                    message.success("Cập nhật trạng thái thành công");
                    refetchStock(); 
                    setIsModalVisible(false);
                    
                  })
                  .catch(() => {
                    setLoading(false);
                    message.error("Đã xảy ra lỗi khi cập nhật sản phẩm");
                    setIsModalVisible(false);
                  });
              }
          };
          const handleStatusChange = (stock: IStock) => {
            setSelectedStock(stock);        
            setIsModalVisible(true);
          };
          const handleCancelStatusChange = () => {
            setSelectedStock(null);
            setIsModalVisible(false);
          };
        const columns = [
            {
                title: "Name",
                dataIndex: "product_name",
                key: "product_name"
            },
              {
      title: "Hình ảnh",
      dataIndex: "product_image",
      render: (image: string) => (
        <Image
          src={image}
          width={50}
          height={50}
          style={{ objectFit: "cover" }}
          className="rounded-md"
        />
      )
    },
    {
        title: "Giá",
        dataIndex: "product_price",
        key: "product_price"
    },  
    {
        title: "Số lượng ",
        dataIndex: "in_stock",
        key: "in_stock",
        render: (text: any, record: any) => (
          <span>
            {text} {record.unit}  {record.out_stock}
          </span>
        ),
      },
      {
        title: "Xuất kho ",
        dataIndex: "out_stock",
        key: "out_stock",
        render: (text: any, record: any) => (
          <span>
             {text === null ? "0" : text} {record.unit}
          </span>
        ),
      },
           
            {
                title: "Ngày tạo",
                dataIndex: "created_at",
                key: "created_at",
                sorter: (a:any, b:any) => {
                  if (a.created_at && b.created_at) {
                    return (
                      moment(b.created_at, "DD/MM/YYYY ").unix() -
                      moment(a.created_at, "DD/MM/YYYY").unix()
                    );
                  } else {
                    return 0;
                  }
                },
                sortDirections: ["descend", "ascend"]
              },
              {
                title: "Ngày cập nhật",
                dataIndex: "updated_at",
                key: "updated_at"
            },
            {
                title: "Trạng thái",
                dataIndex: "stock_status",
                key: "stock_status",
                render: (text: string) => {
                    const status = parseInt(text, 10); 
                    const statusText = status === 1 ? "Còn hàng" : "Sắp hết hàng";
                    const tagColor = status === 1 ? "green" : "red";
            
                    return <Tag color={tagColor}>{statusText}</Tag>;
                }
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text: string, record: IStock) => (
                    <div className="space-x-2 flex">
                        <Link
                            className="btn btn-outline-info btn-sm edit square-btn flex items-center"
                            to={``}
                        >
                            <AiOutlineShop />
                        </Link>
                        <Link
                            className="btn btn-outline-info btn-sm edit square-btn flex items-center"
                            to={`/admin/warehouse/list`}
                            onClick={() => handleStatusChange(record)}
                        >
                            <i className="tio-edit"></i>
                        </Link>
                    </div>
                )
            }
        ];

        return (
            <div className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table  ">
                <h2 className="h1  d-flex align-items-center gap-2 mb-4">
                    <img
                        width="20"
                        className="avatar-img"
                        src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/product.png"
                        alt=""
                    />
                    <span className="page-header-title">Quản lý kho</span>
                </h2>
                <div className="card">
                    <div className="flex justify-between p-4 ">
                        <Link to={`/admin/products/add`} className="btn btn-primary flex items-center ">
                           Nhập kho<i className="tio-add"></i>
                        </Link>
                        <div className="">
                            <form>
                                <div className="input-group z-0">
                                    <input
                                        id="datatableSearch_"
                                        type="search"
                                        name="search"
                                        className="form-control"
                                        placeholder="Search by product name"
                                        aria-label="Search"
                                        autoComplete="off"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            style={{ backgroundColor: "#fc6a57" }}
                                        >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Table dataSource={dataSource} columns={columns} />
                </div>
                <Modal
        title={
          <div className="d-flex align-items-center">
            <ExclamationCircleFilled
              style={{ fontSize: "24px", color: "orange", marginRight: "10px" }}
            />
            <span style={{ fontSize: "18px" }}>Cảnh báo</span>
          </div>
        }
        visible={isModalVisible}
        onOk={()=>handleConfirmStatusChange(stock)}
        onCancel={handleCancelStatusChange}
        confirmLoading={loading}
        width={400}
        okButtonProps={{ style: { backgroundColor: "orange", color: "white" } }}
      >
        <span>
        Bạn có chắc muốn thay đổi trạng thái thành{" "} <strong>{selectedStock?.stock_status === 'Hết hàng' ? 'Còn hàng' : 'Hết hàng'}?</strong>
        </span>
      </Modal>
            </div>
        );
    };

    export default AdminWareHouse;
