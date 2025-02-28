import React, { useEffect, useState } from "react";
import "../../static/product_card.css";
const CardInit = ({ mainImg, title }) => {
    return (
        <div className="card-init">
            <img src={mainImg} alt={title} />
            <div className="card-content">
                <button>Подробнее</button>
                <h3>{title}</h3>
            </div>
        </div>
    );
};


const ProductCards = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Ошибка при получении продуктов:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Загрузка...</p>;
    }
    return (
        <div>
            <p className="name_sect">Каталог</p>
            <div className="product-card-container" style={{ display: "flex", gap: "20px", justifyContent: "center" }}>

                {products.map((product) => (
                    <CardInit
                        key={product.id}
                        mainImg={product.main_image_url}
                        title={product.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductCards;