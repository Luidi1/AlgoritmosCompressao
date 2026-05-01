import ErroValidacao from "../../errors/ErroValidacao.js";
import golombService from "../../services/golombService.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";

const CASOS_K_OBRIGATORIO = [
    ["undefined", undefined],
    ["null", null]
];

const CASOS_K_INVALIDO = [
    ["string", "teste"],
    ["decimal", 2.5],
    ["zero", 0],
    ["negativo", -1],
    ["boolean", true],
    ["object", {}],
    ["array", []]
];

describe("Golomb Service - encode", () => {
    describe("sucesso", () => {
        test("Deve codificar corretamente a palavra 'AULA' com k = 4", () => {
            const texto = "AULA";
            const k = 4;

            const resultado = golombService.encode(texto, k);

            const A = "0".repeat(16) + "1" + "01";
            const U = "0".repeat(21) + "1" + "01";
            const L = "0".repeat(19) + "1" + "00";
            const A2 = A;

            const esperado = [A, U, L, A2];

            expect(resultado).toEqual(esperado);
        });
    });

    describe("campos obrigatórios", () => {
        test.each([
            ["vazio", ""],
            ["undefined", undefined],
            ["null", null]
        ])("Deve lançar erro quando texto for %s", (_, valor) => {
            const executar = () => golombService.encode(valor, 2);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("texto"));
        });

        test.each(CASOS_K_OBRIGATORIO)("Deve lançar erro quando k for %s", (_, valor) => {
            const executar = () => golombService.encode("A", valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("k"));
        });
    });

    describe("valores inválidos", () => {
        test.each([
            ["number", 123],
            ["boolean", true],
            ["object", {}],
            ["array", []]
        ])("Deve lançar erro quando texto for %s", (_, valor) => {
            const executar = () => golombService.encode(valor, 2);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.TEXTO_INVALIDO);
        });

        test.each(CASOS_K_INVALIDO)("Deve lançar erro quando k for %s", (_, valor) => {
            const executar = () => golombService.encode("A", valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.K_INVALIDO);
        });
    });
});

describe("Golomb Service - decode", () => {
    describe("sucesso", () => {
        test("Deve decodificar corretamente a palavra 'AULA' com k = 4", () => {
            const codewords = [
                "0".repeat(16) + "1" + "01",
                "0".repeat(21) + "1" + "01",
                "0".repeat(19) + "1" + "00",
                "0".repeat(16) + "1" + "01"
            ];

            const k = 4;

            const resultado = golombService.decode(codewords, k);

            expect(resultado).toBe("AULA");
        });
    });

    describe("campos obrigatórios", () => {
        test.each([
            ["undefined", undefined],
            ["null", null]
        ])("Deve lançar erro quando codewords for %s", (_, valor) => {
            const executar = () => golombService.decode(valor, 2);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("codewords"));
        });

        test.each(CASOS_K_OBRIGATORIO)("Deve lançar erro quando k for %s", (_, valor) => {
            const executar = () => golombService.decode(["101"], valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("k"));
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
            const executar = () => golombService.decode(valor, 2);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORDS_INVALIDO);
        });

        test.each([
            ["number", 123],
            ["boolean", true],
            ["object", {}],
            ["array", []]
        ])("Deve lançar erro quando codeword dentro do array for %s", (_, valor) => {
            const executar = () => golombService.decode([valor], 2);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_NAO_STRING(0));
        });

        test("Deve lançar erro quando codeword for vazio", () => {
            const executar = () => golombService.decode([""], 2);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_VAZIO(0));
        });

        test.each([
            ["possui letra", "10A01"],
            ["possui número diferente de 0 e 1", "10201"],
            ["possui espaço", "10 01"]
        ])("Deve lançar erro quando codeword %s", (_, valor) => {
            const executar = () => golombService.decode([valor], 2);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_BINARIO_INVALIDO(0));
        });

        test("Deve lançar erro quando codeword não tiver stop bit", () => {
            const executar = () => golombService.decode(["0000"], 2);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_SEM_STOP_BIT(0));
        });

        test.each([
            ["curto demais", "1"],
            ["longo demais", "1010"]
        ])("Deve lançar erro quando codeword tiver tamanho %s", (_, valor) => {
            const executar = () => golombService.decode([valor], 2);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_TAMANHO_INVALIDO(0));
        });

        test.each(CASOS_K_INVALIDO)("Deve lançar erro quando k for %s", (_, valor) => {
            const executar = () => golombService.decode(["101"], valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.K_INVALIDO);
        });
    });
});