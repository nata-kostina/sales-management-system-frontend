import { FC, useState } from "react";
import { assets } from "../../../data/assets";

export const ThemeSwitcher: FC = () => {
    const [isLight, setIsLight] = useState(() => document.documentElement.classList.contains("light"));
    return (
        <button
            type="button"
            className="btn toolbar__icon"
            onClick={() => {
                if (document.documentElement.classList.contains("light")) {
                    document.documentElement.classList.remove("light");
                    document.documentElement.classList.add("dark");
                    setIsLight(false);
                } else {
                    document.documentElement.classList.remove("dark");
                    document.documentElement.classList.add("light");
                    setIsLight(true);
                }
            }}
        >{isLight ? (
            <svg className="toolbar__icon-svg">
                <use xlinkHref={`${assets.icons}#icon-moon`} />
            </svg>
        ) : (
            <svg className="toolbar__icon-svg">
                <use xlinkHref={`${assets.icons}#icon-sun`} />
            </svg>
        )}
        </button>
    );
};
