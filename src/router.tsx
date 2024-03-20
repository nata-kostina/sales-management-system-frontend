import { Navigate, createBrowserRouter } from "react-router-dom";
import { PrivateLayout } from "./layouts/PrivateLayout/PrivateLayout";
import { AccountLayout } from "./layouts/AccountLayout/AccountLayout";
import { LoginPage } from "./pages/login/LoginPage";
import { Routes } from "./types/routes";
import { ProductsPage } from "./pages/products/ProductsPage";
import { ProductViewPage } from "./pages/products/view/ProductViewPage";
import { ProductEditPage } from "./pages/products/edit/ProductEditPage";
import { ProductAddPage } from "./pages/products/add/ProductAddPage";
import { BaseLayout } from "./layouts/BaseLayout/BaseLayout";
import { CategoriesPage } from "./pages/categories/CategoriesPage";
import { CategoryAddPage } from "./pages/categories/add/CategoryAddPage";
import { CategoryEditPage } from "./pages/categories/edit/CategoryEditPage";
import { CustomersPage } from "./pages/customers/CustomersPage";
import { CustomerAddPage } from "./pages/customers/add/CustomerAddPage";
import { CustomerEditPage } from "./pages/customers/edit/CustomerEditPage";
import { SaleAddPage } from "./pages/sales/add/SaleAddPage";
import { SaleViewPage } from "./pages/sales/view/SaleViewPage";
import { SaleEditPage } from "./pages/sales/edit/SaleEditPage";

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
                                path: Routes.Categories,
                                children: [
                                    {
                                        index: true,
                                        element: <CategoriesPage />,
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
                                        element: <CustomersPage />,
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
                                        element: <SaleViewPage />,
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
            },
            {
                path: Routes.Login,
                element: <LoginPage />,
            },
        ],
    },

]);
