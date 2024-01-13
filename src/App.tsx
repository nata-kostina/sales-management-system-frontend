import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { MessageProvider } from "./contexts/MessageContext";

export const App: FC = () => {
    return (
        <MessageProvider>
            <RouterProvider router={router} />
        </MessageProvider>
    );
};
