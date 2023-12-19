import { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Control, Controller } from "react-hook-form";
import { IProductFormValues } from "../../../schemas/product.form.schema";

interface Props {
    control: Control<IProductFormValues>;
    error: string | undefined;
    name: keyof IProductFormValues;
    label: string;
    changeIsFormLoading: (value: boolean) => void;
    defaultValue: string;
}

export const EditorField: FC<Props> = ({
    control,
    error,
    name,
    label,
    changeIsFormLoading,
    defaultValue,
}) => {
    return (
        <div className={`input-group input-group-${name}`}>
            <label
                htmlFor={name}
                className="label"
            >
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field: { onChange } }) => (
                    <Editor
                        id={name}
                        apiKey="qstpcv0u0awp2u7zeg44en30xxxuxb6e5kfh1vzsvbdxdef6"
                        init={{
                            plugins: "tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                            toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            mergetags_list: [
                                { value: "First.Name", title: "First Name" },
                                { value: "Email", title: "Email" },
                            ],
                            menubar: false,
                            branding: false,
                            statusbar: false,
                        }}
                        onEditorChange={onChange}
                        onInit={() => changeIsFormLoading(false)}
                        initialValue={defaultValue}
                    />
                )}
            />
            {error && <p className="input-error">{error}</p>}
        </div>

    );
};
