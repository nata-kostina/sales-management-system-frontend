import { AnchorHTMLAttributes, FC } from "react";
import { AddSvg } from "../../../vectors/userActions/AddSvg";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string;
}

export const ButtonAdd: FC<Props> = ({ text, ...props }) => {
    return (
        <a className="btn btn-primary btn-info btn-with-icon btn-add" {...props}>
            <span className="btn__icon"><AddSvg /></span>
            <span className="btn__text">{text}</span>
        </a>
    );
};
