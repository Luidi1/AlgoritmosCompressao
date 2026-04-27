import express from "express";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({ mensagem: "API funcionando" });
});

export default app;