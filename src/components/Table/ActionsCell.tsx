import { Tooltip } from "antd";
import { DeleteSvg } from "../vectors/userActions/DeleteSvg";
import { EditSvg } from "../vectors/userActions/EditSvg";

interface Props {
    handleOnEdit?: () => void;
    handleOnDelete?: () => void;
    editTooltip?: string;
    deleteTooltip?: string;
}

export function ActionsCell({ handleOnEdit, handleOnDelete, deleteTooltip, editTooltip }: Props): JSX.Element {
    return (
        <>
            <div className="actions-cell">
                <ul className="actions-list">
                    <li className="actions__item">
                        {editTooltip && (
                            <Tooltip title={editTooltip}>
                                <button type="button" className="btn btn-table btn-edit" onClick={handleOnEdit}>
                                    <EditSvg />
                                </button>
                            </Tooltip>
                        )}
                    </li>
                    <li className="actions__item">
                        {deleteTooltip && (
                            <Tooltip title={deleteTooltip}>
                                <button type="button" className="btn btn-table btn-delete" onClick={handleOnDelete}>
                                    <DeleteSvg />
                                </button>
                            </Tooltip>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
}
