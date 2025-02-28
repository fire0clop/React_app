import React from 'react';
import '../../static/features.css';
import Dirt from '../../static/image/icon_clean.png'
import Long_t from '../../static/image/icon_dish.png'
import taste from '../../static/image/icon_tasty.png'
import health from '../../static/image/icon_healthy.png'
import effect from '../../static/image/icon_service.png'

const FeatureItem = ({ imageSrc, title }) => {
    return (
        <div className="feature-item">
            <div className="feature-icon">
                <img src={imageSrc} alt={title} />
            </div>
            <p className="feature-title">{title}</p>
        </div>
    );
};
const Features = () => {
    const features = [
        {
            imageSrc: Dirt,
            title: 'Без грязи',
        },
        {
            imageSrc: Long_t,
            title: 'Долгое хранение',
        },
        {
            imageSrc: taste,
            title: 'Яркий вкус',
        },
        {
            imageSrc: health,
            title: 'Полезный продукт',
        },
        {
            imageSrc: effect,
            title: 'Эффектная подача',
        },
    ];

    return (
        <div className="features-wrapper">
            <div className="features-container">
                {features.map((feature, index) => (
                    <FeatureItem key={index} imageSrc={feature.imageSrc} title={feature.title} />
                ))}
            </div>
        </div>
    );
};

export default Features;
