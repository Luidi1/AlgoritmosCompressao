import ErroValidacao from "../../errors/ErroValidacao.js";
import fibonacciZeckendorfService from "../../services/fibonacciZeckendorfService.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";

describe("Fibonacci Zeckendorf Service - encode", () => {
    describe("sucesso", () => {
        test("Deve codificar corretamente a palavra 'AULA'", () => {
            const texto = "AULA";

            const resultado = fibonacciZeckendorfService.encode(texto);

            const A = "0100100011";
            const U = "1000101011";
            const L = "0000001011";
            const A2 = A;

            const esperado = [A, U, L, A2];

            expect(resultado).toEqual(esperado);
        });
    });

    describe("campo obrigatório", () => {
        test.each([
            ["vazio", ""],
            ["undefined", undefined],
            ["null", null]
        ])("Deve lançar erro quando texto for %s", (_, valor) => {
            const executar = () => fibonacciZeckendorfService.encode(valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("texto"));
        });
    });

    describe("valores inválidos", () => {
        test.each([
            ["number", 123],
            ["boolean", true],
            ["object", {}],
            ["array", []]
        ])("Deve lançar erro quando texto for %s", (_, valor) => {
            const executar = () => fibonacciZeckendorfService.encode(valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.TEXTO_INVALIDO);
        });

        test("Deve lançar erro quando texto possuir caractere com charCode 0", () => {
            const executar = () => fibonacciZeckendorfService.encode("\u0000");

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.FIBONACCI_ZECKENDORF_NAO_SUPORTA_ZERO);
        });
    });
});

describe("Fibonacci Zeckendorf Service - decode", () => {
    describe("sucesso", () => {
        test("Deve decodificar corretamente a palavra 'AULA'", () => {
            const codewords = [
                "0100100011",
                "1000101011",
                "0000001011",
                "0100100011"
            ];

            const resultado = fibonacciZeckendorfService.decode(codewords);

            expect(resultado).toBe("AULA");
        });
    });

    describe("campo obrigatório", () => {
        test.each([
            ["undefined", undefined],
            ["null", null]
        ])("Deve lançar erro quando codewords for %s", (_, valor) => {
            const executar = () => fibonacciZeckendorfService.decode(valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("codewords"));
        });
    });

    describe("valores inválidos", () => {
        test.each([
            ["string", "101"],
            ["number", 123],
            ["boolean", true],
            ["object", {}],
            ["array vazio", []]
        ])("Deve lançar erro quando codewords for %s", (_, valor) => {
            const executar = () => fibonacciZeckendorfService.decode(valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORDS_INVALIDO);
        });

        test.each([
            ["number", 123],
            ["boolean", true],
            ["object", {}],
            ["array", []]
        ])("Deve lançar erro quando codeword dentro do array for %s", (_, valor) => {
            const executar = () => fibonacciZeckendorfService.decode([valor]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_NAO_STRING(0));
        });

        test("Deve lançar erro quando codeword for vazio", () => {
            const executar = () => fibonacciZeckendorfService.decode([""]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_VAZIO(0));
        });

        test.each([
            ["possui letra", "10A01"],
            ["possui número diferente de 0 e 1", "10201"],
            ["possui espaço", "10 01"]
        ])("Deve lançar erro quando codeword %s", (_, valor) => {
            const executar = () => fibonacciZeckendorfService.decode([valor]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_BINARIO_INVALIDO(0));
        });

        test.each([
            ["não termina com 11", "0100100010"],
            ["termina só com um 1", "010010001"]
        ])("Deve lançar erro quando codeword %s", (_, valor) => {
            const executar = () => fibonacciZeckendorfService.decode([valor]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.FIBONACCI_ZECKENDORF_SEM_STOP_BIT);
        });

        test.each([
            ["possui 11 antes do stop bit", "0110011"],
            ["possui representação com Fibonacci consecutivo", "00110011"]
        ])("Deve lançar erro quando codeword %s", (_, valor) => {
            const executar = () => fibonacciZeckendorfService.decode([valor]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.FIBONACCI_ZECKENDORF_REPRESENTACAO_INVALIDA);
        });
    });
});