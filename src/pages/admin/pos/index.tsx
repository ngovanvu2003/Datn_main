import { Link } from "react-router-dom";
import ModalAddCustomer from "../../../components/admin/pos/ModalAddCustomer";
import OrderSection from "../../../components/admin/pos/OrderSection";
import ProductionSection from "../../../components/admin/pos/ProductionSection";
import { useGetBranchByIdQuery } from "../../../api/branches";

const AdminPointOfSale = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const branchId = parsedUser.user ? parsedUser.user.information.branch_id : "";
  const {data: branchName} = useGetBranchByIdQuery(branchId)
  return (
    <div>
      <div className="content">
        <div className="flex justify-between items-center px-5">
          <h2 className="h1 mb-0 d-flex align-items-center gap-2">
            <img
              width="20"
              className="avatar-img"
              src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/table.png"
              alt=""
            />
            <span className="page-header-title">POS ({branchName?.data?.name})</span>
          </h2>
          <Link to="/admin/pos/order-status" className="btn btn-primary">
             Trạng thái đơn hàng
          </Link>
        </div>
        <section className="section-content padding-y-sm bg-default mt-3">
          <div className="container-fluid">
            <div className="row gy-3 gx-2">
              {/* Product section */}
              <ProductionSection />

              {/* Billing section */}
              <OrderSection />
            </div>
          </div>
        </section>

        {/* Modal add customer */}
        <ModalAddCustomer />
      </div>
    </div>
  );
};

export default AdminPointOfSale;
