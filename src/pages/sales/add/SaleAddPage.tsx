import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ISale } from "../../../models/entities/sale.interface";
import { IAddSaleResponse } from "../../../models/responses/sales.response";
import { SaleForm } from "../components/form/SaleForm";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { content } from "../../../data/content";
import { Sections } from "../../../types/entities";
import { getDisplayedValueFromItems } from "../../../utils/helper";

export const SaleAddPage: FC = () => {
    const [sale, setSale] = useState<Omit<ISale, "id"> | null>(null);

    const [areFormOptionsLoading, setAreFormOptionsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isAddSaleLoading, makeRequest: makeAddSaleRequest } = useFetch<IAddSaleResponse>();

    const { modalSuccess, modalError } = useModalOperationResult();

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
            const value = getDisplayedValueFromItems([response.sale], response.sale.id);
            modalSuccess(content.operation.create.success(Sections.Sales, value));
            navigate("..", { relative: "route" });
        } catch (error) {
            modalError(content.operation.create.error(Sections.Sales, []));
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
                    </div>
                </div>
            </Section>
        </>
    );
};
