const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Pool } = require("pg");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads")); // Папка uploads
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});


router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM product");
        const products = result.rows;
        res.status(200).json(products);
    } catch (error) {
        console.error("Ошибка при получении продуктов:", error.message, error.stack);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.get("/:id", async (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (!productId) {
        return res.status(400).json({ message: "Некорректный ID продукта" });
    }

    try {
        const productResult = await pool.query("SELECT * FROM product WHERE id = $1", [productId]);
        const product = productResult.rows[0];

        if (!product) {
            return res.status(404).json({ message: "Продукт не найден" });
        }
        const imagesResult = await pool.query("SELECT image_url FROM product_images WHERE product_id = $1", [productId]);
        const secondaryImages = imagesResult.rows.map((row) => row.image_url);
        res.status(200).json({
            ...product,
            secondaryImages,
        });
    } catch (error) {
        console.error("Ошибка при получении продукта:", error.message);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});
router.delete("/:id", async (req, res) => {
    const productId = parseInt(req.params.id);

    if (!productId) {
        return res.status(400).json({ message: "Некорректный ID продукта" });
    }

    try {
        const result = await pool.query("DELETE FROM product WHERE id = $1 RETURNING *", [productId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Продукт не найден" });
        }

        res.status(200).json({ message: "Продукт успешно удалён", product: result.rows[0] });
    } catch (error) {
        console.error("Ошибка при удалении продукта:", error.message, error.stack);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});
router.put(
    "/:id",
    upload.fields([
        { name: "mainImage", maxCount: 1 },
        { name: "secondaryImages", maxCount: 10 },
    ]),
    async (req, res) => {
        const { id } = req.params;
        const { name, description, price, weight, category } = req.body;
        const mainImage = req.files.mainImage?.[0]?.filename;
        const secondaryImages = req.files.secondaryImages?.map((file) => file.filename);

        if (!name || !category || !price) {
            return res.status(400).json({ message: "Не все обязательные поля заполнены" });
        }

        try {
            const query = `
                UPDATE product
                SET name = $1, description = $2, price = $3, weight = $4, category = $5${mainImage ? ", main_image_url = $6" : ""}
                WHERE id = $${mainImage ? 7 : 6} RETURNING *;
            `;
            const values = mainImage
                ? [name, description, price, weight, category, `/uploads/${mainImage}`, id]
                : [name, description, price, weight, category, id];

            const result = await pool.query(query, values);

            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Продукт не найден" });
            }

            const updatedProduct = result.rows[0];

            if (secondaryImages && secondaryImages.length) {
                await pool.query("DELETE FROM product_images WHERE product_id = $1", [id]);
                const insertQuery = `
                    INSERT INTO product_images (product_id, image_url)
                    VALUES ($1, unnest($2::text[]));
                `;
                await pool.query(insertQuery, [id, secondaryImages.map((img) => `/uploads/${img}`)]);
            }
            const imagesResult = await pool.query("SELECT image_url FROM product_images WHERE product_id = $1", [id]);
            const secondaryImageUrls = imagesResult.rows.map((row) => row.image_url);

            res.status(200).json({
                message: "Продукт успешно обновлён",
                product: { ...updatedProduct, secondaryImageUrls },
            });
        } catch (error) {
            console.error("Ошибка при обновлении продукта:", error.message);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }
);
router.post("/question-form", async (req, res) => {
    const { name, contact, question } = req.body;
    if (!name || !contact || !question) {
        return res.status(400).json({ message: "Все поля обязательны для заполнения." });
    }
    const message = `
🔥 *Новый вопрос с сайта!*
📝 *Имя*: ${name}
📞 *Контакт*: ${contact}
❓ *Вопрос*: ${question}
    `;

    try {
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.CHAT_ID;
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: "Markdown",
                }),
            }
        );
        if (response.ok) {
            return res.status(200).json({ message: "Сообщение успешно отправлено." });
        } else {
            const errorData = await response.json();
            console.error("Ошибка Telegram API:", errorData);
            return res.status(500).json({ message: "Ошибка при отправке сообщения." });
        }
    } catch (error) {
        console.error("Ошибка сервера:", error);
        return res.status(500).json({ message: "Ошибка при отправке данных в Telegram." });
    }
});
router.post(
    "/",
    upload.fields([
        { name: "mainImage", maxCount: 1 },
        { name: "secondaryImages", maxCount: 10 },
    ]),
    async (req, res) => {
        const { name, description, price, weight, category } = req.body;
        const mainImage = req.files.mainImage?.[0]?.filename;
        const secondaryImages = req.files.secondaryImages?.map((file) => file.filename);

        if (!name || !price || !mainImage || !category) {
            return res.status(400).json({ message: "Не все обязательные поля заполнены" });
        }

        try {
            const productResult = await pool.query(
                "INSERT INTO product (name, description, price, weight, category, main_image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
                [name, description, price, weight, category, `/uploads/${mainImage}`]
            );
            const productId = productResult.rows[0].id;
            if (secondaryImages && secondaryImages.length > 0) {
                const insertPromises = secondaryImages.map((filename) =>
                    pool.query(
                        "INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)",
                        [productId, `/uploads/${filename}`]
                    )
                );
                await Promise.all(insertPromises);
            }

            res.status(200).json({ message: "Продукт успешно добавлен" });
        } catch (error) {
            console.error("Ошибка при добавлении продукта:", error.message, error.stack);
            res.status(500).json({ message: error.message });
        }
    }
);

module.exports = router;