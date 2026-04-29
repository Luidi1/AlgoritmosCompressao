import ErroValidacao from "../errors/ErroValidacao.js"

const validarK = (k) => {
    if(k === undefined){
        throw new ErroValidacao("O campo k é obrigatório!");
    }

    if(!Number.isInteger(k) || k <= 0){
        throw new ErroValidacao("O campo k deve ser inteiro positivo!");
    }
}

const validarEncodeGolomb = (texto, k) => {
    if(texto === undefined || texto === ""){
        throw new ErroValidacao("O campo texto é obrigatório!");
    }

    if(typeof texto !== "string"){
        throw new ErroValidacao("O campo texto deve ser string!");
    }

    validarK(k);
}

const validarDecodeGolomb = (codewords, k) => {
    if(codewords === undefined){
        throw new ErroValidacao("O campo Codewords é obrigatório!");
    }

    if(!Array.isArray(codewords) || codewords.length === 0){
        throw new ErroValidacao("O campo codewords deve ser um array não vazio!");
    }

    for(let i = 0; i < codewords.length; i++){
        const codeword = codewords[i];

        if(typeof codeword !== "string"){
            throw new ErroValidacao(`Codeword inválido na posição ${i}. Cada codeword deve ser uma string.`);
        }
        
        if (codeword === "") {
            throw new ErroValidacao(`Codeword inválido na posição ${i}. Codeword não pode ser vazio.`);
        }

        if (!/^[01]+$/.test(codeword)) {
            throw new ErroValidacao(`Codeword inválido na posição ${i}. Só pode conter 0 e 1.`);
        }
    }

    validarK(k);
}

export default { validarEncodeGolomb, validarDecodeGolomb }