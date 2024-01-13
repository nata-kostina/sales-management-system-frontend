import { IMessageContext } from "../types/ui.types";

export class MessageService {
    public static setMessageApi(value: IMessageContext): void {
        MessageService.messageApi = value;
    }

    public static success(message: string): void {
        MessageService.messageApi?.open({
            type: "success",
            content: message,
            duration: 5,
            className: "toast toast-success",
        });
    }

    public static error(message: string): void {
        MessageService.messageApi?.open({
            type: "error",
            content: message,
            duration: 5,
            className: "toast toast-error",
        });
    }

    private static messageApi: IMessageContext;
}
