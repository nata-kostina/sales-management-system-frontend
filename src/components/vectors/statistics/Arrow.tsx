import { FC } from "react";

interface Props {
    className: string;
    width: string;
    height: string;
}

export const Arrow: FC<Props> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props}><path d="m5.016 0-2.51 2.5L0 4.999 5.016 5l5.017-.001L7.525 2.5 5.016 0z" /></svg>
    );
};
