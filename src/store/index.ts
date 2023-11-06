import {
  Action,
  Middleware,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartPosReducer } from "../slices/CartPos";

import productApi, { productReducer } from "../api/product";
import authApi, { authReducer } from "../api/auth";
import categoryApi, { categoryReducer } from "../api/categories";
import branchApi, { branchReducer } from "../api/branches";
import tableApi, { tableReducer } from "../api/tables";
import orderApi, { orderReducer } from "../api/order";
import orderDetailApi, { orderDetailReducer } from "../api/order-detail";
import { cartReducer } from "../slices/Cart";
import ReservationApi, { reservationReducer } from "../api/reservation";
import couponApi, { couponReducer } from "../api/coupons";
import comboApi, { comboReducer } from "../api/combo";
import comboProductApi, { comboProductReducer } from "../api/combo-product";
import stockApi, { stockReducer } from "../api/stock";
import kitChenApi, { kitchenReducer } from "../api/kitchen";
import customerApi, { customerReducer } from "../api/customer";
import statisticApi, { statisticReducer } from "../api/statistic";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["carts", "cartsPos"],
};

const rootReducer: any = combineReducers({
  cartPos: cartPosReducer,
  carts: cartReducer,
  [authApi.reducerPath]: authReducer,
  [productApi.reducerPath]: productReducer,
  [categoryApi.reducerPath]: categoryReducer,
  [branchApi.reducerPath]: branchReducer,
  [tableApi.reducerPath]: tableReducer,
  [orderApi.reducerPath]: orderReducer,
  [orderDetailApi.reducerPath]: orderDetailReducer,
  [kitChenApi.reducerPath]: kitchenReducer,
  [ReservationApi.reducerPath]: reservationReducer,
  [couponApi.reducerPath]: couponReducer,
  [comboApi.reducerPath]: comboReducer,
  [comboProductApi.reducerPath]: comboProductReducer,
  [stockApi.reducerPath]: stockReducer,
  [couponApi.reducerPath]: couponReducer,
  [customerApi.reducerPath]: customerReducer,
  [statisticApi.reducerPath]: statisticReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware: Middleware[] = [
  authApi.middleware,
  productApi.middleware,
  categoryApi.middleware,
  branchApi.middleware,
  tableApi.middleware,
  orderApi.middleware,
  orderDetailApi.middleware,
  ReservationApi.middleware,
  stockApi.middleware,
  couponApi.middleware,
  comboApi.middleware,
  kitChenApi.middleware,
  customerApi.middleware,
  comboProductApi.middleware,
  statisticApi.middleware,
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default persistStore(store);
