import { FC } from "react";

interface Props {
    title?: string;
    subtitle?: string;
    name: string;
    children: React.ReactNode;
    cl?: string;
}

export const Section: FC<Props> = ({ title, subtitle, children, name, cl }) => {
    return (
        <section className={`section section-products ${name} ${cl}`}>
            <div className="section__inner">
                <div className="section__header">
                    {title && <h2 className="section__title">{title}</h2>}
                    {subtitle && <h3 className="section__subtitle">{subtitle}</h3>}
                </div>
                <div className="section__body">
                    {children}
                </div>
            </div>
        </section>
    );
};
