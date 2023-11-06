import FormAddCoupon from "../../../components/admin/coupon/FormAddCoupon"

const AdminCouponAdd = () => {
  return (
    <div>
        <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width={20}
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/coupon.png"
            alt=""
          />
          <span className="page-header-title">Thêm mới mã giảm giá</span>
        </h2>
      </div>
      <div className="row g-2">
        <FormAddCoupon/>
      </div>
      
    </div>
  )
}

export default AdminCouponAdd