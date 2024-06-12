import { FC } from "react";
import cn from "classnames";
import { ToggleButton } from "../ui/Buttons/ToggleButton";
import { ToolBar } from "../ToolBar/Toolbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsSidebarExpanded } from "../../store/selector";
import { setIsSidebarExpanded } from "../../store/slices/ui.slice";
import { assets } from "../../utils/assetsManager";
import { Routes } from "../../types/routes";

export const Header: FC = () => {
    const isExpanded = useAppSelector(selectIsSidebarExpanded);
    const dispatch = useAppDispatch();
    const toggleSidebar = () => {
        dispatch(setIsSidebarExpanded(!isExpanded));
    };
    return (
        <header id="header" className={cn("header", { "header_sidebar-expanded": isExpanded })}>
            <div className="header__inner">
                <div className="header-sidebar-part">
                    <div className="logo">
                        <div className="logo__img-box">
                            <a href={Routes.Main} className="logo__link-box">
                                <img className="logo__img" src={assets.logo} alt="logo" />
                            </a>
                        </div>
                        <a href={Routes.Main} className="logo__text">Shopik</a>
                    </div>
                    <ToggleButton expandSidebar={isExpanded} toggleSidebar={toggleSidebar} />
                </div>
                <div className="header-visible-part">
                    <div className="toolbar-box">
                        <ToolBar />
                    </div>
                </div>
            </div>
        </header>
    );
};
