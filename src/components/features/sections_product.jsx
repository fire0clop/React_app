import React from 'react';
import '../../static/section_product.css';
import micg from '../../static/image/microgreen_sect.jpg';
import flow from '../../static/image/flower_sect.jpg';


const SectionsProduct = () => {
    const categories = [
        { name: 'Цветы', image: flow, link: '/categories/flowers' },
        { name: 'Микрозелень', image: micg, link: '/categories/microgreens' },
        { name: 'Микс салаты', image: '/static/image/salads.jpg', link: '/categories/salads' },
    ];

    return (
        <section className="categories-section">
            <h2 className="categories-title">Ознакомьтесь с нашими категориями</h2>
            <div className="categories-grid">
                {categories.map((category) => (
                    <div key={category.name} className="category-card">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="category-image"
                        />
                        <div className="category-content">
                            <h3 className="category-name">{category.name}</h3>
                            <p className="category-description">
                                Откройте для себя лучшие предложения в категории "{category.name}".
                            </p>
                            <a href={category.link} className="category-button">
                                Перейти
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SectionsProduct;