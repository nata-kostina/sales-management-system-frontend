import { FC } from "react";
import { assets } from "../../utils/assetsManager";

export const NotFoundPage: FC = () => {
    return (
        <div className="page page-not-found">
            <main className="main">
                <div className="page__img-box">
                    <img src={assets.shared.error404} alt="Error 404" className="page__img" />
                </div>
                <h2 className="page__title">Oops, something went wrong</h2>
                <h3 className="page__subtitle">Error 404 Page not found. Sorry the page you looking for doesn’t exist or has been moved</h3>
                <a href="./account/dashboard" className="btn btn-primary btn-info btn-back">Back to Dashboard</a>
            </main>
        </div>
    );
};
