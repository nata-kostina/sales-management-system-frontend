import { Navigate, createBrowserRouter } from "react-router-dom";
import { PrivateLayout } from "./layouts/PrivateLayout/PrivateLayout";
import { AccountLayout } from "./layouts/AccountLayout/AccountLayout";
import { LoginPage } from "./pages/login/LoginPage";
import { Routes } from "./types/routes";
import { ProductsViewPage } from "./pages/products/view/ProductsViewPage";
import { ProductEditPage } from "./pages/products/edit/ProductEditPage";
import { ProductAddPage } from "./pages/products/add/ProductAddPage";
import { BaseLayout } from "./layouts/BaseLayout/BaseLayout";
import { CategoriesViewPage } from "./pages/categories/view/CategoriesViewPage";
import { CategoryAddPage } from "./pages/categories/add/CategoryAddPage";
import { CategoryEditPage } from "./pages/categories/edit/CategoryEditPage";
import { CustomersViewPage } from "./pages/customers/view/CustomersViewPage";
import { CustomerAddPage } from "./pages/customers/add/CustomerAddPage";
import { CustomerEditPage } from "./pages/customers/edit/CustomerEditPage";
import { SaleAddPage } from "./pages/sales/add/SaleAddPage";
import { SalesViewPage } from "./pages/sales/view/SalesViewPage";
import { SaleEditPage } from "./pages/sales/edit/SaleEditPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { NotFoundPage } from "./pages/notFound/NotFoundPage";

export const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
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
                                element: <DashboardPage />,
                            },
                            {
                                path: Routes.Products,
                                children: [
                                    {
                                        index: true,
                                        element: <ProductsViewPage />,
                                    },
                                    {
                                        path: "add",
                                        element: <ProductAddPage />,
                                    },
                                    {
                                        path: ":id/edit",
                                        element: <ProductEditPage />,
                                    },
                                ],
                            },
                            {
                                path: Routes.Categories,
                                children: [
                                    {
                                        index: true,
                                        element: <CategoriesViewPage />,
                                    },
                                    {
                                        path: "add",
                                        element: <CategoryAddPage />,
                                    },
                                    {
                                        path: ":id/edit",
                                        element: <CategoryEditPage />,
                                    },
                                ],
                            },
                            {
                                path: Routes.Customers,
                                children: [
                                    {
                                        index: true,
                                        element: <CustomersViewPage />,
                                    },
                                    {
                                        path: "add",
                                        element: <CustomerAddPage />,
                                    },
                                    {
                                        path: ":id/edit",
                                        element: <CustomerEditPage />,
                                    },
                                ],
                            },
                            {
                                path: Routes.Sales,
                                children: [
                                    {
                                        index: true,
                                        element: <SalesViewPage />,
                                    },
                                    {
                                        path: "add",
                                        element: <SaleAddPage />,
                                    },
                                    {
                                        path: ":id/edit",
                                        element: <SaleEditPage />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
                errorElement: <Navigate to={Routes.NotFound} />,
            },
            {
                path: Routes.Login,
                element: <LoginPage />,
                errorElement: <Navigate to={Routes.NotFound} />,
            },
        ],
    },
    {
        path: Routes.NotFound,
        element: <NotFoundPage />,
    },
    {
        path: "*",
        element: <Navigate to={Routes.NotFound} />,
    },
]);
