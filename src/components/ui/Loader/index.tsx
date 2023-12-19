import { FC } from "react";
import { createPortal } from "react-dom";

const loaderEl = document.getElementById("loader");

export const Loader: FC = () => {
    return (
        <>
            {createPortal(
                <div className="spinner-box">
                    <div className="spinner" />
                </div>,
                loaderEl as HTMLElement,
            )}
        </>
    );
};
