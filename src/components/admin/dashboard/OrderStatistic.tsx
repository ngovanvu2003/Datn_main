import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
const OrderStatistic = () => {
  const currentYear = new Date().getFullYear();
  
  const data = [
    {
      name: "Jan",
      order: 2400,
      earning: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      order: 1398,
      earning: 1200,
      amt: 2210,
    },
    {
      name: "Mar",
      order: 9800,
      earning: 5400,
      amt: 2290,
    },
    {
      name: "Apr",
      order: 3908,
      earning: 2400,
      amt: 2000,
    },
    {
      name: "May",
      order: 4800,
      earning: 2400,
      amt: 2181,
    },
    {
      name: "Jun",
      order: 3800,
      earning: 2400,
      amt: 2500,
    },
    {
      name: "Jul",
      order: 4300,
      earning: 2400,
      amt: 2100,
    },
    {
      name: "Aug",
      order: 4300,
      earning: 2400,
      amt: 2100,
    },
    {
      name: "Sep",
      order: 4300,
      earning: 2400,
      amt: 2100,
    },
    {
      name: "Oct",
      order: 4300,
      earning: 2400,
      amt: 2100,
    },
    {
      name: "Nov",
      order: 4300,
      earning: 2400,
      amt: 2100,
    },
    {
      name: "Dec",
      order: 4300,
      earning: 2400,
      amt: 2100,
    },
  ];
  return (
    <div className="card h-[450px] border border-gray-400">
      <div className="card-body">
        <div className="d-flex justify-content-between flex-wrap gap-2 align-items-center">
          <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
            <img
              width="20"
              className="avatar-img rounded-0"
              src="https://efood-admin.6amtech.com/public/assets/admin/img/icons/earning_statistics.png"
              alt="image"
            />
            Thống kê đơn hàng
          </h4>
          <ul className="option-select-btn">
            <li>
              <label>
                <span
                className="bg-[#ff6767] text-white font-medium"
                >
                  {currentYear}
                </span>
              </label>
            </li>
          </ul>
        </div>

        <div id="updatingOrderData" className="custom-chart mt-2">
          <div
            id="order-statistics-line-chart"
            style={{ minHeight: "343px" }}
            className="overflow-x-auto min-w-full"
          >
            <LineChart
              width={650}
              height={350}
              data={data}
              margin={{
                top: 25,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="order"
                stroke="#ff6d6d"
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatistic;
