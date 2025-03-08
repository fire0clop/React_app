require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({
    origin: "*", // Разрешает запросы со всех устройств
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Сервер запущен на http://0.0.0.0:${PORT}`);
});


