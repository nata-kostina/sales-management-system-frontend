import { FC, useEffect, useState } from "react";
import cn from "classnames";
import { Control, Controller, Path } from "react-hook-form";
import { assets } from "../../../utils/assetsManager";
import { DeleteSvg } from "../../vectors/userActions/DeleteSvg";
import { baseURL } from "../../../api";
import { IImage } from "../../../models/entities/image.interface";

interface Props<T extends object> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    error: string | undefined;
    defaultValue: IImage[];
}

export function DnDImages<T extends object>({ name, error, label, control, defaultValue }: Props<T>) {
    const [images, setImages] = useState<File[]>([]);
    useEffect(() => {
        const urlToObject = async (image: IImage) => {
            const response = await fetch(`${baseURL}/${image.filename}`);
            const blob = await response.blob();
            const file = new File([blob], image.originalname, { type: blob.type });

            setImages((prev) => ([...prev, file]));
        };
        defaultValue.map((image) => urlToObject(image));
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // const files: IImageFile[] = [];
            // for (let i = 0; i < e.target.files.length; i++) {
            //     files.push({
            //         src: URL.createObjectURL(e.target.files[i]),
            //         file: e.target.files[i],
            //     });
            // }
            const updatedImages = [...images, ...e.target.files];
            setImages(updatedImages);

            return updatedImages;
        }
        return images;
    };
    const handleDelete = (fileName: string) => {
        const file = images.find((item) => item.name === fileName);
        if (file) {
            const updatedFiles = images.filter((item) => item.name !== file.name);
            setImages(updatedFiles);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const updatedImages = [...images, ...droppedFiles];
            setImages(updatedImages);
            return updatedImages;
        }
        return images;
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
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange } }) => (
                        <>
                            <input
                                type="file"
                                className="input"
                                autoComplete="off"
                                accept="image/*"
                                multiple={true}
                                id={name}
                                onChange={(e) => {
                                    const imagesArr = handleChange(e);
                                    onChange(imagesArr);
                                }}
                            />
                            <div className="preview input">
                                {images.length === 0 ? <DnDLabel name={name} handleDrop={handleDrop} onChange={onChange} />
                                    : <PreviewList onChange={onChange} handleDrop={handleDrop} images={images} name={name} handleDelete={handleDelete} />}
                            </div>
                        </>
                    )}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
}

interface DnDLabelProps {
    name: string;
    handleDrop: (event: React.DragEvent<HTMLLabelElement>) => File[];
    onChange: (value: File[]) => void;
}

const DnDLabel: FC<DnDLabelProps> = ({ name, handleDrop, onChange }) => {
    return (
        <label
            htmlFor={name}
            className="input-file-label"
            onDrop={(e) => {
                const imagesArr = handleDrop(e);
                onChange(imagesArr);
            }}
            onDragOver={(event) => event.preventDefault()}
        >
            <div className="label__inner">
                <img src={assets.ui.dnd} alt="Set of images" className="label__img" />
                <h6 className="label__title">Drop your files here or <span className="text-primary">browse</span></h6>
                {/* <div className="label__subtitle">Maximum size: 50MB</div> */}
            </div>
        </label>
    );
};

interface PreviewListProps {
    images: File[];
    name: string;
    handleDelete: (fileName: string) => void;
    handleDrop: (event: React.DragEvent<HTMLLabelElement>) => File[];
    onChange: (value: File[]) => void;
}

const PreviewList: FC<PreviewListProps> = ({ images, name, handleDelete, handleDrop, onChange }) => {
    return (
        <ul className="preview-list">
            {images.map((image) => (
                <li key={image.name} className="list__item">
                    <img src={URL.createObjectURL(image)} alt={image.name} className="list__item-img" />
                    <div className="list__item_hovered">
                        <p className="list__item-title">{image.name}</p>
                        <button className="btn btn-delete" onClick={() => handleDelete(image.name)}>
                            <DeleteSvg />
                        </button>
                    </div>
                </li>
            ))}
            <li className="list__item list__item_input">
                <DnDLabel name={name} handleDrop={handleDrop} onChange={onChange} />
            </li>
        </ul>
    );
};
