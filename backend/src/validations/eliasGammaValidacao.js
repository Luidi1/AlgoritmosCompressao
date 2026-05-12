import ErroValidacao from "../errors/ErroValidacao.js"
import MENSAGENS_ERRO from "../utils/mensagensErro.js";

const validarEncodeEliasGamma = (texto) => {
    if(texto === undefined || texto === "" || texto === null){
        throw new ErroValidacao(MENSAGENS_ERRO.CAMPO_OBRIGATORIO("texto"));
    }

    if(typeof texto !== "string"){
        throw new ErroValidacao(MENSAGENS_ERRO.TEXTO_INVALIDO);
    }
}

const validarDecodeEliasGamma = (codewords) => {
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

        if(codeword === ""){
            throw new ErroValidacao(
                MENSAGENS_ERRO.CODEWORD_VAZIO(i)
            );
        }

        if(!/^[01]+$/.test(codeword)){
            throw new ErroValidacao(
                MENSAGENS_ERRO.CODEWORD_BINARIO_INVALIDO(i)
            );
        }

        const indiceStopBit = codeword.indexOf("1");

        if(indiceStopBit === -1){
            throw new ErroValidacao(
                MENSAGENS_ERRO.CODEWORD_SEM_STOP_BIT(i)
            );
        }

        const tamanhoSufixo = indiceStopBit;

        const tamanhoEsperado = indiceStopBit + 1 + tamanhoSufixo;

        if(codeword.length !== tamanhoEsperado){
            throw new ErroValidacao(
                MENSAGENS_ERRO.CODEWORD_TAMANHO_INVALIDO_ELIASGAMMA(i)
            );
        }
    }
}

export default { validarEncodeEliasGamma, validarDecodeEliasGamma }