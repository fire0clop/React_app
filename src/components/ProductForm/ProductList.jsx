import React, { useState, useEffect } from "react";
import "../../static/create_p_form.css";
import { useNavigate } from "react-router-dom";
const ProductList = () => {

    const navigate = useNavigate();

    const handleEdit = (productId) => {
        const productToEdit = products.find((product) => product.id === productId);

        if (!productToEdit) {
            alert("Продукт не найден!");
            return;
        }
        navigate("/product-form", { state: { product: productToEdit } });
    };

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) {
                    console.error("Ошибка при загрузке продуктов");
                    return;
                }

                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Ошибка на стороне клиента:", error);
            }
        };

        fetchProducts();
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот продукт?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                alert("Ошибка при удалении продукта");
                return;
            }
            setProducts(products.filter((product) => product.id !== id));
            alert("Продукт успешно удален!");
        } catch (error) {
            console.error("Ошибка на стороне клиента:", error);
        }
    };

    return (
        <section className="product-list-section">
            <h2 className="section-title">Список продуктов</h2>

            {loading ? (
                <p>Загрузка продуктов...</p>
            ) : products.length === 0 ? (
                <p>Продуктов нет.</p>
            ) : (
                <div className="product-table-container">
                    <div className="product-table">
                        <div className="table-header">
                            <div className="table-column">Название</div>
                            <div className="table-column">Описание</div>
                            <div className="table-column">Цена</div>
                            <div className="table-column">Вес</div>
                            <div className="table-column">Действия</div>
                        </div>
                        {products.map((product) => (
                            <div className="table-row" key={product.id}>
                                <div className="table-column">{product.name}</div>
                                <div className="table-column">{product.description}</div>
                                <div className="table-column">{product.price} руб.</div>
                                <div className="table-column">{product.weight} гр.</div>
                                <div className="table-column">
                                    <button
                                        onClick={() => handleEdit(product.id)}
                                        className="edit-button"
                                    >
                                        Редактировать
                                    </button>
                                </div>

                                <div className="table-column">
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="delete-button"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductList;