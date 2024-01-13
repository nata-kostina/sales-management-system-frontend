import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/SideBar/SideBar";
import { useAppSelector } from "../../store/hooks";
import { selectBp } from "../../store/selector";
import { breakpoints } from "../../utils/helper";
import { SideBarMobile } from "../../components/SideBar/SideBarMobile";

export const AccountLayout: FC = () => {
    const bp = useAppSelector(selectBp);
    return (
        <div className="account-layout-wrapper">
            <Header />
            <div className="account-header-offset">
                <main className="main-account-layout">
                    {bp === breakpoints.Ms || bp === breakpoints.S ? <SideBarMobile /> : <Sidebar />}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
