import { Operations, Sections } from "../types/entities";

const keySectionMap = {
    [Sections.Categories]: {
        singular: "category",
        plural: "categories",
    },
    [Sections.Customers]: {
        singular: "customer",
        plural: "customers",
    },
    [Sections.Products]: {
        singular: "product",
        plural: "products",
    },
    [Sections.Sales]: {
        singular: "sale",
        plural: "sales",
    },
};

export const content = {
    operation: {
        [Operations.Create]: {
            success: (key: Sections, value: string[]) => value.length === 0 ?
                `The ${keySectionMap[key].singular} was successfully created.`
                : value.length === 1 ?
                    `The ${keySectionMap[key].singular} ${value[0]} was successfully created.` :
                    `The ${keySectionMap[key].plural} were successfully created.`,
            error: (key: Sections, value: string[]) => value.length === 0 ?
                `Error! The ${keySectionMap[key].singular} was not created. Please, try again.`
                : value.length === 1 ?
                    `Error! The ${keySectionMap[key].singular} ${value[0]} was not created. Please, try again.` :
                    `Error! The ${keySectionMap[key].plural} were not created. Please, try again.`,
        },
        [Operations.Delete]: {
            success: (key: Sections, value: string[]) => value.length === 0 ?
                `The ${keySectionMap[key].singular} was successfully deleted.`
                : value.length === 1 ?
                    `The ${keySectionMap[key].singular} ${value[0]} was successfully deleted.` :
                    `The ${keySectionMap[key].plural} were successfully deleted.`,
            error: (key: Sections, value: string[]) => value.length === 0 ?
                `Error! The ${keySectionMap[key].singular} was not deleted. Please, try again.`
                : value.length === 1 ?
                    `Error! The ${keySectionMap[key].singular} ${value[0]} was not deleted. Please, try again.` :
                    `Error! The ${keySectionMap[key].plural} were not deleted. Please, try again.`,
        },
        [Operations.Edit]: {
            success: (key: Sections, value: string[]) => value.length === 0 ?
                `The ${keySectionMap[key].singular} was successfully updated.`
                : value.length === 1 ?
                    `The ${keySectionMap[key].singular} ${value[0]} was successfully updated.` :
                    `The ${keySectionMap[key].plural} were successfully updated.`,
            error: (key: Sections, value: string[]) => value.length === 0 ?
                `Error! The ${keySectionMap[key].singular} was not updated. Please, try again.`
                : value.length === 1 ?
                    `Error! The ${keySectionMap[key].singular} ${value[0]} was not updated. Please, try again.` :
                    `Error! The ${keySectionMap[key].plural} were not updated. Please, try again.`,
        },
    },
    error: {
        notFound: () => "The value is not found.",
    },
    confirm: {
        delete: (key: Sections, value: string[]) => value.length === 0 ?
            `Are you sure you want to delete the ${keySectionMap[key].singular}?`
            : value.length === 1 ?
                `Are you sure you want to delete the ${keySectionMap[key].singular} ${value[0]}?` :
                `Are you sure you want to delete the ${keySectionMap[key].plural}?`,
    },
};
