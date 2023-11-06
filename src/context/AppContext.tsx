import { createContext, useState } from "react";

const AppContext = createContext<any>({});

function AppProvider({ children }: any) {
  const [orderStatus, setOrderStatus] = useState();
  const [orderTable, setOrderTable] = useState(null);

  // booking context
  const [branchId, setBranchId] = useState<string | number>("");
  const [mealDateValue, setMealDateValue] = useState<string>("");
  const [mealtimeValue, setMealtimeValue] = useState<string>("");
  const [bookingInfo, setBookingInfo] = useState<any>({
    username: "",
    email: "",
    quantity_person: "",
    phone: "",
    note: ""
  })

  // product in combo
  const [productComboSelected, setProductComboSelected] = useState<any[]>([]);
  const [branchName, setBranchName] = useState<any>();

  // product in combo
  const onHandleSetProductComboSelected = (value: any) => {
    const isProductExists = productComboSelected.find(
      (item: any) => item.id == value.id
    );
    if (!isProductExists) {
      setProductComboSelected([...productComboSelected, value]);
    }
  };

  const onHandleDeleteProductCombo = (value: any) => {
    const newData = productComboSelected.filter(
      (item: any) => item.id != value.id
    );
    setProductComboSelected(newData);
  };

  const value = {
    orderTable,
    branchId,
    mealDateValue,
    orderStatus,
    mealtimeValue,
    setOrderStatus,
    bookingInfo,
    productComboSelected,
    setOrderTable,
    setBranchId,
    setMealDateValue,
    setMealtimeValue,
    setBookingInfo,
    onHandleSetProductComboSelected,
    onHandleDeleteProductCombo,
    setProductComboSelected,
    branchName,
    setBranchName,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
