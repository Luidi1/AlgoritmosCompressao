import { jest } from "@jest/globals";
import ErroValidacao from "../../errors/ErroValidacao.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";

const fibonacciZeckendorfService = {
    encode: jest.fn(),
    decode: jest.fn()
};

jest.unstable_mockModule("../../services/fibonacciZeckendorfService.js", () => ({
    default: fibonacciZeckendorfService
}));

const fibonacciZeckendorfController = (
    await import("../../controllers/fibonacciZeckendorfController.js")
).default;

describe("Fibonacci Zeckendorf Controller - encode", () => {
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
                "0100100011",
                "1000101011",
                "0010010011",
                "0100100011"
            ];

            fibonacciZeckendorfService.encode.mockReturnValue(resultado);

            fibonacciZeckendorfController.encode(req, res, next);

            expect(fibonacciZeckendorfService.encode)
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

            fibonacciZeckendorfService.encode.mockImplementation(() => {
                throw erro;
            });

            fibonacciZeckendorfController.encode(req, res, next);

            expect(fibonacciZeckendorfService.encode)
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

            fibonacciZeckendorfService.encode.mockImplementation(() => {
                throw erro;
            });

            fibonacciZeckendorfController.encode(req, res, next);

            expect(fibonacciZeckendorfService.encode)
                .toHaveBeenCalledWith(req.body.texto);

            expect(next).toHaveBeenCalledWith(erro);

            expect(res.status).not.toHaveBeenCalled();

            expect(res.json).not.toHaveBeenCalled();
        });

        test("Deve chamar next quando texto possuir caractere com charCode 0", () => {
            req.body.texto = "\u0000";

            const erro = new ErroValidacao(
                MENSAGENS_ERRO.FIBONACCI_ZECKENDORF_NAO_SUPORTA_ZERO
            );

            fibonacciZeckendorfService.encode.mockImplementation(() => {
                throw erro;
            });

            fibonacciZeckendorfController.encode(req, res, next);

            expect(fibonacciZeckendorfService.encode)
                .toHaveBeenCalledWith(req.body.texto);

            expect(next).toHaveBeenCalledWith(erro);

            expect(res.status).not.toHaveBeenCalled();

            expect(res.json).not.toHaveBeenCalled();
        });
    });
});

describe("Fibonacci Zeckendorf Controller - decode", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            body: {
                codewords: [
                    "0100100011",
                    "1000101011",
                    "0010010011",
                    "0100100011"
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

            fibonacciZeckendorfService.decode.mockReturnValue(resultado);

            fibonacciZeckendorfController.decode(req, res, next);

            expect(fibonacciZeckendorfService.decode)
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

            fibonacciZeckendorfService.decode.mockImplementation(() => {
                throw erro;
            });

            fibonacciZeckendorfController.decode(req, res, next);

            expect(fibonacciZeckendorfService.decode)
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

            fibonacciZeckendorfService.decode.mockImplementation(() => {
                throw erro;
            });

            fibonacciZeckendorfController.decode(req, res, next);

            expect(fibonacciZeckendorfService.decode)
                .toHaveBeenCalledWith(req.body.codewords);

            expect(next).toHaveBeenCalledWith(erro);

            expect(res.status).not.toHaveBeenCalled();

            expect(res.json).not.toHaveBeenCalled();
        });
    });
});