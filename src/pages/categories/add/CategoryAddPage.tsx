import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ICategory } from "../../../models/entities/category.interface";
import { IAddCategoryResponse } from "../../../models/responses/category.response";
import { CategoryForm } from "../components/form/CategoryForm";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { content } from "../../../data/content";
import { Sections } from "../../../types/entities";
import { getDisplayedValueFromItems } from "../../../utils/helper";

export const CategoryAddPage: FC = () => {
    const [category, setCategory] = useState<Omit<ICategory, "id"> | null>(null);

    const [areFormFieldsLoading, setAreFormFieldsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isAddCategoryLoading, makeRequest: makeAddCategoryRequest } = useFetch<IAddCategoryResponse>();

    const { modalSuccess, modalError } = useModalOperationResult();

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
                return appService.category.addCategory(newCategory);
            });
            setCategory(response.category);
            const value = getDisplayedValueFromItems([response.category], response.category.id);
            modalSuccess(content.operation.create.success(Sections.Categories, value));
            navigate("..", { relative: "route" });
        } catch (error) {
            modalError(content.operation.create.error(Sections.Categories, []));
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
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
                    </div>
                </div>
            </Section>
        </>
    );
};
