import { FC, useMemo } from "react";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";
import Avatar from "../../assets/images/avatar.jpg";
import { DropDown, DropDownBox, DropDownMenu } from "../ui/DropDown/DropDown";
import { useFetch } from "../../hooks/useFetch";
import { appService } from "../../services";
import { appController } from "../../controllers";
import { PreloaderPortal } from "../ui/Preloader/PreloaderPortal";

export const ToolBar: FC = () => {
    const { isLoading, makeRequest } = useFetch<void>();
    const handleLogout = async () => {
        try {
            await makeRequest(async () => {
                return appService.auth.logout();
            });
            appController.auth.handleLogout();
        } catch (error) {
            appController.auth.handleLogout();
        }
    };

    const dropDownMenuLinks = useMemo(() => [
        {
            title: "My Profile",
            icon: "icon-user",
        },
        {
            title: "Settings",
            icon: "icon-settings",
        },
        {
            title: "Logout",
            icon: "icon-log-out",
            highlighted: true,
            onClick: handleLogout,
        },
    ], []);

    return (
        <>{isLoading ? <PreloaderPortal /> : (
            <div className="toolbar">
                <ul className="toolbar-list">
                    <li className="toolbar__item">
                        <ThemeSwitcher />
                    </li>
                    <li className="toolbar__item">
                        <DropDown>
                            <DropDownBox>
                                <div className="user-info">
                                    <div className="user-avatar">
                                        <img className="user-avatar-img" src={Avatar} alt="avatar" />
                                    </div>
                                    <div className="user-name">John Smilga</div>
                                </div>
                            </DropDownBox>
                            <DropDownMenu links={dropDownMenuLinks} />
                        </DropDown>
                    </li>
                </ul>
            </div>
        )}
        </>
    );
};
