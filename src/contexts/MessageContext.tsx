import { message } from "antd";
import { FC, createContext, useEffect } from "react";
import { MessageService } from "../services/message.service";
import { IMessageContext } from "../types/ui.types";

export const MessageContext = createContext<IMessageContext>(null);

interface Props {
    children: React.ReactNode;
}

export const MessageProvider: FC<Props> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        MessageService.setMessageApi(messageApi);
    }, [messageApi]);

    return (
        <MessageContext.Provider value={messageApi}>
            <>
                {contextHolder}
                {children}
            </>
        </MessageContext.Provider>
    );
};
