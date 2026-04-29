import golombService from "../../services/golombService.js";

describe("Golomb Service - encode", () => {
    test("Deve codificar corretamente a palavra 'AULA' com 'k = 4'", () => {
        const texto = "AULA";
        const k = 4;

        const resultado = golombService.encode(texto, k);

        //vamos calcular manualmente o esperado:

        //A = 65
        //Prefixo = 65/4 -> 16 zeros
        //Stop bit = 1
        //sufixo = 65 % 4 -> 1 resto
        //tamanho do sufixo = log2(4) -> 2 bits
        const A = "0".repeat(16) + "1" + "01";

        const U = "0".repeat(21) + "1" + "01";

        const L = "0".repeat(19) + "1" + "00";

        //A novamente
        const A2 = A;

        const esperado = [A, U, L, A2];

        expect(resultado).toEqual(esperado);
    });

    /*test("Deve retornar uma mensagem de erro caso o texto for vazio.", () => {
        const texto = "";
        const k = 2;

        const resultado = golombService(texto, k);

        expect(resultado).to
    });*/
})