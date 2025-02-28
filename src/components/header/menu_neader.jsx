import React from 'react';
import '../../static/header.css'
class Menu_neader extends React.Component {
    render() {
        return (
            <div className="menu_header">
                <ul className="menu">
                    <li><a href="/">Главная</a></li>
                    <li><a href="/catalog">Каталог</a></li>
                    <li><a href="/contacts">Контакты</a></li>
                </ul>
            </div>
        )
    }
}
export default Menu_neader