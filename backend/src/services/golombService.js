import golombValidation from "../validations/golombValidacao.js";

const encode = (texto, k) => {
    golombValidation.validarEncodeGolomb(texto, k);

    const comprimido = [];
    const stopBit = "1";

    for(let i = 0; i < texto.length; i++){
        const charCode = texto.charCodeAt(i);

        const tamanhoPrefixo = Math.floor(charCode / k);
        const resto = charCode % k;
        const tamanhoSufixo = Math.ceil(Math.log2(k));

        const prefixo = "0".repeat(tamanhoPrefixo);
        const sufixo = resto.toString(2).padStart(tamanhoSufixo, "0");

        const codeword = prefixo + stopBit + sufixo;

        comprimido.push(codeword);
    }

    return comprimido;
}

const decode = (codewords, k) => {
    golombValidation.validarDecodeGolomb(codewords, k);

    let texto = "";
    const tamanhoSufixo = Math.ceil(Math.log2(k));

    for(let i = 0; i < codewords.length; i++){
        let indice = 0;
        let tamanhoPrefixo = 0;
        let sufixo = "";

        const codeword = codewords[i];

        for(let j = 0; j < codeword.length; j++){
            if(codeword[j] === "1"){
                indice++;
                break;
            }

            tamanhoPrefixo++;
            indice++;
        }

        for(let j = indice; j < indice + tamanhoSufixo; j++){
            sufixo += codeword[j];
        }

        const resto = parseInt(sufixo, 2);
        const charCode = tamanhoPrefixo * k + resto;

        texto += String.fromCharCode(charCode);
    }

    return texto;
}

export default { encode, decode }