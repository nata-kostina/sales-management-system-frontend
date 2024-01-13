import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { MessageService, messages } from "../../../services/message.service";
import { Routes } from "../../../types/routes";
import { ICategory } from "../../../models/entities/category.interface";
import { IEditCategoryResponse, IGetCategoryResponse } from "../../../models/responses/category.response";
import { CategoryForm } from "../components/form/CategoryForm";

export const CategoryEditPage: FC = () => {
    const { id } = useParams();

    const [category, setCategory] = useState<ICategory | null>(null);

    const [areFormFieldsLoading, setAreFormFieldsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isGetCategoryLoading, makeRequest: makeGetCategoryRequest } = useFetch<IGetCategoryResponse>(true);
    const { isLoading: isEditCategoryLoading, makeRequest: makeEditCategoryRequest } = useFetch<IEditCategoryResponse>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                if (id) {
                    const response = await makeGetCategoryRequest(() => {
                        return appService.categories.getCategory({ id });
                    });
                    setCategory(response.category);
                }
            } catch (error) {
                MessageService.error(messages.default);
                setCategory(null);
                navigate(`../${Routes.Categories}`, { relative: "route" });
            }
        };
        fetchCategory();
    }, []);

    useEffect(() => {
        setIsLoading(isGetCategoryLoading || isEditCategoryLoading || areFormFieldsLoading);
    }, [isGetCategoryLoading, isEditCategoryLoading, areFormFieldsLoading]);

    const changeIsFormLoading = (value: boolean) => {
        setAreFormFieldsLoading(value);
    };

    const handleSubmitForm = async (updatedCategory: FormData) => {
        try {
            if (!id) { return; }
            const response = await makeEditCategoryRequest(() => {
                return appService.categories.editProduct({ id, category: updatedCategory });
            });
            setCategory(response.category);
            const name = updatedCategory.get("name") as string | null;
            MessageService.success(`The category ${name && `"${name}" `}was successfully updated.`);
            navigate("../", { relative: "route" });
        } catch (error) {
            MessageService.error("The category was not updated.");
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            {category &&
                (
                    <Section title="Edit category" name="section-category-edit">
                        <div className="card">
                            <div className="card__inner">
                                <div className="card__body">
                                    <CategoryForm
                                        changeIsFormLoading={changeIsFormLoading}
                                        category={category}
                                        name="edit"
                                        submitBtn="Update category"
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
