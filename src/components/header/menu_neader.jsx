import React, { useState } from 'react';
import '../../static/header.css';

const Menu_neader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="menu_container">
            {/* Бургер-кнопка */}
            <button className="burger" onClick={toggleMenu}>
                ☰
            </button>

            {/* Меню, которое открывается при нажатии */}
            <ul className={`menu ${isOpen ? 'menu_open' : ''}`}>
                <li><a href="/">Главная</a></li>
                <li><a href="/catalog">Каталог</a></li>
                <li><a href="/contacts">Контакты</a></li>
            </ul>
        </nav>
    );
};

export default Menu_neader;
