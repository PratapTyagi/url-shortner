import express from "express";
import connectDb from "./config/db.js";
const app = express();

// DB configuration
connectDb();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));
