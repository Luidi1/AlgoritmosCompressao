import ErroValidacao from "../../errors/ErroValidacao.js";
import eliasGammaService from "../../services/eliasGammaService.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";

describe("Elias Gamma Service - encode", () => {
    describe("sucesso", () => {
        test("Deve codificar corretamente a palavra 'AULA'", () => {
            const texto = "AULA";

            const resultado = eliasGammaService.encode(texto);

            const A = "0000001" + "000001";
            const U = "0000001" + "010101";
            const L = "0000001" + "001100";
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
            const executar = () => eliasGammaService.encode(valor);

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
            const executar = () => eliasGammaService.encode(valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.TEXTO_INVALIDO);
        });

        test("Deve lançar erro quando texto possuir caractere com charCode 0", () => {
            const executar = () => eliasGammaService.encode("\u0000");

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.ELIAS_GAMMA_NAO_SUPORTA_ZERO);
        });
    });
});

describe("Elias Gamma Service - decode", () => {
    describe("sucesso", () => {
        test("Deve decodificar corretamente a palavra 'AULA'", () => {
            const codewords = [
                "0000001" + "000001",
                "0000001" + "010101",
                "0000001" + "001100",
                "0000001" + "000001"
            ];

            const resultado = eliasGammaService.decode(codewords);

            expect(resultado).toBe("AULA");
        });
    });

    describe("campo obrigatório", () => {
        test.each([
            ["undefined", undefined],
            ["null", null]
        ])("Deve lançar erro quando codewords for %s", (_, valor) => {
            const executar = () => eliasGammaService.decode(valor);

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
            const executar = () => eliasGammaService.decode(valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORDS_INVALIDO);
        });

        test.each([
            ["number", 123],
            ["boolean", true],
            ["object", {}],
            ["array", []]
        ])("Deve lançar erro quando codeword dentro do array for %s", (_, valor) => {
            const executar = () => eliasGammaService.decode([valor]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_NAO_STRING(0));
        });

        test("Deve lançar erro quando codeword for vazio", () => {
            const executar = () => eliasGammaService.decode([""]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_VAZIO(0));
        });

        test.each([
            ["possui letra", "10A01"],
            ["possui número diferente de 0 e 1", "10201"],
            ["possui espaço", "10 01"]
        ])("Deve lançar erro quando codeword %s", (_, valor) => {
            const executar = () => eliasGammaService.decode([valor]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_BINARIO_INVALIDO(0));
        });

        test("Deve lançar erro quando codeword não tiver stop bit", () => {
            const executar = () => eliasGammaService.decode(["0000"]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_SEM_STOP_BIT(0));
        });

        test.each([
            ["curto demais", "0000001"],
            ["longo demais", "00000010000010"]
        ])("Deve lançar erro quando codeword tiver tamanho %s", (_, valor) => {
            const executar = () => eliasGammaService.decode([valor]);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.CODEWORD_TAMANHO_INVALIDO_ELIASGAMMA(0));
        });
    });
});