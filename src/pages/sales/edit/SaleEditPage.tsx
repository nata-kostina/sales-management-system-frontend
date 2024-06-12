import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { SaleForm } from "../components/form/SaleForm";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ISale } from "../../../models/entities/sale.interface";
import { IGetSaleResponse, IEditSaleResponse } from "../../../models/responses/sales.response";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { content } from "../../../data/content";
import { Sections } from "../../../types/entities";
import { getDisplayedValueFromItems, logFormData } from "../../../utils/helper";

export const SaleEditPage: FC = () => {
    const { id } = useParams();

    const { modalSuccess, modalError } = useModalOperationResult();

    const [sale, setSale] = useState<ISale | null>(null);

    const [areFormOptionsLoading, setAreFormOptionsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isGetSaleLoading, makeRequest: makeGetSaleRequest } = useFetch<IGetSaleResponse>(true);
    const { isLoading: isEditSaleLoading, makeRequest: makeEditSaleRequest } = useFetch<IEditSaleResponse>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSale = async () => {
            try {
                if (id) {
                    const response = await makeGetSaleRequest(() => {
                        return appService.sale.getSale({ id });
                    });
                    setSale(response.sale);
                }
            } catch (error) {
                modalError(content.error.notFound());
                setSale(null);
                navigate("..", { relative: "route" });
            }
        };
        fetchSale();
    }, []);

    useEffect(() => {
        setIsLoading(isGetSaleLoading || isEditSaleLoading || areFormOptionsLoading);
    }, [isGetSaleLoading, isEditSaleLoading, areFormOptionsLoading]);

    const changeAreFormOptionsLoading = (value: boolean) => {
        setAreFormOptionsLoading(value);
    };

    const handleSubmitForm = async (updatedSale: FormData) => {
        try {
            logFormData(updatedSale);
            if (!id) { return; }
            const response = await makeEditSaleRequest(() => {
                return appService.sale.editSale({ id, sale: updatedSale });
            });
            setSale(response.sale);
            const value = getDisplayedValueFromItems([response.sale], response.sale.id);
            modalSuccess(content.operation.edit.success(Sections.Sales, value));
            navigate("..", { relative: "route" });
        } catch (error) {
            modalError(content.operation.edit.error(Sections.Sales, []));
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            {sale &&
                (
                    <Section title="Edit sale" name="section-sales-edit">
                        <div className="card">
                            <div className="card__inner">
                                <div className="card__body">
                                    <SaleForm
                                        changeAreFormOptionsLoading={changeAreFormOptionsLoading}
                                        sale={sale}
                                        name="edit"
                                        submitBtn="Update sale"
                                        handleSubmitForm={handleSubmitForm}
                                    />
                                </div>
                            </div>
                        </div>
                    </Section>
                )}
        </>
    );
};
