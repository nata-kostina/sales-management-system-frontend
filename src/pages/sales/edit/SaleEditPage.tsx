import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { App } from "antd";
import { Section } from "../../../components/Section/Section";
import { SaleForm } from "../components/form/SaleForm";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { messages } from "../../../services/message.service";
import { ISale } from "../../../models/entities/sale.interface";
import { IGetSaleResponse, IEditSaleResponse } from "../../../models/responses/sales.response";

export const SaleEditPage: FC = () => {
    const { modal } = App.useApp();

    const { id } = useParams();

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
                modal.error({ content: messages.default });
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
            if (!id) { return; }
            console.log({ updatedSale });
            const response = await makeEditSaleRequest(() => {
                return appService.sale.editSale({ id, sale: updatedSale });
            });
            setSale(response.sale);
            const name = updatedSale.get("name") as string | null;
            modal.success({ content: `The sale ${name && `"${name}" `}was successfully updated.` });
            navigate(`..`, { relative: "route" });
        } catch (error) {
            modal.error({ content: "The sale was not updated." });
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
                                        submitBtn="Update item"
                                        handleSubmitForm={handleSubmitForm}
                                    />
                                </div>
                                <div className="card__footer" />
                            </div>
                        </div>
                    </Section>
                )}
        </>
    );
};
