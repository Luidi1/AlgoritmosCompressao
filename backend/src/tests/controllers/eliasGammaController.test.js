import { jest } from "@jest/globals";
import ErroValidacao from "../../errors/ErroValidacao.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";

    const eliasGammaService = {
        encode: jest.fn(),
        decode: jest.fn()
    };

jest.unstable_mockModule("../../services/eliasGammaService.js", () => ({
    default: eliasGammaService
}));

const eliasGammaController = (
    await import("../../controllers/eliasGammaController.js")
).default;

describe("Elias Gamma Controller - encode", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            body: {
                texto: "AULA"
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
                "0000001" + "000001",
                "0000001" + "010101",
                "0000001" + "001100",
                "0000001" + "000001"
            ];

            eliasGammaService.encode.mockReturnValue(resultado);

            eliasGammaController.encode(req, res, next);

            expect(eliasGammaService.encode)
                .toHaveBeenCalledWith(req.body.texto);

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith({
                resultado
            });

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("campos obrigatórios", () => {
        test("Deve chamar next quando texto for obrigatório", () => {
            req.body.texto = undefined;

            const erro = new ErroValidacao(
                MENSAGENS_ERRO.CAMPO_OBRIGATORIO("texto")
            );

            eliasGammaService.encode.mockImplementation(() => {
                throw erro;
            });

            eliasGammaController.encode(req, res, next);

            expect(eliasGammaService.encode)
                .toHaveBeenCalledWith(req.body.texto);

            expect(next).toHaveBeenCalledWith(erro);

            expect(res.status).not.toHaveBeenCalled();

            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("valores inválidos", () => {
        test("Deve chamar next quando texto for inválido", () => {
            req.body.texto = 123;

            const erro = new ErroValidacao(
                MENSAGENS_ERRO.TEXTO_INVALIDO
            );

            eliasGammaService.encode.mockImplementation(() => {
                throw erro;
            });

            eliasGammaController.encode(req, res, next);

            expect(eliasGammaService.encode)
                .toHaveBeenCalledWith(req.body.texto);

            expect(next).toHaveBeenCalledWith(erro);

            expect(res.status).not.toHaveBeenCalled();

            expect(res.json).not.toHaveBeenCalled();
        });

        test("Deve chamar next quando texto possuir caractere com charCode 0", () => {
            req.body.texto = "\u0000";

            const erro = new ErroValidacao(
                MENSAGENS_ERRO.ELIAS_GAMMA_NAO_SUPORTA_ZERO
            );

            eliasGammaService.encode.mockImplementation(() => {
                throw erro;
            });

            eliasGammaController.encode(req, res, next);

            expect(eliasGammaService.encode)
                .toHaveBeenCalledWith(req.body.texto);

            expect(next).toHaveBeenCalledWith(erro);

            expect(res.status).not.toHaveBeenCalled();

            expect(res.json).not.toHaveBeenCalled();
        });
    });
});

describe("Elias Gamma Controller - decode", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            body: {
                codewords: [
                    "0000001" + "000001",
                    "0000001" + "010101",
                    "0000001" + "001100",
                    "0000001" + "000001"
                ]
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

            eliasGammaService.decode.mockReturnValue(resultado);

            eliasGammaController.decode(req, res, next);

            expect(eliasGammaService.decode)
                .toHaveBeenCalledWith(req.body.codewords);

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith({
                resultado
            });

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("campos obrigatórios", () => {
        test("Deve chamar next quando codewords for obrigatório", () => {
            req.body.codewords = undefined;

            const erro = new ErroValidacao(
                MENSAGENS_ERRO.CAMPO_OBRIGATORIO("codewords")
            );

            eliasGammaService.decode.mockImplementation(() => {
                throw erro;
            });

            eliasGammaController.decode(req, res, next);

            expect(eliasGammaService.decode)
                .toHaveBeenCalledWith(req.body.codewords);

            expect(next).toHaveBeenCalledWith(erro);

            expect(res.status).not.toHaveBeenCalled();

            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe("valores inválidos", () => {
        test("Deve chamar next quando codewords for inválido", () => {
            req.body.codewords = "101";

            const erro = new ErroValidacao(
                MENSAGENS_ERRO.CODEWORDS_INVALIDO
            );

            eliasGammaService.decode.mockImplementation(() => {
                throw erro;
            });

            eliasGammaController.decode(req, res, next);

            expect(eliasGammaService.decode)
                .toHaveBeenCalledWith(req.body.codewords);

            expect(next).toHaveBeenCalledWith(erro);

            expect(res.status).not.toHaveBeenCalled();

            expect(res.json).not.toHaveBeenCalled();
        });
    });
});