import express from "express";
import connectDb from "./config/db.js";
import getUrl from "./routes/index.js";
import createUrl from "./routes/url.js";

const app = express();

// DB configuration
connectDb();

app.use(express.json({ extended: false }));
app.use("/", createUrl);
app.use("/api/url", getUrl);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));
