import { FC } from "react";
import { Arrow } from "../vectors/Arrow";
import ArrowSvg from "../../assets/images/ui/arrow.svg";
interface Props {
    text: string;
}

export const TableHeader: FC<Props> = ({ text }) => {
    return (
        <div className="table-header">
            <div className="table-header__inner">
                <div className="table-header-text">{text}</div>
                <div className="table-header-sort-buttons">
                    <button type="button" className="btn btn-increase">
                        {/* <Arrow className="btn-icon-svg" width="100%" height="100%" /> */}
                        <img src={ArrowSvg} alt="Arrow Up" />
                    </button>
                    <button type="button" className="btn btn-decrease">
                        <Arrow className="btn-icon-svg" width="100%" height="100%" />
                    </button>
                </div>
            </div>
        </div>
    );
};
