import { FC, useState } from "react";
import cn from "classnames";
import { Control, Controller } from "react-hook-form";
import { IProductFormValues } from "../../../schemas/product.form.schema";
import { assets } from "../../../utils/assetsManager";
import { IImageFile } from "../../../types/ui.types";

interface Props {
    control: Control<IProductFormValues>;
    name: keyof IProductFormValues;
    label: string;
    error: string | undefined;
    defaultValue: { src: string; name: string; }[];
}

export const DnDImages: FC<Props> = ({ name, error, label, control, defaultValue }) => {
    const [images, setImages] = useState<IImageFile[]>(() => defaultValue);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files: IImageFile[] = [];
            for (let i = 0; i < e.target.files.length; i++) {
                files.push({
                    src: URL.createObjectURL(e.target.files[i]),
                    name: e.target.files[i].name,
                });
            }
            setImages(files);
        }
    };
    const handleDelete = (fileName: string) => {
        const file = images.find((item) => item.name === fileName);
        if (file) {
            const updatedFiles = images.filter((item) => item.name !== file.name);
            setImages(updatedFiles);
        }
    };
    return (
        <div className={cn(`input-group input-group-${name}`, {
            [`input-group-${name}_no-image`]: images.length === 0,
        })}
        >
            <div className="label">
                {label}
            </div>
            <div className="input-box">
                <div className="preview input">
                    {images.length === 0 ? <DnDLabel name={name} />
                        : <PreviewList images={images} name={name} handleDelete={handleDelete} />}
                </div>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange } }) => (
                        <input
                            type="file"
                            className="input"
                            autoComplete="off"
                            accept="image/*"
                            multiple={true}
                            id={name}
                            onChange={(e) => {
                                handleChange(e);
                                onChange(e);
                            }}
                        />
                    )}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
};

interface DnDLabelProps {
    name: string;
}

const DnDLabel: FC<DnDLabelProps> = ({ name }) => {
    return (
        <label
            htmlFor={name}
            className="input-file-label"
        >
            <div className="label__inner">
                <img src={assets.ui.dnd} alt="Set of images" className="label__img" />
                <h6 className="label__title">Drop your files here or <span className="text-primary">browse</span> </h6>
                {/* <div className="label__subtitle">Maximum size: 50MB</div> */}
            </div>
        </label>
    );
};

interface PreviewListProps {
    images: IImageFile[];
    name: string;
    handleDelete: (fileName: string) => void;
}

const PreviewList: FC<PreviewListProps> = ({ images, name, handleDelete }) => {
    return (
        <ul className="preview-list">
            {images.map((image) => (
                <li key={image.name} className="list__item">
                    <img src={image.src} alt={image.name} className="list__item-img" />
                    <div className="list__item_hovered">
                        <p className="list__item-title">{image.name}</p>
                        <button className="btn btn-delete" onClick={() => handleDelete(image.name)}>
                            <svg className="btn-delete-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <path d="M21 28c0.553 0 1-0.447 1-1v-14c0-0.553-0.447-1-1-1s-1 0.447-1 1v14c0 0.553 0.447 1 1 1zM11 28c0.552 0 1-0.447 1-1v-14c0-0.553-0.448-1-1-1s-1 0.447-1 1v14c0 0.553 0.448 1 1 1zM29 6h-4v-2c0-2.209-1.791-4-4-4h-10c-2.209 0-4 1.791-4 4v2h-4l-3 3c0 0.553 0.448 1 1 1h3v20c0 1.104 0.896 2 2 2h20c1.104 0 2-0.896 2-2v-20h3c0.553 0 1-0.447 1-1l-3-3zM10 4c0-1.104 0.896-2 2-2h8c1.104 0 2 0.896 2 2v2h-12v-2zM26 29c0 0.553-0.447 1-1 1h-18c-0.552 0-1-0.447-1-1v-19h20v19zM16 28c0.553 0 1-0.447 1-1v-14c0-0.553-0.447-1-1-1s-1 0.447-1 1v14c0 0.553 0.447 1 1 1z" />
                            </svg>
                        </button>
                    </div>
                </li>
            ))}
            <li className="list__item list__item_input">
                <DnDLabel name={name} />
            </li>
        </ul>
    );
};
