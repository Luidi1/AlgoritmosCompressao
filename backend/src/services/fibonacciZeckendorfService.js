import ErroValidacao from "../errors/ErroValidacao.js";
import MENSAGENS_ERRO from "../utils/mensagensErro.js";
import fibonacciZeckendorfValidacao from "../validations/fibonacciZeckendorfValidacao.js";

const encode = (texto) => {
    fibonacciZeckendorfValidacao.validarEncodeFibonacciZeckendorf(texto);

    const comprimido = [];
    const stopBit = "1";

    for(let i = 0; i < texto.length; i++){
        const charCode = texto.charCodeAt(i);

        if(charCode <= 0){
            throw new ErroValidacao(MENSAGENS_ERRO.FIBONACCI_ZECKENDORF_NAO_SUPORTA_ZERO);
        }

        const sequenciaFibonacci = gerarSequenciaFibonacci(charCode);

        let restante = charCode;
        const bits = new Array(sequenciaFibonacci.length).fill("0");

        for(let j = sequenciaFibonacci.length - 1; j >= 0; j--){
            const numeroFibonacci = sequenciaFibonacci[j];

            if(numeroFibonacci < restante){
                bits[j] = "1";
                restante -= numeroFibonacci;
            }

            else if(numeroFibonacci === restante){
                bits[j] = "1";
                break;
            }
        }

        const codeword = bits.join("") + stopBit;

        comprimido.push(codeword);
    }

    return comprimido;
};

const decode = (codewords) => {
    fibonacciZeckendorfValidacao.validarDecodeFibonacciZeckendorf(codewords);

    let textoDecodificado = "";

    for(let i = 0; i < codewords.length; i++){
        const codeword = codewords[i];

        const bitsSemStopBit = codeword.slice(0, -1);

        const sequenciaFibonacci = gerarSequenciaFibonacci(bitsSemStopBit.length, true);

        let charCode = 0;

        for(let j = 0; j < bitsSemStopBit.length; j++){
            if(bitsSemStopBit[j] === "1"){
                charCode += sequenciaFibonacci[j];
            }
        }

        textoDecodificado += String.fromCharCode(charCode);
    }

    return textoDecodificado;
};

const gerarSequenciaFibonacci = (limite, porTamanho = false) => {
    const sequenciaFibonacci = [1, 2];

    if(porTamanho){
        while(sequenciaFibonacci.length < limite){
            const ultimo = sequenciaFibonacci[sequenciaFibonacci.length - 1];
            const penultimo = sequenciaFibonacci[sequenciaFibonacci.length - 2];

            sequenciaFibonacci.push(ultimo + penultimo);
        }
    }

    else{
        while(sequenciaFibonacci[sequenciaFibonacci.length - 1] < limite){
            const ultimo = sequenciaFibonacci[sequenciaFibonacci.length - 1];
            const penultimo = sequenciaFibonacci[sequenciaFibonacci.length - 2];

            sequenciaFibonacci.push(ultimo + penultimo);
        }

        if(sequenciaFibonacci[sequenciaFibonacci.length - 1] > limite){
            sequenciaFibonacci.pop();
        }
    }

    return sequenciaFibonacci;
};

const resultado = encode("AULA");
console.log(resultado);

console.log(decode(resultado));

export default {
    encode,
    decode
};