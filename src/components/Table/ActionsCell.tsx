import { DeleteSvg } from "../vectors/userActions/DeleteSvg";
import { EditSvg } from "../vectors/userActions/EditSvg";

interface Props {
    handleOnEdit: () => void;
    handleOnDelete: () => void;
}

export function ActionsCell({ handleOnEdit, handleOnDelete }: Props): JSX.Element {
    return (
        <>
            <div className="actions-cell">
                <ul className="actions-list">
                    <li className="actions__item">
                        <button className="btn btn-table btn-edit" onClick={handleOnEdit}>
                            <EditSvg />
                        </button>
                    </li>
                    <li className="actions__item">
                        <button className="btn btn-table btn-delete" onClick={handleOnDelete}>
                            <DeleteSvg />
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}
