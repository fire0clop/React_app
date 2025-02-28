import React, { useState } from "react";
// import "../../static/form.css";

const QuestionForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        question: "",
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, contact, question } = formData;

        if (!name || !contact || !question) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/products/question-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    contact,
                    question,
                }),
            });


            if (response.ok) {
                setSuccess(true);
                setFormData({ name: "", contact: "", question: "" });
            } else {
                alert("Не удалось отправить сообщение. Попробуйте позже.");
            }
        } catch (error) {
            console.error("Ошибка отправки:", error);
            alert("Произошла ошибка при обработке запроса.");
        }
    };

    return (
        <div className="question-form">
            <h2>Оставьте свой вопрос</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Ваше имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Введите ваше имя"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Контакт (телефон или email)</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Введите ваш контакт"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="question">Ваш вопрос</label>
                    <textarea
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        placeholder="Введите ваш вопрос"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Отправить</button>
            </form>
            {success && <p className="success-message">Спасибо, ваш вопрос отправлен!</p>}
        </div>
    );
};

export default QuestionForm;