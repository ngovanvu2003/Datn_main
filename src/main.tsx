import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { Toaster } from "react-hot-toast";
import persistor, { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { AppProvider } from "./context/AppContext.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import vi from "date-fns/locale/vi";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <IntlProvider locale="vi">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <AppProvider>
            <App />
          </AppProvider>
        </PersistGate>
      </LocalizationProvider>
    </IntlProvider>
  </Provider>
);
