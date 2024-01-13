import { FC } from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { sidebarLinks } from "./SideBar";
import { useAppSelector } from "../../store/hooks";
import { selectIsSidebarExpanded } from "../../store/selector";

export const SideBarMobile: FC = () => {
    const isExpanded = useAppSelector(selectIsSidebarExpanded);
    return (
        <div id="sidebar" className={cn("sidebar sidebar-mobile", { "sidebar-mobile_expanded": isExpanded })}>
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
        </div>
    );
};
