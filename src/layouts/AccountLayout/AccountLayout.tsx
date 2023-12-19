import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar/SideBar";

export const AccountLayout: FC = () => {
    const [expandSidebar, setExpandSidebar] = useState(true);
    const toggleSidebar = () => {
        setExpandSidebar((prev) => !prev);
    };
    return (
        <div className="page-wrapper">
            <div className="page">
                <Header expandSidebar={expandSidebar} toggleSidebar={toggleSidebar} />
                <div className="page-header-offset">
                    {/* <div className="container container-no-padding-left"> */}
                    <div className="page__inner account-layout">
                        <Sidebar expandSidebar={expandSidebar} />
                        <Outlet />
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};
