import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ISale } from "../../../models/entities/sale.interface";
import { IAddSaleResponse } from "../../../models/responses/sales.response";
import { SaleForm } from "../components/form/SaleForm";

export const SaleAddPage: FC = () => {
    const { modal } = App.useApp();

    const [sale, setSale] = useState<Omit<ISale, "id"> | null>(null);

    const [areFormOptionsLoading, setAreFormOptionsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isAddSaleLoading, makeRequest: makeAddSaleRequest } = useFetch<IAddSaleResponse>();

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(isAddSaleLoading || areFormOptionsLoading);
    }, [isAddSaleLoading, areFormOptionsLoading]);

    const changeAreFormOptionsLoading = (value: boolean) => {
        setAreFormOptionsLoading(value);
    };

    const handleSubmitForm = async (newSale: FormData) => {
        try {
            const response = await makeAddSaleRequest(() => {
                return appService.sale.addSale(newSale);
            });
            setSale(response.sale);
            modal.success({ content: `The sale was successfully added.` });
            navigate(`..`, { relative: "route" });
        } catch (error) {
            modal.error({ content: "The sale was not added." });
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Section title="Add sale" name="section-sales-add">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__body">
                            <SaleForm
                                changeAreFormOptionsLoading={changeAreFormOptionsLoading}
                                sale={sale}
                                name="add"
                                submitBtn="Add item"
                                handleSubmitForm={handleSubmitForm}
                            />
                        </div>
                        <div className="card__footer" />
                    </div>
                </div>
            </Section>
        </>
    );
};
