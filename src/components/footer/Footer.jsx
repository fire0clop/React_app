import React from 'react';
import "../../static/footer.css";

class Footer extends React.Component {
    render() {
        return (
            <footer className="main_footer_sect">
                <div className="footer-container">
                    <div className="footer-branding">
                        <h2 className="footer-title">ForExample</h2>
                        <p className="footer-subtitle">Производство микрозелени и пищевых цветов</p>
                    </div>
                    <div className="footer-links">
                        <a href="/" className="footer-link">Главная</a>
                        <a href="/product-form" className="footer-link">Создать продукт</a>
                        <a href="/product-list" className="footer-link">Список продуктов</a>
                    </div>
                    <div className="footer-contact">
                        <p className="footer-contact-name">Иван Иваныч</p>
                        <a href="tel:+1234567890" className="footer-phone">+7 (111) 111-11-11</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 ForExample. Все права защищены.</p>
                </div>
            </footer>
        );
    }
}

export default Footer;