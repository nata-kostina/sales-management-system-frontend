import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ICustomer } from "../../../models/entities/customer.interface";
import { IEditCustomerResponse, IGetCustomerResponse } from "../../../models/responses/customer.response";
import { CustomerForm } from "../components/form/CustomerForm";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { content } from "../../../data/content";
import { getDisplayedValueFromItems } from "../../../utils/helper";
import { Sections } from "../../../types/entities";

export const CustomerEditPage: FC = () => {
    const { id } = useParams();

    const { modalSuccess, modalError } = useModalOperationResult();

    const [customer, setCustomer] = useState<ICustomer | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isGetCustomerLoading, makeRequest: makeGetCustomerRequest } = useFetch<IGetCustomerResponse>(true);
    const { isLoading: isEditCustomerLoading, makeRequest: makeEditCustomerRequest } = useFetch<IEditCustomerResponse>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                if (id) {
                    const response = await makeGetCustomerRequest(() => {
                        return appService.customer.getCustomer({ id });
                    });
                    setCustomer(response.customer);
                }
            } catch (error) {
                modalError(content.error.notFound());
                setCustomer(null);
                navigate("..", { relative: "route" });
            }
        };
        fetchCustomer();
    }, []);

    useEffect(() => {
        setIsLoading(isGetCustomerLoading || isEditCustomerLoading);
    }, [isGetCustomerLoading, isEditCustomerLoading]);

    const handleSubmitForm = async (updatedCustomer: FormData) => {
        try {
            if (!id) { return; }
            const response = await makeEditCustomerRequest(() => {
                return appService.customer.editCustomer({ id, customer: updatedCustomer });
            });
            setCustomer(response.customer);
            const value = getDisplayedValueFromItems([response.customer], response.customer.id);
            modalSuccess(content.operation.edit.success(Sections.Customers, value));
            navigate("..", { relative: "route" });
        } catch (error) {
            modalError(content.operation.edit.error(Sections.Customers, []));
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            {customer &&
                (
                    <Section title="Edit customer" name="section-customer-edit">
                        <div className="card">
                            <div className="card__inner">
                                <div className="card__body">
                                    <CustomerForm
                                        customer={customer}
                                        name="edit"
                                        submitBtn="Update customer"
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
