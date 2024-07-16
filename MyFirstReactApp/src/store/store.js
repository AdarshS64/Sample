import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import employeeReducer from "./employeeReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import apiWithTag, { employeeBaseApi } from "../api/employeeApi";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    [apiWithTag.reducerPath]: apiWithTag.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeBaseApi.middleware),
});

setupListeners(store.dispatch);

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./reducer";

// const store = configureStore({
//   reducer: {
//     employee: reducer,
//   },
// });

// export default store;
