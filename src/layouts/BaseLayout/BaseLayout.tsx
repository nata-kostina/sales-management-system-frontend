import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getBreakpoint } from "../../utils/helper";
import { useAppDispatch } from "../../store/hooks";
import { setBp } from "../../store/slices/ui.slice";

export const BaseLayout: FC = () => {
    const dispatch = useAppDispatch();
    const handleResize = () => {
        const bp = getBreakpoint();
        dispatch(setBp(bp));
    };
    useEffect(() => {
        handleResize();
    }, []);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <Outlet />
    );
};
