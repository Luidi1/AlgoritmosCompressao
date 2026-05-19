import express from "express";
import request from "supertest";
import fibonacciZeckendorfRoutes from "../../routes/fibonacciZeckendorfRoutes.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";
import middlewarewErros from "../../middlewares/middlewareErros.js";

const criarAppTeste = () => {
    const app = express();

    app.use(express.json());
    app.use("/fibonacci-zeckendorf", fibonacciZeckendorfRoutes);

    app.use(middlewarewErros);

    return app;
};

const app = criarAppTeste();

describe("Fibonacci Zeckendorf Routes - encode", () => {
    describe("sucesso", () => {
        test("Deve retornar status 200 e codificar corretamente a palavra 'AULA'", async () => {
            const texto = "AULA";

            const esperado = [
                "0100100011",
                "1000101011",
                "0000001011",
                "0100100011"
            ];

            const resposta = await request(app)
                .post("/fibonacci-zeckendorf/encode")
                .send({ texto });

            expect(resposta.status).toBe(200);

            expect(resposta.body).toEqual({
                resultado: esperado
            });
        });
    });

    describe("campos obrigatórios", () => {
        test("Deve retornar status 400 quando texto não for enviado", async () => {
            const resposta = await request(app)
                .post("/fibonacci-zeckendorf/encode")
                .send({});

            expect(resposta.status).toBe(400);

            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.CAMPO_OBRIGATORIO("texto")
            });
        });
    });

    describe("valores inválidos", () => {
        test("Deve retornar status 400 quando texto for inválido", async () => {
            const resposta = await request(app)
                .post("/fibonacci-zeckendorf/encode")
                .send({
                    texto: 123
                });

            expect(resposta.status).toBe(400);

            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.TEXTO_INVALIDO
            });
        });

        test("Deve retornar status 400 quando texto possuir charCode 0", async () => {
            const resposta = await request(app)
                .post("/fibonacci-zeckendorf/encode")
                .send({
                    texto: "\u0000"
                });

            expect(resposta.status).toBe(400);

            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.FIBONACCI_ZECKENDORF_NAO_SUPORTA_ZERO
            });
        });
    });
});

describe("Fibonacci Zeckendorf Routes - decode", () => {
    describe("sucesso", () => {
        test("Deve retornar status 200 e decodificar corretamente a palavra 'AULA'", async () => {
            const codewords = [
                "0100100011",
                "1000101011",
                "0000001011",
                "0100100011"
            ];

            const esperado = "AULA";

            const resposta = await request(app)
                .post("/fibonacci-zeckendorf/decode")
                .send({ codewords });

            expect(resposta.status).toBe(200);

            expect(resposta.body).toEqual({
                resultado: esperado
            });
        });
    });

    describe("campos obrigatórios", () => {
        test("Deve retornar status 400 quando codewords não for enviado", async () => {
            const resposta = await request(app)
                .post("/fibonacci-zeckendorf/decode")
                .send({});

            expect(resposta.status).toBe(400);

            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.CAMPO_OBRIGATORIO("codewords")
            });
        });
    });

    describe("valores inválidos", () => {
        test("Deve retornar status 400 quando codewords for inválido", async () => {
            const resposta = await request(app)
                .post("/fibonacci-zeckendorf/decode")
                .send({
                    codewords: "101"
                });

            expect(resposta.status).toBe(400);

            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.CODEWORDS_INVALIDO
            });
        });
    });
});