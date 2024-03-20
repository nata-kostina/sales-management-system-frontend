import { ButtonHTMLAttributes, FC } from "react";
import { ExcelSvg } from "../../../vectors/userActions/ExcelSvg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
}

export const ButtonExcel: FC<Props> = (props) => {
    return (
        <button type="button" className="btn btn-tool btn-with-icon btn-excel" {...props}>
            <div className="btn__icon">
                <ExcelSvg />
            </div>
        </button>
    );
};
