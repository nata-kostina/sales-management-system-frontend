import { MessageInstance } from "antd/es/message/interface";

export interface IMenuItem {
    link: string;
    title: string;
    icon?: React.ReactNode;
    highlighted?: boolean;
    onClick?: () => void;
}

export interface IImageFile {
    file: File;
    src: string;
}

export interface ISelectOption {
    value: string;
    label: string;
}

export type IMessageContext = MessageInstance | null;

export interface IMenuLink {
    icon?: string;
    title: string;
    highlighted?: boolean;
    onClick?: () => void;
}
