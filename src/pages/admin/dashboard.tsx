import EarningStatistic from "../../components/admin/dashboard/EarningStatistic";
import TopSellingProducts from "../../components/admin/dashboard/TopSellingProducts";
import OverviewBussiness from "../../components/admin/dashboard/OverviewBusiness";
import RecentOrder from "../../components/admin/dashboard/RecentOrder";
import TopCustomer from "../../components/admin/dashboard/TopCustomer";
// import OrderStatistic from "../../components/admin/dashboard/OrderStatistic";
// import OrderStatusStatistic from "../../components/admin/dashboard/OrderStatusStatistic";
// import MostRatedProduct from "../../components/admin/dashboard/MostRatedProduct";

const Dashboard = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const userName = parsedUser.user ? parsedUser.user.information.name : "";

  return (
    <>
      <div>
        <div className="row align-items-center">
          <div className="col-sm mb-2 mb-sm-0">
            <h1 className="page-header-title c1">Xin chào, {userName}.</h1>
            <p className="text-dark font-weight-semibold py-2">
              Theo dõi số liệu phân tích và thống kê kinh doanh của bạn
            </p>
          </div>
        </div>
      </div>

      <OverviewBussiness />

      <div className="grid grid-cols-4 gap-2 mb-3">
        {/* bieu do thong ke doanh thu */}
        <div className="col-span-4 md:col-span-3 lg:col-span-3">
          <EarningStatistic />
        </div>

        {/* 5 don hang moi */}
        <div className="col-span-4 md:col-span-1 lg:col-span-1">
          <RecentOrder />
        </div>

        {/* bieu do trang thai don hang */}
        {/* <div className="col-span-4 md:col-span-4  lg:col-span-2">
          <OrderStatusStatistic />
        </div> */}

        {/* bieu do thong ke don hang */}
        {/* <div className="col-span-4 md:col-span-4 lg:col-span-2">
          <OrderStatistic />
        </div> */}
        
      </div>

      <div className="row g-1">
        <TopSellingProducts />

        {/* <MostRatedProduct /> */}

        <TopCustomer />
      </div>
    </>
  );
};

export default Dashboard;
