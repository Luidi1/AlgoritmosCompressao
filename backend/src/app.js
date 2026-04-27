import express from "express";
import golombRoutes from "./routes/golombRoutes.js"

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({ mensagem: "API funcionando" });
});

app.use("/golomb", golombRoutes);

export default app;