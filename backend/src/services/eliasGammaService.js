import eliasGammaValidacao from "../validations/eliasGammaValidacao.js";
import ErroValidacao from "../errors/ErroValidacao.js"
import MENSAGENS_ERRO from "../utils/mensagensErro.js";

const encode = (texto) => {
    eliasGammaValidacao.validarEncodeEliasGamma(texto);

    const comprimido = [];
    const stopBit = "1";

    for(let i = 0; i < texto.length; i++){
        const charCode = texto.charCodeAt(i);

        if(charCode === 0){
            throw new ErroValidacao(
                MENSAGENS_ERRO.ELIAS_GAMMA_NAO_SUPORTA_ZERO
            );
        }

        const n = Math.floor(Math.log2(charCode));
        const maiorPotenciaMenorOuIgual = 2 ** n;
        const resto = charCode - maiorPotenciaMenorOuIgual;

        const prefixo = "0".repeat(n);
        const sufixo = n > 0 ? resto.toString(2).padStart(n, "0") : "";

        const codeword = prefixo + stopBit + sufixo;
        comprimido.push(codeword);
    }

    return comprimido;
};

const decode = (codewords) => {
    eliasGammaValidacao.validarDecodeEliasGamma(codewords);
    let textoDecodificado = "";

    for(let i = 0; i < codewords.length; i++){
        const codeword = codewords[i];
        //n = quantidade de zeros iniciais do prefixo
        const n = (codeword.match(/^0+/) || [""])[0].length;

        const potenciaDeDois = 2 ** n;
        const restoBinario = n > 0 ? codeword.slice(n + 1) : "";
        const restoDecimal = n > 0 ? parseInt(restoBinario, 2) : 0;
        
        const charCode = potenciaDeDois + restoDecimal;
        const simbolo = String.fromCharCode(charCode);

        textoDecodificado += simbolo;
    }
    
    return textoDecodificado;
}

export default { encode, decode };