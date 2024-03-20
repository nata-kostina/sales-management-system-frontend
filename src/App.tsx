import { FC } from "react";
import { ConfigProvider, App as AntdApp } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import varsScss from "./styles/_vars.module.scss";

const { colorPrimary, fontPrimary } = varsScss;

export const App: FC = () => {
    return (
        <AntdApp>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary,
                        fontFamily: fontPrimary,
                    },
                }}
            >
                <RouterProvider router={router} />
            </ConfigProvider>
        </AntdApp>
    );
};
