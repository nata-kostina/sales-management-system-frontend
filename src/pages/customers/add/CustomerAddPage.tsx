import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ICustomer } from "../../../models/entities/customer.interface";
import { IAddCustomerResponse } from "../../../models/responses/customer.response";
import { CustomerForm } from "../components/form/CustomerForm";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { content } from "../../../data/content";
import { Sections } from "../../../types/entities";
import { getDisplayedValueFromItems } from "../../../utils/helper";

export const CustomerAddPage: FC = () => {
    const [customer, setCustomer] = useState<Omit<ICustomer, "id"> | null>(null);

    const { isLoading, makeRequest: makeAddCustomerRequest } = useFetch<IAddCustomerResponse>();

    const { modalSuccess, modalError } = useModalOperationResult();

    const navigate = useNavigate();

    const handleSubmitForm = async (newCustomer: FormData) => {
        try {
            const response = await makeAddCustomerRequest(() => {
                return appService.customer.addCustomer(newCustomer);
            });
            setCustomer(response.customer);
            const value = getDisplayedValueFromItems([response.customer], response.customer.id);
            modalSuccess(content.operation.create.success(Sections.Customers, value));
            navigate("..", { relative: "route" });
        } catch (error) {
            modalError(content.operation.create.error(Sections.Customers, []));
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Section title="Add customer" name="section-customers-add">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__body">
                            <CustomerForm
                                customer={customer}
                                name="add"
                                submitBtn="Add customer"
                                handleSubmitForm={handleSubmitForm}
                            />
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};
