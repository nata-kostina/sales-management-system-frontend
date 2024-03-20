import { FC } from "react";

interface Props {
    defaultValue?: string;
    label: string;
    type: string;
    name: string;
}

export const NonEditableInput: FC<Props> = ({ defaultValue, label, name, type }) => {
    return (
        <div className={`input-group input-group-${name}`}>
            <label htmlFor={name} className="label">{label}</label>
            <div className="input-box">
                <input
                    defaultValue={defaultValue}
                    type={type}
                    className="input input_disabled"
                    autoComplete="off"
                    id={name}
                    disabled={true}
                />
            </div>
        </div>
    );
};
