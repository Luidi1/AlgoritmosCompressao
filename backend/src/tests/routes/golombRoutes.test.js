import express from "express";
import request from "supertest";
import ErroValidacao from "../../errors/ErroValidacao.js";
import golombRoutes from "../../routes/golombRoutes.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";
import middlewarewErros from "../../middlewares/middlewareErros.js";

const criarAppTeste = () => {
    const app = express();

    app.use(express.json());
    app.use("/golomb", golombRoutes);

    app.use(middlewarewErros);

    return app;
};

const app = criarAppTeste();

describe("Golomb Routes - encode", () => {
    describe("sucesso", () => {
        test("Deve retornar status 200 e codificar corretamente a palavra 'AULA' com k = 4", async () => {
            const texto = "AULA";
            const k = 4;

            const esperado = [
                "0".repeat(16) + "1" + "01",
                "0".repeat(21) + "1" + "01",
                "0".repeat(19) + "1" + "00",
                "0".repeat(16) + "1" + "01"
            ];

            const resposta = await request(app)
                .post("/golomb/encode")
                .send({ texto, k });

            expect(resposta.status).toBe(200);
            expect(resposta.body).toEqual({
                resultado: esperado
            });
        });
    });

    describe("campos obrigatórios", () => {
        test("Deve retornar status 400 quando texto não for enviado", async () => {
            const resposta = await request(app)
                .post("/golomb/encode")
                .send({
                    k: 2
                });

            expect(resposta.status).toBe(400);
            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.CAMPO_OBRIGATORIO("texto")
            });
        });

        test("Deve retornar status 400 quando k não for enviado", async () => {
            const resposta = await request(app)
                .post("/golomb/encode")
                .send({
                    texto: "AULA"
                });

            expect(resposta.status).toBe(400);
            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.CAMPO_OBRIGATORIO("k")
            });
        });
    });

    describe("valores inválidos", () => {
        test("Deve retornar status 400 quando texto for inválido", async () => {
            const resposta = await request(app)
                .post("/golomb/encode")
                .send({
                    texto: 123,
                    k: 2
                });

            expect(resposta.status).toBe(400);
            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.TEXTO_INVALIDO
            });
        });

        test("Deve retornar status 400 quando k for inválido", async () => {
            const resposta = await request(app)
                .post("/golomb/encode")
                .send({
                    texto: "AULA",
                    k: 0
                });

            expect(resposta.status).toBe(400);
            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.K_INVALIDO
            });
        });
    });
});

describe("Golomb Routes - decode", () => {
    describe("sucesso", () => {
        test("Deve retornar status 200 e decodificar corretamente a palavra 'AULA' com k = 4", async () => {
            const codewords = [
                "0".repeat(16) + "1" + "01",
                "0".repeat(21) + "1" + "01",
                "0".repeat(19) + "1" + "00",
                "0".repeat(16) + "1" + "01"
            ];

            const k = 4;

            const esperado = "AULA";

            const resposta = await request(app)
                .post("/golomb/decode")
                .send({ codewords, k });

            expect(resposta.status).toBe(200);
            expect(resposta.body).toEqual({
                resultado: esperado
            });
        });
    });

    describe("campos obrigatórios", () => {
        test("Deve retornar status 400 quando codewords não for enviado", async () => {
            const resposta = await request(app)
                .post("/golomb/decode")
                .send({
                    k: 2
                });

            expect(resposta.status).toBe(400);
            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.CAMPO_OBRIGATORIO("codewords")
            });
        });

        test("Deve retornar status 400 quando k não for enviado", async () => {
            const resposta = await request(app)
                .post("/golomb/decode")
                .send({
                    codewords: ["101"]
                });

            expect(resposta.status).toBe(400);
            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.CAMPO_OBRIGATORIO("k")
            });
        });
    });

    describe("valores inválidos", () => {
        test("Deve retornar status 400 quando codewords for inválido", async () => {
            const resposta = await request(app)
                .post("/golomb/decode")
                .send({
                    codewords: "101",
                    k: 2
                });

            expect(resposta.status).toBe(400);
            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.CODEWORDS_INVALIDO
            });
        });

        test("Deve retornar status 400 quando k for inválido", async () => {
            const resposta = await request(app)
                .post("/golomb/decode")
                .send({
                    codewords: ["101"],
                    k: 0
                });

            expect(resposta.status).toBe(400);
            expect(resposta.body).toEqual({
                mensagem: MENSAGENS_ERRO.K_INVALIDO
            });
        });
    });
});