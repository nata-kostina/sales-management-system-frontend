import { Link, LinkProps } from "react-router-dom";
import { FC } from "react";
import { AddSvg } from "../../../vectors/userActions/AddSvg";

interface Props extends LinkProps {
    text: string;
}

export const ButtonAdd: FC<Props> = ({ text, ...props }) => {
    return (
        <Link className="btn btn-primary btn-info btn-with-icon btn-add" {...props}>
            <span className="btn__icon"><AddSvg /></span>
            <span className="btn__text">{text}</span>
        </Link>
    );
};
