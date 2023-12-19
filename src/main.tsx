import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
    // </React.StrictMode>,
);
