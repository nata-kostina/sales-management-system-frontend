import { FC } from "react";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { ToggleButton } from "../ui/Buttons/ToggleButton";
import { ToolBar } from "../ToolBar/Toolbar";
import { useAppSelector } from "../../store/hooks";
import { selectIsSidebarExpanded } from "../../store/selector";
import { setIsSidebarExpanded } from "../../store/slices/ui.slice";

export const Header: FC = () => {
    const isExpanded = useAppSelector(selectIsSidebarExpanded);
    const dispatch = useDispatch();
    const toggleSidebar = () => {
        dispatch(setIsSidebarExpanded(!isExpanded));
    };
    return (
        <header id="header" className={cn("header", { "header_sidebar-expanded": isExpanded })}>
            <div className="header__inner">
                <div className="header-sidebar-part">
                    {/* <div className="logo-box">
                        <img className="logo-box-img" src={assets.logo.full} alt="logo" />
                    </div> */}
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
