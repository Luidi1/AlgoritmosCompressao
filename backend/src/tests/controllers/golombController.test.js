import { jest } from "@jest/globals";
import ErroValidacao from "../../errors/ErroValidacao.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";

const golombService = {
    encode: jest.fn(),
    decode: jest.fn()
};

jest.unstable_mockModule("../../services/golombService.js", () => ({
    default: golombService
}));

const golombController = (await import("../../controllers/golombController.js")).default;

describe("Golomb Controller - encode", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            body: {
                texto: "AULA",
                k: 4
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();

        jest.clearAllMocks();
    });

    describe("sucesso", () => {
        test("Deve retornar status 200 e o resultado do encode", () => {
            const resultado = [
                "0".repeat(16) + "1" + "01",
                "0".repeat(21) + "1" + "01",
                "0".repeat(19) + "1" + "00",
                "0".repeat(16) + "1" + "01"
            ];

            golombService.encode.mockReturnValue(resultado);

            golombController.encode(req, res, next);

            expect(golombService.encode).toHaveBeenCalledWith(req.body.texto, req.body.k);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ resultado });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("campos obrigatórios", () => {
        test("Deve chamar next quando texto for obrigatório", () => {
            req.body.texto = undefined;

            const erro = new ErroValidacao(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("texto"));

            golombService.encode.mockImplementation(() => {
                throw erro;
            });

            golombController.encode(req, res, next);

            expect(golombService.encode).toHaveBeenCalledWith(req.body.texto, req.body.k);
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test("Deve chamar next quando k for obrigatório", () => {
            req.body.k = undefined;

            const erro = new ErroValidacao(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("k"));

            golombService.encode.mockImplementation(() => {
                throw erro;
            });

            golombController.encode(req, res, next);

            expect(golombService.encode).toHaveBeenCalledWith(req.body.texto, req.body.k);
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("valores inválidos", () => {
        test("Deve chamar next quando texto for inválido", () => {
            req.body.texto = 123;

            const erro = new ErroValidacao(MENSAGENS_ERRO.TEXTO_INVALIDO);

            golombService.encode.mockImplementation(() => {
                throw erro;
            });

            golombController.encode(req, res, next);

            expect(golombService.encode).toHaveBeenCalledWith(req.body.texto, req.body.k);
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test("Deve chamar next quando k for inválido", () => {
            req.body.k = "teste";

            const erro = new ErroValidacao(MENSAGENS_ERRO.K_INVALIDO);

            golombService.encode.mockImplementation(() => {
                throw erro;
            });

            golombController.encode(req, res, next);

            expect(golombService.encode).toHaveBeenCalledWith(req.body.texto, req.body.k);
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
});

describe("Golomb Controller - decode", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            body: {
                codewords: [
                    "0".repeat(16) + "1" + "01",
                    "0".repeat(21) + "1" + "01",
                    "0".repeat(19) + "1" + "00",
                    "0".repeat(16) + "1" + "01"
                ],
                k: 4
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();

        jest.clearAllMocks();
    });

    describe("sucesso", () => {
        test("Deve retornar status 200 e o resultado do decode", () => {
            const resultado = "AULA";

            golombService.decode.mockReturnValue(resultado);

            golombController.decode(req, res, next);

            expect(golombService.decode).toHaveBeenCalledWith(req.body.codewords, req.body.k);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ resultado });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("campos obrigatórios", () => {
        test("Deve chamar next quando codewords for obrigatório", () => {
            req.body.codewords = undefined;

            const erro = new ErroValidacao(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("codewords"));

            golombService.decode.mockImplementation(() => {
                throw erro;
            });

            golombController.decode(req, res, next);

            expect(golombService.decode).toHaveBeenCalledWith(req.body.codewords, req.body.k);
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test("Deve chamar next quando k for obrigatório", () => {
            req.body.k = undefined;

            const erro = new ErroValidacao(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("k"));

            golombService.decode.mockImplementation(() => {
                throw erro;
            });

            golombController.decode(req, res, next);

            expect(golombService.decode).toHaveBeenCalledWith(req.body.codewords, req.body.k);
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("valores inválidos", () => {
        test("Deve chamar next quando codewords for inválido", () => {
            req.body.codewords = "101";

            const erro = new ErroValidacao(MENSAGENS_ERRO.CODEWORDS_INVALIDO);

            golombService.decode.mockImplementation(() => {
                throw erro;
            });

            golombController.decode(req, res, next);

            expect(golombService.decode).toHaveBeenCalledWith(req.body.codewords, req.body.k);
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        test("Deve chamar next quando k for inválido", () => {
            req.body.k = "teste";

            const erro = new ErroValidacao(MENSAGENS_ERRO.K_INVALIDO);

            golombService.decode.mockImplementation(() => {
                throw erro;
            });

            golombController.decode(req, res, next);

            expect(golombService.decode).toHaveBeenCalledWith(req.body.codewords, req.body.k);
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
});