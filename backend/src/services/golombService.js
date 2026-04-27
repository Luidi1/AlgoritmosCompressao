const encode = (texto, k) => {
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

export default { encode }