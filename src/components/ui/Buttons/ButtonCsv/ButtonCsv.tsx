import { ButtonHTMLAttributes, FC } from "react";
import { CsvSvg } from "../../../vectors/userActions/CsvSvg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
}

export const ButtonCsv: FC<Props> = (props) => {
    return (
        <button type="button" className="btn btn-tool btn-with-icon btn-csv" {...props}>
            <div className="btn__icon">
                <CsvSvg />
            </div>
        </button>
    );
};
