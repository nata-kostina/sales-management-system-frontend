import { Navigate, createBrowserRouter } from "react-router-dom";
import { PrivateLayout } from "./layouts/PrivateLayout/PrivateLayout";
import { AccountLayout } from "./layouts/AccountLayout/AccountLayout";
import { LoginPage } from "./pages/login/LoginPage";
import { Routes } from "./types/routes";
import { Categories } from "./pages/categories";
import { Customers } from "./pages/customers";
import { ProductsPage } from "./pages/products/ProductsPage";
import { Sales } from "./pages/sales";
import { ProductViewPage } from "./pages/products/view/ProductViewPage";
import { ProductEditPage } from "./pages/products/edit/ProductEditPage";
import { ProductAddPage } from "./pages/products/add/ProductAddPage";

export const router = createBrowserRouter([

    {
        path: Routes.Main,
        element: <PrivateLayout />,
        children: [
            {
                index: true,
                element: <Navigate to={Routes.Account} />,
            },
            {
                path: Routes.Account,
                element: <AccountLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to={Routes.Dashboard} />,
                    },
                    {
                        path: Routes.Dashboard,
                        element: <p>Dashboard</p>,
                    },
                    {
                        path: Routes.Products,
                        element: <ProductsPage />,
                    },
                    {
                        path: Routes.Product,
                        element: <ProductViewPage />,
                    },
                    {
                        path: Routes.EditProduct,
                        element: <ProductEditPage />,
                    },
                    {
                        path: Routes.AddProduct,
                        element: <ProductAddPage />,
                    },
                    {
                        path: Routes.DeleteProduct,
                        element: <ProductAddPage />,
                    },
                    {
                        path: Routes.Category,
                        element: <Categories />,
                    },
                    {
                        path: Routes.Sales,
                        element: <Sales />,
                    },
                    {
                        path: Routes.Customers,
                        element: <Customers />,
                    },
                ],
            },
            // {
            //     path: "login",
            //     element: <LoginPage />,
            // },
        ],
    },
    {
        path: Routes.Login,
        element: <LoginPage />,
    },
]);
