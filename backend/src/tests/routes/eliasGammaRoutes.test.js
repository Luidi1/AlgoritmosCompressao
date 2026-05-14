import express from "express";
import request from "supertest";
import eliasGammaRoutes from "../../routes/eliasGammaRoutes.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";
import middlewarewErros from "../../middlewares/middlewareErros.js";

const criarAppTeste = () => {
    const app = express();

    app.use(express.json());
    app.use("/elias-gamma", eliasGammaRoutes);

    app.use(middlewarewErros);

    return app;
};

const app = criarAppTeste();

describe("Elias Gamma Routes - encode", () => {
    describe("sucesso", () => {
        test("Deve retornar status 200 e codificar corretamente a palavra 'AULA'", async () => {
            const texto = "AULA";

            const esperado = [
                "0000001" + "000001",
                "0000001" + "010101",
                "0000001" + "001100",
                "0000001" + "000001"
            ];

            const resposta = await request(app)
                .post("/elias-gamma/encode")
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
                .post("/elias-gamma/encode")
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
                .post("/elias-gamma/encode")
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
                .post("/elias-gamma/encode")
                .send({
                    texto: "\u0000"
                });

            expect(resposta.status).toBe(400);

            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.ELIAS_GAMMA_NAO_SUPORTA_ZERO
            });
        });
    });
});

describe("Elias Gamma Routes - decode", () => {
    describe("sucesso", () => {
        test("Deve retornar status 200 e decodificar corretamente a palavra 'AULA'", async () => {
            const codewords = [
                "0000001" + "000001",
                "0000001" + "010101",
                "0000001" + "001100",
                "0000001" + "000001"
            ];

            const esperado = "AULA";

            const resposta = await request(app)
                .post("/elias-gamma/decode")
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
                .post("/elias-gamma/decode")
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
                .post("/elias-gamma/decode")
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