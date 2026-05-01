import ErroValidacao from "../errors/ErroValidacao.js"
import MENSAGENS_ERRO from "../utils/mensagensErro.js";

const validarK = (k) => {
    if(k === undefined || k === null){
        throw new ErroValidacao(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("k"));
    }

    if(!Number.isInteger(k) || k <= 0){
        throw new ErroValidacao(MENSAGENS_ERRO.K_INVALIDO);
    }
}

const validarEncodeGolomb = (texto, k) => {
    if(texto === undefined || texto === "" || texto === null){
        throw new ErroValidacao(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("texto"));
    }

    if(typeof texto !== "string"){
        throw new ErroValidacao(MENSAGENS_ERRO.TEXTO_INVALIDO);
    }

    validarK(k);
}

const validarDecodeGolomb = (codewords, k) => {
    if(codewords === undefined || codewords === null){
        throw new ErroValidacao(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("codewords"));
    }

    if(!Array.isArray(codewords) || codewords.length === 0){
        throw new ErroValidacao(MENSAGENS_ERRO.CODEWORDS_INVALIDO);
    }

    for(let i = 0; i < codewords.length; i++){
    const codeword = codewords[i];

    if(typeof codeword !== "string"){
        throw new ErroValidacao(
            MENSAGENS_ERRO.CODEWORD_NAO_STRING(i)
        );
    }
    
    if (codeword === "") {
        throw new ErroValidacao(
            MENSAGENS_ERRO.CODEWORD_VAZIO(i)
        );
    }

    if (!/^[01]+$/.test(codeword)) {
        throw new ErroValidacao(
            MENSAGENS_ERRO.CODEWORD_BINARIO_INVALIDO(i)
        );
    }
}

    validarK(k);
}

export default { validarEncodeGolomb, validarDecodeGolomb }