import { FC } from "react";
import cn from "classnames";
import { assets } from "../../data/assets";
import { ToggleButton } from "../ui/Buttons/ToggleButton";
import { ToolBar } from "../ToolBar/Toolbar";

interface Props {
    expandSidebar: boolean;
    toggleSidebar: () => void;
}

export const Header: FC<Props> = ({ expandSidebar, toggleSidebar }) => {
    return (
        <header id="header" className={cn("header", { "header_sidebar-expanded": expandSidebar })}>
            <div className="header__inner">
                <div className="header-sidebar-part">
                    <div className="logo-box">
                        <img className="logo-box-img" src={assets.logo.full} alt="logo" />
                        <ToggleButton expandSidebar={expandSidebar} toggleSidebar={toggleSidebar} />
                    </div>
                </div>
                <div className="header-visible-part">
                    <div className="header__box">
                        <ToolBar />
                    </div>
                </div>
            </div>
        </header>
    );
};
