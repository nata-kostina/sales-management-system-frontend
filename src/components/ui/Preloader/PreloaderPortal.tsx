import { FC } from "react";
import { createPortal } from "react-dom";
import { Preloader } from "./Preloader";

const preloaderEl = document.getElementById("preloader") as HTMLDivElement;

export const PreloaderPortal: FC = () => {
    return (
        <>
            {createPortal(
                <div className="preloader-box">
                    <Preloader />
                </div>,
                preloaderEl,
            )}
        </>
    );
};
