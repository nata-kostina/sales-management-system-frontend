import { FC } from "react";
import { assets } from "../../../../utils/assetsManager";

export const Hero: FC = () => {
    return (
        <div className="hero hero-login">
            <img
                src={assets.hero.bg}
                alt="computer"
                className="bg"
            />
            <img
                src={assets.hero.calendar}
                alt="calendar"
                className="parallax calendar"
            />
            <img
                src={assets.hero.charts}
                alt="charts"
                className="parallax charts"
            />
        </div>
    );
};
