import { FC } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../data/assets";
import { EditSvg } from "../vectors/userActions/Edit";

interface Props {
    id: string;
    handleDelete?: (id: string) => void;
}

export const ActionsCell: FC<Props> = ({ id, handleDelete }) => {
    return (
        <>
            <div className="actions-cell">
                <ul className="actions-list">
                    <li className="actions__item">
                        <Link to={`${id}/edit`} className="actions__link">
                            <div className="link-icon">
                                <EditSvg />
                            </div>
                        </Link>
                    </li>
                    <li className="actions__item">
                        <button className="btn btn-delete" onClick={() => handleDelete && handleDelete(id)}>
                            <div className="link-icon">
                                <svg className="link-icon-svg">
                                    <use xlinkHref={`${assets.icons}#icon-trash`} />
                                </svg>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};
