import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  useCheckChildrenQrMutation,
  useCheckParentsQrMutation,
} from "../api/tables";
import BtnCall from "../components/client/BtnCall";
import BtnOrder from "../components/client/BtnOrder";
import HeaderOrderQR from "../components/client/HeaderOrderQR";
import MenuItem from "../components/client/MenuItem";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NotFoundPage } from "../pages/client";
import { notification } from "antd";
import { pusher } from "../libs/pusher";
import { CheckCircleOutlined } from "@ant-design/icons";
import LoadingPage from "../pages/client/Loading/LoadingPage";
import { useGetProductsComboQuery } from "../api/product";
import FooteOrderQR from "../components/client/FooteOrderQR";

const MenuOrderLayout = () => {
  const [qr, seTQR] = useState<string | TrustedHTML | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState([]);
  const [qrChildren] = useCheckChildrenQrMutation();
  const [qrParents] = useCheckParentsQrMutation();
  const [realtimeData, setRealtimeData] = useState<any | undefined>([]);
  const [idOrder, setIdOrder] = useState();
  const { id }: any = useParams();
  const { data: products, isLoading: isLoadingProduct }: any =
    useGetProductsComboQuery<any>(idOrder);
  const location = useLocation();
  const navigate = useNavigate();
  function playNotificationSound() {
    const audio = new Audio(
      "/public/notification/Nhac-chuong-tin-nhan-iphone-www_tiengdong_com.mp3"
    );
    audio.play();
  }
  useEffect(() => {
    if (realtimeData.length > 0) {
      playNotificationSound();
      const statusFood = (realtimeData: { orderable_status: number }[]) => {
        if (realtimeData[0].orderable_status == 1) {
          return "đã xác nhận";
        }
        if (realtimeData[0].orderable_status == -1) {
          return "đã chả";
        }
        if (realtimeData[0].orderable_status == 2) {
          return "đã xong";
        }
        if (realtimeData[0].orderable_status == -2) {
          return "đã hủy";
        }
      };
      const status = statusFood(realtimeData);
      notification.open({
        icon: (
          <CheckCircleOutlined
            style={{
              color: `${
                realtimeData[0].orderable_status == -2 ? "red" : "green"
              }`,
            }}
          />
        ),
        message: `Món " ${realtimeData[0].product_name} " ${status}`,
        duration: 8,
        className: "custom-notification", // Tên lớp CSS tùy chỉnh
        style: {
          color: "white", // Màu chữ tùy chỉnh
          border: `${
            realtimeData[0].orderable_status == -2
              ? "1px solid red"
              : "1px solid #008000"
          } `, // Viền tùy chỉnh
        },
      });
    }
  }, [realtimeData]);

  useEffect(() => {
    // ramdom cookies
    const generateRandomString = (length = 60) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
    let randomValue = null;
    if (!Cookies.get("_atm")) {
      randomValue = generateRandomString();
      Cookies.set("_atm", randomValue, { expires: 1 });
    }
    const cookie = Cookies.get("_atm") ? Cookies.get("_atm") : randomValue;
    if (id && cookie) {
      (async () => {
        // đường link của cha thì thực hiện logic này
        if (location.pathname === `/menu-order/qr/${id}`) {
          const response: any = await qrParents({
            id: id,
            cookie: cookie,
          });
          setIdOrder(id);
          setTable(response?.data?.data?.data);
          seTQR(response?.data?.data?.data?.qr_code_children);
          setLoading(true);
        }
        // đường link của menu con thì thực hiện logic này
        if (location.pathname === `/menu-order/qr/child/${id}`) {
          qrChildren({
            parents_id: id,
          })
            .unwrap()
            .then(({ data }: any) => {
              setIdOrder(data.data.id);
              setTable(data?.data);
              setLoading(true);
            });
        }
      })();
    }
  }, [id, location.pathname, navigate, qrChildren, qrParents]);

  useEffect(() => {
    //  Subscribe và lắng nghe sự kiện
    const channel = pusher.subscribe("ToCustomer");
    channel.bind(`table-${id}`, (data: any) => {
      setRealtimeData(data.data);
    });
    // Đảm bảo huỷ đăng ký khi component bị hủy
    return () => {
      pusher.unsubscribe("ToCustomer");
      pusher.disconnect();
    };
  }, []);
  return (
    <>
      {loading ? (
        <>
          {table ? (
            <div
              style={{
                backgroundImage: "url('/Images - Copy/paper_bg.png')",
              }}
            >
              <BtnCall />
              <div style={{ maxWidth: "100%", top: "0" }}>
                <div style={{ maxWidth: "742px", margin: "auto" }}>
                  <HeaderOrderQR table={table} qr={qr} />
                  <MenuItem
                    products={products}
                    isLoadingProduct={isLoadingProduct}
                  />
                </div>
              </div>
              <div style={{ position: "fixed" }}>
                <BtnOrder id={idOrder} />
              </div>
              <FooteOrderQR />
            </div>
          ) : (
            <>
              <NotFoundPage />
            </>
          )}
        </>
      ) : (
        <>
          <LoadingPage />
        </>
      )}
    </>
  );
};

export default MenuOrderLayout;
