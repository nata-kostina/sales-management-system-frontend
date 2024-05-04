import { FC } from "react";

export const IncreaseSvg: FC = () => {
    return (
        <svg className="svg svg-increase" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="statistic-grow" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg">
            <polyline
                id="primary-2"
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
                points="21 10 21 5 16 5"
                className="stroke"
                style={{
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                }}
            />
        </svg>
    );
};
