import express from "express";
import golombRoutes from "./routes/golombRoutes.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({ mensagem: "API funcionando" });
});

app.use("/golomb", golombRoutes);

export default app;