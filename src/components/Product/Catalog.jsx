import React, { useState, useEffect } from "react";
import "../../static/catalog.css"; // Подключение стилей
import { Link } from "react-router-dom";

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                if (!response.ok) {
                    throw new Error("Не удалось загрузить товары.");
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    useEffect(() => {
        filterProducts();
    }, [searchQuery, selectedCategory]);
    const filterProducts = () => {
        let filtered = products;
        if (selectedCategory !== "all") {
            filtered = filtered.filter(
                (product) => String(product.category) === selectedCategory
            );
        }
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    if (loading) {
        return <p className="loading-message">Загрузка...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <section className="catalog">
            <h2 className="catalog-title">Наши продукты</h2>
            <div className="catalog-filters">
                <div className="catalog-search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="catalog-search"
                    />
                </div>
                <div className="catalog-category-filter">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="catalog-category-select"
                    >
                        <option value="all">Все товары</option>
                        <option value="1">Микрозелень</option>
                        <option value="2">Салаты</option>
                        <option value="3">Цветы</option>
                    </select>
                </div>
            </div>
            <div className="catalog-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div className="catalog-card" key={product.id}>
                            <img
                                src={product.main_image_url || "/images/default.jpg"}
                                alt={product.name}
                                className="catalog-card-image"
                            />
                            <div className="catalog-card-content">
                                <h3 className="catalog-card-title">{product.name}</h3>
                                <p className="catalog-card-price">{product.price} ₽</p>
                                <Link to={`/product/${product.id}`} className="catalog-card-link">
                                    Подробнее
                                </Link>

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">Ничего не найдено</p>
                )}
            </div>
        </section>
    );
};

export default Catalog;