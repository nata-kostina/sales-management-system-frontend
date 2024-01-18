import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { Routes } from "../../../types/routes";
import { MessageService } from "../../../services/message.service";
import { ICustomer } from "../../../models/entities/customer.interface";
import { IAddCustomerResponse } from "../../../models/responses/customer.response";
import { CustomerForm } from "../components/form/CustomerForm";

export const CustomerAddPage: FC = () => {
    const [customer, setCustomer] = useState<Omit<ICustomer, "id"> | null>(null);

    const { isLoading, makeRequest: makeAddCustomerRequest } = useFetch<IAddCustomerResponse>();

    const navigate = useNavigate();

    const handleSubmitForm = async (newCustomer: FormData) => {
        try {
            const response = await makeAddCustomerRequest(() => {
                return appService.customers.addCustomer(newCustomer);
            });
            setCustomer(response.customer);
            const name = newCustomer.get("name") as string | null;
            MessageService.success(`The customer ${name && `"${name}" `}was successfully added.`);
            navigate(`../../${Routes.Customers}`, { relative: "route" });
        } catch (error) {
            MessageService.error("The customer was not added.");
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Link to={`../../${Routes.Customers}`} relative="route">Link</Link>
            <Section title="Add customer" name="section-customers-add">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__body">
                            <CustomerForm
                                customer={customer}
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
