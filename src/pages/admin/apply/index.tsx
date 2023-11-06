import Apply from "../../../components/admin/apply/Apply";

const Index = () => {
  return (
    <div>
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            className="avatar-img"
            src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/table.png"
            alt=""
          />
          <span className="page-header-title">Tạo mới Booking </span>
        </h2>
      </div>
      <Apply />
    </div>
  );
};

export default Index;
