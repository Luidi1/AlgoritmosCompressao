import app from "./app.js";

const PORTA = 3001;

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});