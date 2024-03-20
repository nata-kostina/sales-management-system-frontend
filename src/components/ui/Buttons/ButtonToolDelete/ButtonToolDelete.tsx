import { ButtonHTMLAttributes, FC } from "react";
import { DeleteSvg } from "../../../vectors/userActions/DeleteSvg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
}
export const ButtonToolDelete: FC<Props> = (props) => {
    return (
        <button type="button" className="btn btn-tool btn-delete" {...props}>
            <div className="btn__icon"><DeleteSvg /></div>
        </button>
    );
};
