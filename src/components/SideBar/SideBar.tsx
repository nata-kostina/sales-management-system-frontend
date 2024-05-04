import { FC, useEffect, useState } from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { Routes } from "../../types/routes";
import { IMenuItem } from "../../types/ui.types";
import { DashboardSvg } from "../vectors/menuIcons/Dashboard";
import { ProductsSvg } from "../vectors/menuIcons/Products";
import { SalesSvg } from "../vectors/menuIcons/Sales";
import { CategoriesSvg } from "../vectors/menuIcons/Categories";
import { CustomersSvg } from "../vectors/menuIcons/Customers";
import { useAppSelector } from "../../store/hooks";
import { selectIsSidebarExpanded } from "../../store/selector";

export const Sidebar: FC = () => {
    const isExpanded = useAppSelector(selectIsSidebarExpanded);
    const [isTitleDisplayed, setIsTitleDisplayed] = useState(isExpanded);

    useEffect(() => {
        if (isExpanded) {
            setTimeout(() => {
                setIsTitleDisplayed(true);
            }, 200);
        } else {
            setIsTitleDisplayed(false);
        }
    }, [isExpanded]);
    return (
        <aside id="sidebar" className={cn("sidebar sidebar-desktop", { sidebar_expanded: isExpanded, sidebar_titleDisplayed: isTitleDisplayed })}>
            <div className="sidebar-menu">
                <ul className="menu">
                    {sidebarLinks.map(({ icon, link, title }) => (
                        <li key={link} className="menu__item">
                            <NavLink
                                to={link}
                                end={true}
                                className={({ isActive }) =>
                                    isActive ? "menu__link menu__link_active" : "menu__link"
                                }
                            >
                                <span className="link-icon">
                                    {icon}
                                </span>
                                <span className="link-title">
                                    {title}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export const sidebarLinks: IMenuItem[] = [
    {
        title: "Dashboard",
        link: Routes.Dashboard,
        icon: <DashboardSvg />,
    },
    {
        title: "Products",
        link: Routes.Products,
        icon: <ProductsSvg />,
    },
    {
        title: "Categories",
        link: Routes.Categories,
        icon: <CategoriesSvg />,
    },
    {
        title: "Customers",
        link: Routes.Customers,
        icon: <CustomersSvg />,
    },
    {
        title: "Sales",
        link: Routes.Sales,
        icon: <SalesSvg />,
    },
];
