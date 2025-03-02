import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../static/productpage.css";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) throw new Error("Не удалось загрузить данные о товаре");
                const data = await response.json();
                setProduct(data);
                setCurrentImage(data.main_image_url);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Загрузка данных о товаре...</p>;
    if (error) return <p>Ошибка загрузки: {error}</p>;
    if (!product) return <p>Товар не найден</p>;
    const allImages = product.secondaryImages?.length
        ? [product.main_image_url, ...product.secondaryImages]
        : [product.main_image_url];
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        lazyLoad: "ondemand", // Загружает картинки при необходимости
        initialSlide: 0, // Убеждаемся, что стартует с первого слайда
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        swipeToSlide: true,
        adaptiveHeight: true,
    };

    return (
        <div className="product-page">
            <div className="product-images">
                <div className="main-image-container">
                    <img
                        src={currentImage}
                        alt={product.name}
                        className="main-image"
                    />
                </div>
                <div className="secondary-images-slider">
                    <Slider {...sliderSettings}>
                        {allImages.map((image, idx) => (
                            <div key={idx}>
                                <img
                                    src={image}
                                    alt={`Миниатюра ${idx + 1}`}
                                    className="secondary-image"
                                    onClick={() => setCurrentImage(image)}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="product-info">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-price">Цена: {product.price} руб.</p>
                <p className="product-description">{product.description}</p>
            </div>
        </div>
    );
};

export default ProductPage;