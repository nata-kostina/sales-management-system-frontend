import { Editor } from "@tinymce/tinymce-react";
import { Control, Controller, Path, PathValue } from "react-hook-form";

interface Props<T extends object> {
    control: Control<T>;
    error: string | undefined;
    name: Path<T>;
    label: string;
    changeIsFormLoading: (value: boolean) => void;
    defaultValue: PathValue<T, Path<T>>;
}

const API_KEY = import.meta.env.VITE_TINY_API_KEY;

export function EditorField<T extends object>({
    control,
    error,
    name,
    label,
    changeIsFormLoading,
    defaultValue,
}: Props<T>): JSX.Element {
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
                        apiKey={API_KEY}
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
}
