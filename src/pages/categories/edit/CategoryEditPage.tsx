import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ICategory } from "../../../models/entities/category.interface";
import { IEditCategoryResponse, IGetCategoryResponse } from "../../../models/responses/category.response";
import { CategoryForm } from "../components/form/CategoryForm";
import { content } from "../../../data/content";
import { getDisplayedValueFromItems, logFormData } from "../../../utils/helper";
import { Sections } from "../../../types/entities";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";

export const CategoryEditPage: FC = () => {
    const { id } = useParams();

    const { modalSuccess, modalError } = useModalOperationResult();

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
                        return appService.category.getCategory({ id });
                    });
                    setCategory(response.category);
                }
            } catch (error) {
                modalError(content.error.notFound());
                setCategory(null);
                navigate("..", { relative: "route" });
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
            logFormData(updatedCategory);
            if (!id) { return; }
            const response = await makeEditCategoryRequest(() => {
                return appService.category.editProduct({ id, category: updatedCategory });
            });
            setCategory(response.category);
            const value = getDisplayedValueFromItems([response.category], response.category.id);
            modalSuccess(content.operation.edit.success(Sections.Categories, value));
            navigate("..", { relative: "route" });
        } catch (error) {
            modalError(content.operation.edit.error(Sections.Sales, []));
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
                            </div>
                        </div>
                    </Section>
                )}
        </>
    );
};
