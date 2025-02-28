import React from "react";
import "../../static/description_features.css";
import saladGif from "../../static/image/icon_sprout.png";
const ProductDescription = () => {
    return (
        <section className="product-description-section">
            <div className="container">

                <div className="title-block">
                    <h1 className="section-title">Идеальный продукт для профессиональной кухни</h1>
                    <p className="section-subtitle">
                        Микрозелень – это молодые побеги растений, собранные на ранних стадиях роста. Она не только придаёт блюдам яркий вкус и насыщенный аромат, но и делает подачу более эстетичной и свежей.
                    </p>
                    <img src={saladGif} alt="Decorative leaves" className="section-decoration" />
                </div>
                <div className="advantages">
                    <h2 className="block-title">Почему наша продукция удобна для ресторанов?</h2>
                    <div className="advantage-cards">
                        <div className="advantage-card">
                            <i className="fas fa-leaf advantage-icon"></i>
                            <h3>Микрозелень без земли</h3>
                            <p>
                                Выращиваем её на специальной пищевой вате. Это значит, что на кухне не будет грязи, земли или корней – только чистый, свежий продукт.
                            </p>
                        </div>
                        <div className="advantage-card">
                            <i className="fas fa-box advantage-icon"></i>
                            <h3>Готовые салаты в упаковке</h3>
                            <p>
                                Наши миксы из зелени поставляются в пакетах. Нужно только добавить их к блюду.
                            </p>
                        </div>
                        <div className="advantage-card">
                            <i className="fas fa-flower advantage-icon"></i>
                            <h3>Съедобные цветы</h3>
                            <p>
                                Свежесть сохраняется дольше благодаря влажной подложке. Цветы готовы к использованию сразу после вскрытия упаковки.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="uses">
                    <h2 className="block-title">Как можно использовать продукцию?</h2>
                    <ul className="use-list">
                        <li>Готовые салаты – как основа или дополнение к блюдам.</li>
                        <li>Топпинг для горячих блюд, боулов, паст и закусок.</li>
                        <li>Декор десертов и коктейлей съедобными цветами.</li>
                        <li>Эксперименты с сочетанием с морепродуктами, сырами, мясом и фруктами.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProductDescription;
