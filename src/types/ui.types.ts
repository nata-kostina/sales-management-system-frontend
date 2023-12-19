export interface IMenuItem {
    link: string;
    title: string;
    icon?: React.ReactNode;
    highlighted?: boolean;
    onClick?: () => void;
}

export interface IImageFile {
    src: string;
    name: string;
}

export interface ISelectOption {
    value: string;
    label: string;
}
