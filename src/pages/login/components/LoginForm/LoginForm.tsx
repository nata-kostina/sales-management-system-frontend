import { FC, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import cn from "classnames";
import { ILoginFormValues } from "../../../../schemas/login.form.schema";
import { assets } from "../../../../data/assets";
import { Eye } from "../../../../components/vectors/formIcons/Eye";
import { EyeCrossed } from "../../../../components/vectors/formIcons/EyeCrossed";

interface Props {
    onSubmit: () => void;
    register: UseFormRegister<ILoginFormValues>;
    errors: FieldErrors<ILoginFormValues>;
}

export const LoginForm: FC<Props> = ({ onSubmit, register, errors }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown((prev) => !prev);
    };
    return (
        <form onSubmit={onSubmit} className="form form-login">
            <div className="form__inner">
                <div className="form-section form-section_top">
                    <h2 className="form__title">Login to your account</h2>
                </div>
                <div className="form-section form-section_center">
                    <div className="input-group">
                        <label className="label" htmlFor="email">Email</label>
                        <div className="input-box">
                            <div className="input-field">
                                <input className="input" id="email" placeholder="email@mail.com" {...register("email")} />
                            </div>
                            <div className="input-icon">
                                <svg className="input-icon-svg">
                                    <use xlinkHref={`${assets.icons}#icon-mail_outline`} />
                                </svg>
                            </div>
                        </div>
                        <p className={cn("input-error", { "input-error_visible": errors.email })}>{errors.email ? errors.email.message : ""}</p>
                    </div>
                    <div className="input-group">
                        <label className="label" htmlFor="password">Password</label>
                        <div className="input-box">
                            <div className="input-field">
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    className="input"
                                    id="password"
                                    {...register("password")}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-password input-icon"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordShown ? <Eye /> : <EyeCrossed />}
                            </button>
                        </div>
                        <p className={cn("input-error", { "input-error_visible": errors.email })}>{errors.password ? errors.password.message : ""}</p>
                    </div>
                </div>
                <div className="form-section form-section_bottom">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </div>
        </form>
    );
};
