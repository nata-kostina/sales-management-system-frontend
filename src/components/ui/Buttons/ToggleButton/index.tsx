import { FC } from "react";

interface Props {
    expandSidebar: boolean;
    toggleSidebar: () => void;
}

export const ToggleButton: FC<Props> = ({ expandSidebar, toggleSidebar }) => {
    const handleClick = () => {
        toggleSidebar();
    };
    return (
        <button className={`btn btn-toggle ${expandSidebar ? " btn-toggle_active" : ""}`} onClick={handleClick}>
            <svg className="btn-toggle-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
            </svg>
        </button>
    );
};
