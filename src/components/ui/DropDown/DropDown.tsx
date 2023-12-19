import { FC, ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../../data/assets";
import { IMenuLink } from "../../../types/ui.types";

interface Props {
    children: ReactNode;
}

export const DropDown: FC<Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <button
            type="button"
            className={`btn dropdown ${isOpen ? "dropdown_open" : ""}`}
            onClick={toggleMenu}
        >
            <span className="btn btn-arrow" />
            {children}
        </button>
    );
};
export const DropDownBox: FC<Props> = ({ children }) => {
    return (
        <div className="dropdown-box">
            {children}
        </div>
    );
};

interface DropDownMenuProps {
    links: IMenuLink[];
}
export const DropDownMenu: FC<DropDownMenuProps> = ({ links }) => {
    return (
        <div className="dropdown-menu">
            <ul className="dropdown-menu-list">
                {links.map(({ icon, title, highlighted, onClick }) => (
                    <li
                        key={title}
                        className={`dropdown-menu__item ${highlighted ? "dropdown-menu__item_highlighted" : ""}`}
                    >
                        <div onClick={() => { if (onClick) { onClick(); } }} className="btn dropdown-menu__link">
                            <div className="link__icon-box">
                                <svg className="link__icon-svg">
                                    <use xlinkHref={`${assets.icons}#${icon}`} />
                                </svg>
                            </div>
                            <span className="link__title">{title}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
