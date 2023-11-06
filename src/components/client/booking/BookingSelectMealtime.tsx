import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const mealtime: any[] = [];

for (let i = 1; i < 24; i++) {
  const label = i < 10 ? `0${i}:00` : `${i}:00`;
  const value = i < 10 ? `0${i}:00:00` : `${i}:00:00`;
  mealtime.push({ id: i, label: label, value: value });
}

const BookingSelectMealtime = () => {
  const bookingContext = useContext(AppContext);
  return (
    <div>
      <div className="flex justify-start items-center gap-2 pb-5">
        <h1 className="font-semibold text-xl lg:text-2xl text-white">Chọn ngày</h1>
        <DatePicker
          defaultValue={new Date()}
          onChange={bookingContext.setMealDateValue}
          disablePast
          slotProps={{
            textField: {
              color: "warning",
              focused: true,
            },
          }}
          className="text-white bg-white rounded-md"
        />
      </div>
      <div className="md:flex lg:flex justify-center items-center">
        <div className="row grid grid-cols-2 md:flex lg:flex">
          {mealtime.map((time: any) => {
            return (
              <label
                key={time.id}
                htmlFor={time.label}
                onChange={() =>
                  bookingContext.setMealtimeValue(time.value)
                }
                className={`col-md-2 col-md-4 cursor-pointer border border-gray-400 hover:bg-black hover:opacity-75 focus:bg-gray-300 ${
                  bookingContext.mealtimeValue === time.value
                    ? "bg-black opacity-80"
                    : "bg-white"
                }`}
              >
                <div className="cbox-3 text-center">
                  <div className="cbox-3-txt">
                    <h5 className="h5-xl red-color">{time.label}</h5>
                  </div>
                </div>
                <input type="checkbox" id={time.label} hidden />
              </label>
            );
          })}
        </div>
      </div>
      <div className="active flex justify-center items-center">
        <Link to="/booking/branch">
          <button className="next">Quay lại</button>
        </Link>
        <Link to="/booking/finished">
          <button className="next">Tiếp tục</button>
        </Link>
      </div>
    </div>
  );
};

export default BookingSelectMealtime;
