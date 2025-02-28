import React, { useEffect, useState } from "react";
import "../../static/contact.css";

import tg from "../../static/image/icon_telegram.png";
import whatsapp from "../../static/image/icon_whatsapp.png";
import phone from "../../static/image/icon_phone.png";

const Contact = () => {
    const [activeIcon, setActiveIcon] = useState(0);
    const icons = [
        { id: 1, alt: "Telegram", src: tg },
        { id: 2, alt: "WhatsApp", src: whatsapp },
        { id: 3, alt: "Phone", src: phone },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIcon((prev) => (prev + 1) % icons.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [icons.length]);

    return (
        <section className="contact-section">
            <div className="contact-content">
                <h2 className="contact-title">Свяжитесь с нами</h2>
                <div className="contact-buttons">
                    <div className="phone-wrapper">
                        <button className="contact-button phone-button">
                            +7 (111) 111-11-11
                        </button>
                        <div className="dropdown-menu">
                            {icons.map((icon, index) => {
                                let link = "#";
                                switch (icon.alt) {
                                    case "Telegram":
                                        link = "https://t.me/";
                                        break;
                                    case "WhatsApp":
                                        link = "https://wa.me/";
                                        break;
                                    case "Phone":
                                        link = "tel:+1111111111";
                                        break;
                                    default:
                                        break;
                                }

                                return (
                                    <a
                                        key={icon.id}
                                        href={link}
                                        className={`dropdown-icon ${activeIcon === index ? "active" : ""}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={icon.src}
                                            alt={icon.alt}
                                            className="icon-image"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <a
                        href="mailto:re"
                        className="contact-button email-button"
                    >
                        for_example@mail.ru
                    </a>

                </div>
            </div>
        </section>
    );
};

export default Contact;