import { FC } from "react";

export const DecreaseSvg: FC = () => {
    return (
        <svg className="svg svg-decrease" fill="#000000" viewBox="0 0 24 24" id="statistic-grow" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, -1, 0, 0)">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
                <polyline
                    id="primary-2"
                    data-name="primary"
                    points="3 15 8 9 14 12 21 5"
                    className="stroke"
                    style={{
                        fill: "none",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                    }}
                />
                <polyline
                    id="primary-3"
                    data-name="primary"
                    points="21 10 21 5 16 5"
                    className="stroke"
                    style={{
                        fill: "none",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                    }}
                />
            </g>
        </svg>
    );
};
