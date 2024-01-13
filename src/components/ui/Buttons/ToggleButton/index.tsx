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
            <div className="arrow" />
        </button>
    );
};
