import ErroValidacao from "../../errors/ErroValidacao.js";
import golombService from "../../services/golombService.js";
import MENSAGENS_ERRO from "../../utils/mensagensErro.js";

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

        test.each([
            ["undefined", undefined],
            ["null", null]
        ])("Deve lançar erro quando k for %s", (_, valor) => {
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

        test.each([
            ["string", "teste"],
            ["decimal", 2.5],
            ["zero", 0],
            ["negativo", -1],
            ["boolean", true],
            ["object", {}]
        ])("Deve lançar erro quando k for %s", (_, valor) => {
            const executar = () => golombService.encode("A", valor);

            expect(executar).toThrow(ErroValidacao);
            expect(executar).toThrow(MENSAGENS_ERRO.K_INVALIDO);
        });
    });
});