import { FC } from "react";
import { Section } from "../components/Section";

export const ProductViewPage: FC = () => {
    return (
        <>
            <Section title="View products" name="section-product-view">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__header" />
                        <div className="card__body" />
                        <div className="card__footer" />
                    </div>
                </div>
            </Section>
        </>
    );
};
