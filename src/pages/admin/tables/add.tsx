import FormAdd from "../../../components/admin/table/FormAdd"

const AdminTableAdd = () => {
  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/branch.png"
            alt="Branch Icon"
          />
          <span className="page-header-title">Thêm mới bàn</span>
        </h2>
      </div>
      <div className="row g-2">
        <div className="col-12">
          <FormAdd/>
        </div>
      </div>
    </>
  )
}

export default AdminTableAdd