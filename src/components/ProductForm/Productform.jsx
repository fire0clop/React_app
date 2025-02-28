import React, { useState, useEffect } from "react";
import "../../static/create_p_form.css";
import { useLocation, useNavigate } from "react-router-dom";

const ProductForm = ({ onProductSaved }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const initialProduct = location.state?.product || null;

    const [product, setProduct] = useState(
        initialProduct || {
            name: "",
            description: "",
            price: "",
            weight: "",
            category: "1",
        }
    );

    const [mainImage, setMainImage] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [secondaryImages, setSecondaryImages] = useState([]);
    const [secondaryImagePreviews, setSecondaryImagePreviews] = useState([]);

    useEffect(() => {
        if (initialProduct) {
            setProduct(initialProduct);
        }
    }, [initialProduct]);

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImage(file);
            setMainImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSecondaryImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const updatedFiles = [...secondaryImages];
            const updatedPreviews = [...secondaryImagePreviews];
            updatedFiles[index] = file;
            updatedPreviews[index] = URL.createObjectURL(file);

            setSecondaryImages(updatedFiles);
            setSecondaryImagePreviews(updatedPreviews);
        }
    };

    const handleAddSecondaryImageField = () => {
        setSecondaryImages([...secondaryImages, null]);
        setSecondaryImagePreviews([...secondaryImagePreviews, null]);
    };

    const handleRemoveSecondaryImageField = (index) => {
        const updatedFiles = [...secondaryImages];
        const updatedPreviews = [...secondaryImagePreviews];
        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setSecondaryImages(updatedFiles);
        setSecondaryImagePreviews(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Отправляем следующие данные:", product);

        if (!product.name) {
            alert("Поле 'Название' обязательно для заполнения.");
            return;
        }

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description || "");
        formData.append("price", product.price || 0);
        formData.append("weight", product.weight || 0);
        formData.append("category", product.category);

        if (mainImage) {
            formData.append("mainImage", mainImage);
        }

        secondaryImages.forEach((file) => {
            if (file) {
                formData.append("secondaryImages", file);
            }
        });

        const url = initialProduct
            ? `http://localhost:5000/api/products/${initialProduct.id}`
            : "http://localhost:5000/api/products";
        const method = initialProduct ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                alert(`Ошибка: ${errorDetails.message || "Не удалось сохранить продукт."}`);
                return;
            }

            alert("Продукт успешно сохранён!");

            setProduct({
                name: "",
                description: "",
                price: "",
                weight: "",
                category: "1",
            });
            setMainImage(null);
            setMainImagePreview(null);
            setSecondaryImages([]);
            setSecondaryImagePreviews([]);
            navigate("/products");
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при сохранении продукта.");
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <label className="form-label">
                Название:
                <input
                    name="name"
                    value={product.name}
                    onChange={handleProductChange}
                    className="form-input"
                />
            </label>

            <label className="form-label">
                Описание:
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleProductChange}
                    className="form-textarea"
                />
            </label>

            <label className="form-label">
                Цена:
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleProductChange}
                    className="form-input"
                />
            </label>

            <label className="form-label">
                Вес:
                <input
                    type="number"
                    name="weight"
                    value={product.weight}
                    onChange={handleProductChange}
                    className="form-input"
                />
            </label>

            <label className="form-label">
                Категория:
                <select
                    name="category"
                    value={product.category}
                    onChange={handleProductChange}
                    className="form-select"
                >
                    <option value="1">Микрозелень</option>
                    <option value="2">Салаты</option>
                    <option value="3">Цветы</option>
                </select>
            </label>
            <label className="form-label">
                Главное изображение:
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="form-input"
                />
            </label>
            {mainImagePreview && (
                <div className="image-preview">
                    <img
                        src={mainImagePreview}
                        alt="Предпросмотр главного изображения"
                        className="image-thumbnail"
                    />
                </div>
            )}
            <label className="form-label">
                Дополнительные изображения:
            </label>
            {secondaryImages.map((_, index) => (
                <div key={index}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSecondaryImageChange(index, e)}
                        className="form-input"
                    />
                    {secondaryImagePreviews[index] && (
                        <div className="image-preview">
                            <img
                                src={secondaryImagePreviews[index]}
                                alt={`Предпросмотр №${index + 1}`}
                                className="image-thumbnail"
                            />
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => handleRemoveSecondaryImageField(index)}
                        className="form-button"
                    >
                        Удалить
                    </button>
                </div>
            ))}

            <button type="button" onClick={handleAddSecondaryImageField}>
                Добавить изображение
            </button>

            <button type="submit">Сохранить</button>
        </form>
    );
};

export default ProductForm;