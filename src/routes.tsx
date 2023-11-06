import { Navigate, createBrowserRouter } from "react-router-dom";
import { ClientLayout, AdminLayout } from "./layouts";
import {
  HomePage,
  SigninPage,
  SignupPage,
  NotFoundPage,
  BookingTablePage,
} from "./pages/client";
import {
  Dashboard,
  AdminProducts,
  AdminProductsAdd,
  AdminOrders,
  AdminOrderPending,
  AdminTableOrder,
  AdminTableOrderOnTable,
  AdminCategories,
  AdminCategoriesUpdate,
  AdminProductsUpdate,
  AdminBranches,
  AdminBranchesAdd,
  AdminBranchesUpdate,
  AdminTables,
  AdminTablesUpdate,
  AdminTablesAvailability,
  AdminCustomers,
  AdminCustomerDetail,
  AdminRoles,
  AdminRoleUpdate,
  AdminSettingInfo,
  AdminCoupons,
  AdminCouponUpdate,
  AdminFeedback,
  AdminNews,
  AdminPointOfSale,
  AdminPosOrderStatus,
  AdminPosPending,
  AdminPosConfirmed,
  AdminPosDone,
  AdminPosReturned,
  AdminPosCancel,
  AdminOrderInvoice,
  OrderAdminDetail,
  AdminOrderPaid,
  AdminReservation,
  ApplyComponent,
  AdminCouponAdd,
  ComboPage,
  AdminAddComboProduct,
  AdminStatisticRevenue,
  AdminStatisticProduct,
  AdminStatisticReservation,
  AdminStatisticOrder,
  AdminTablesAdd,
} from "./pages/admin";
import { PrivateRoute } from "./helpers/private-route";
import Forgot from "./pages/client/Forgot";
import MenuPages from "./pages/client/MenuPage";
import MenuCombo from "./components/client/Menu";
import BlogLayout from "./layouts/childLayout/BlogLayout";
import ListBlog from "./components/client/ListBlog";
import SingleBlog from "./components/client/SingleBlog";
import Infor from "./components/client/info-user/Infor";
import LoginAdmin from "./pages/admin/LoginAdmin";
import MenuOrderLayout from "./layouts/MenuOrderLayout";
import CartPage from "./pages/client/menu/CartPage";
import AdminReservationUpdate from "./pages/admin/reservation/update";
import AdminKitchen from "./pages/admin/kitchen";
import AdminWareHouse from "./pages/admin/warehousefood";
import BookingSelectBranch from "./components/client/booking/BookingSelectBranch";
import BookingSelectMealtime from "./components/client/booking/BookingSelectMealtime";
import BookingFinished from "./components/client/booking/BookingFinished";
import AdminListOrderDetail from "./pages/admin/order-detail/list";
import LoadingPage from "./pages/client/Loading/LoadingPage";
import PaymentResult from "./pages/PaymentResult";
import HistoryOrder from "./pages/client/HistoryOrder";

const user = JSON.parse(localStorage?.getItem("user") as string);
const isAuth =
  user?.user?.information?.role_id === "1" ||
  user?.user?.information?.role_id === "2" ||
  user?.user?.information?.role_id === "3"
    ? true
    : false;
const isToken = user?.user?.expires_in;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "booking",
        element: <BookingTablePage />,
        children: [
          { index: true, element: <Navigate to="branch" /> },
          { path: "branch", element: <BookingSelectBranch /> },
          { path: "mealtime", element: <BookingSelectMealtime /> },
          { path: "finished", element: <BookingFinished /> },
        ],
      },
      {
        path: "menu",
        element: <MenuPages />,
        children: [
          { index: true, element: <Navigate to="listmenu" /> },
          { path: "listmenu", element: <MenuCombo /> },
        ],
      },
      {
        path: "blog",
        element: <BlogLayout />,
        children: [
          { index: true, element: <Navigate to="listBlog" /> },
          { path: "listBlog", element: <ListBlog /> },
          { path: "post/:id", element: <SingleBlog /> },
        ],
      },
      { path: "infor", element: <Infor /> },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute isToken={isToken} isAuth={isAuth} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "pos", element: <AdminPointOfSale /> },
          {
            path: "pos/order-status",
            element: <AdminPosOrderStatus />,
            children: [
              { index: true, element: <Navigate to="pending" /> },
              { path: "pending", element: <AdminPosPending /> },
              { path: "confirmed", element: <AdminPosConfirmed /> },
              { path: "done", element: <AdminPosDone /> },
              { path: "returned", element: <AdminPosReturned /> },
              { path: "cancel", element: <AdminPosCancel /> },
            ],
          },
          {
            path: "reservation",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminReservation /> },
              { path: "add", element: <AdminReservation /> },
              { path: ":id/update", element: <AdminReservationUpdate /> },
            ],
          },
          { path: "apply", element: <ApplyComponent /> },
          {
            path: "orders",
            children: [
              { index: true, element: <Navigate to="all" /> },
              { path: "all", element: <AdminOrders /> },
              { path: "pending", element: <AdminOrderPending /> },
              { path: "paid", element: <AdminOrderPaid /> },
              { path: "detail/:id", element: <OrderAdminDetail /> },
              { path: "invoice/:id", element: <AdminOrderInvoice /> },
            ],
          },
          { path: "statistics/revenue", element: <AdminStatisticRevenue /> },
          { path: "statistics/product", element: <AdminStatisticProduct /> },
          { path: "statistics/reservation", element: <AdminStatisticReservation /> },
          { path: "statistics/order", element: <AdminStatisticOrder /> },
          {
            path: "kitchen",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminKitchen /> },
            ],
          },
          {
            path: "warehouse",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminWareHouse /> },
            ],
          },
          {
            path: "orders-detail",
            children: [
              { index: true, element: <Navigate to="all" /> },
              { path: "all", element: <AdminListOrderDetail /> },
            ],
          },
          {
            path: "kitchen",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminKitchen /> },
            ],
          },
          {
            path: "warehouse",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminWareHouse /> },
            ],
          },
          {
            path: "table-order",
            children: [
              { index: true, element: <Navigate to="all" /> },
              { path: "all", element: <AdminTableOrder /> },
              { path: "ontable", element: <AdminTableOrderOnTable /> },
            ],
          },
          {
            path: "categories",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminCategories /> },
              { path: ":id/update", element: <AdminCategoriesUpdate /> },
            ],
          },
          {
            path: "combo",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <ComboPage /> },
              { path: ":id/update", element: <AdminProductsUpdate /> },
              { path: "add-product", element: <AdminAddComboProduct /> },
            ],
          },
          {
            path: "products",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminProducts /> },
              { path: "add", element: <AdminProductsAdd /> },
              { path: ":id/update", element: <AdminProductsUpdate /> },
            ],
          },
          {
            path: "branches",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminBranches /> },
              { path: "add", element: <AdminBranchesAdd /> },
              { path: ":id/update", element: <AdminBranchesUpdate /> },
            ],
          },
          {
            path: "tables",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminTables /> },
              { path: "add", element: <AdminTablesAdd /> },
              { path: "availability", element: <AdminTablesAvailability /> },
              { path: ":id/update", element: <AdminTablesUpdate /> },
            ],
          },
          {
            path: "customers",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminCustomers /> },
              { path: "view/:id", element: <AdminCustomerDetail /> },
            ],
          },
          {
            path: "roles",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminRoles /> },
              { path: ":id/update", element: <AdminRoleUpdate /> },
            ],
          },
          {
            path: "news",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminNews /> },
              { path: ":id/update", element: <AdminCouponUpdate /> },
            ],
          },
          {
            path: "coupons",
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <AdminCoupons /> },
              { path: "add", element: <AdminCouponAdd /> },
              { path: ":id/update", element: <AdminCouponUpdate /> },
            ],
          },
          {
            path: "feedback",
            element: <AdminFeedback />,
          },
          {
            path: "settings",
            element: <AdminSettingInfo />,
          },
        ],
      },
    ],
  },
  {
    path: "menu-order",
    element: <MenuOrderLayout />,
    children: [{ path: "qr/:id" }, { path: "qr/child/:id" }],
  },
  {
    path: "history-order/:id",
    element: <HistoryOrder />,
  },
  {
    path: "cart/:id",
    element: <CartPage />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/auth/admin",
    element: <LoginAdmin />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "loading",
    element: <LoadingPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "vnpay/result-payment",
    element: <PaymentResult />,
  },
]);
