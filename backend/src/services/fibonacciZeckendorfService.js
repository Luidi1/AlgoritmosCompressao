const encode = (texto) => {
    //fibonacciZeckendorfValidacao.validarEncodeFibonacciZeckendorf(texto);
    const comprimido = [];
    const stopBit = 1;
    
    
    for(let i = 0; i < texto.length; i++){
        let numSequenciaFibonacci = [1, 2];
        let simboloContidoNaSequencia = false;
        let indice = 0;

        const charCode = texto.charCodeAt(i);

        while(numSequenciaFibonacci[indice] <= charCode){
            if(numSequenciaFibonacci[indice] === charCode){
                simboloContidoNaSequencia = true;
                break;
            }
            numSequenciaFibonacci.push(numSequenciaFibonacci[indice] + numSequenciaFibonacci[indice+1]);
            indice++;
        }

        if(simboloContidoNaSequencia){
            numSequenciaFibonacci.pop();
        }
        else{
            numSequenciaFibonacci.pop();
            numSequenciaFibonacci.pop();
        }
        
        let soma = 0;
        let codeword = "";
        while(soma != charCode){
           for(let j = numSequenciaFibonacci.length - 1; j >= 0; j--){
                if(j === numSequenciaFibonacci.length - 1){
                    soma += numSequenciaFibonacci[j];
                    codeword += "1";
                    //j--; //pq nao tem como ser consecutivo
                    continue;
                }
                
                if((soma + numSequenciaFibonacci[j]) > charCode){
                    codeword = "0" + codeword;
                }
               
                else if((soma + numSequenciaFibonacci[j]) < charCode){
                    soma += numSequenciaFibonacci[j];
                    codeword = "1" + codeword;
                }

                else{
                    soma += numSequenciaFibonacci[j];
                    codeword = "1" + codeword;
                    if(j > 0){
                        for(j = j - 1; j >= 0; j--){
                            codeword = "0" + codeword;
                        }
                    }
                    break;
                }
                
            }
        }
        codeword += stopBit;
        comprimido.push(codeword);
    }
    return comprimido;
}

const resultado = encode("8")
console.log(resultado);

const decode = (codewords) => {
    //fibonacciZeckendorfValidacao.validarEncodeFibonacciZeckendorf(texto);
    let texto = "";
    for(let i = 0; i < codewords.length; i++){
        let soma = 0;
        let numSequenciaFibonacci = [1, 2];
        
        

        const codeword = codewords[i];
        for(let j = 2; j < codeword.length - 1; j++){
            numSequenciaFibonacci.push(numSequenciaFibonacci[j-1] + numSequenciaFibonacci[j - 2]);
        }

        for(let j = 0; j < codeword.length - 1; j++){
            if(codeword[j] === "0"){
                continue;
            }
            soma += parseInt(numSequenciaFibonacci[j]);
        }

        const charCode = soma;
        const simbolo = String.fromCharCode(charCode);
        texto += simbolo; 
    }

    return texto;
}

console.log(decode(resultado));