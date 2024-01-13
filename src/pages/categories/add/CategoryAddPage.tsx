import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { Routes } from "../../../types/routes";
import { MessageService } from "../../../services/message.service";
import { ICategory } from "../../../models/entities/category.interface";
import { IAddCategoryResponse } from "../../../models/responses/category.response";
import { CategoryForm } from "../components/form/CategoryForm";

export const CategoryAddPage: FC = () => {
    const [category, setCategory] = useState<Omit<ICategory, "id"> | null>(null);

    const [areFormFieldsLoading, setAreFormFieldsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isAddCategoryLoading, makeRequest: makeAddCategoryRequest } = useFetch<IAddCategoryResponse>();

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(isAddCategoryLoading || areFormFieldsLoading);
    }, [isAddCategoryLoading, areFormFieldsLoading]);

    const changeIsFormLoading = (value: boolean) => {
        setAreFormFieldsLoading(value);
    };

    const handleSubmitForm = async (newCategory: FormData) => {
        try {
            const response = await makeAddCategoryRequest(() => {
                return appService.categories.addCategory(newCategory);
            });
            setCategory(response.category);
            const name = newCategory.get("name") as string | null;
            MessageService.success(`The category ${name && `"${name}" `}was successfully added.`);
            navigate(`../../${Routes.Categories}`, { relative: "route" });
        } catch (error) {
            MessageService.error("The category was not added.");
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Link to={`../../${Routes.Categories}`} relative="route">Link</Link>
            <Section title="Add category" name="section-categories-add">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__body">
                            <CategoryForm
                                changeIsFormLoading={changeIsFormLoading}
                                category={category}
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
