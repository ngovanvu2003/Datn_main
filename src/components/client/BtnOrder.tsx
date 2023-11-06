import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hook";
import { saveHistory } from "../../slices/HistoryUrl";

const BtnOrder = ({ id }: any) => {
  const { items: carts } = useAppSelector((state: any) => state.carts);
  const total = carts.reduce((sum: any, item: any) => {
    return sum + item.product_price * item.quantity;
  }, 0);
  const counts = carts.length;

  return (
    <div>
      <section
        style={{
          backgroundColor: "white",
          width: "100%",
          position: "fixed",
          bottom: "0",
        }}
      >
        <Link to={`/cart/${id}`}>
          <div style={{ maxWidth: "742px", margin: "auto", zIndex: "100" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: " 8px",
                gap: "16px",
              }}
            >
              <button
                style={{
                  fontWeight: "normal",
                  fontSize: "18px",
                  color: "white",
                  backgroundColor: "rgb(204, 103, 11)",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  borderRadius: "0.374rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  lineHeight: "20px",
                  padding: "10px",
                }}
                onClick={saveHistory}
              >
                <p style={{ display: "flex" }}>
                  <img
                    src="\Images - Copy\grocery-store.png"
                    alt=""
                    style={{ padding: "0px 5px" }}
                  />{" "}
                  Gọi món ({counts})
                </p>
                <p>{total}đ</p>
              </button>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default BtnOrder;
