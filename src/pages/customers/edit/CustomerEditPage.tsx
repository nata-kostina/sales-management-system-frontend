import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { MessageService, messages } from "../../../services/message.service";
import { Routes } from "../../../types/routes";
import { ICustomer } from "../../../models/entities/customer.interface";
import { IEditCustomerResponse, IGetCustomerResponse } from "../../../models/responses/customer.response";
import { CustomerForm } from "../components/form/CustomerForm";

export const CustomerEditPage: FC = () => {
    const { id } = useParams();

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
                        return appService.customers.getCustomer({ id });
                    });
                    setCustomer(response.customer);
                }
            } catch (error) {
                MessageService.error(messages.default);
                setCustomer(null);
                navigate(`../${Routes.Customers}`, { relative: "route" });
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
                return appService.customers.editCustomer({ id, customer: updatedCustomer });
            });
            setCustomer(response.customer);
            const name = updatedCustomer.get("name") as string | null;
            MessageService.success(`The customer ${name && `"${name}" `}was successfully updated.`);
            navigate("../", { relative: "route" });
        } catch (error) {
            MessageService.error("The customer was not updated.");
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
                                <div className="card__footer" />
                            </div>
                        </div>
                    </Section>
                )}
        </>
    );
};
