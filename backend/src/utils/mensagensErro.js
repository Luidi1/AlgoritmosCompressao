const MENSAGENS_ERRO = {
    CAMPO_OBRIGATORIO: (campo) => `O campo ${campo} é obrigatório!`,
    
    K_INVALIDO: "O campo k deve ser inteiro positivo!",
    TEXTO_INVALIDO: "O campo texto deve ser string!",
    CODEWORDS_INVALIDO: "O campo codewords deve ser um array não vazio!",

    CODEWORD_NAO_STRING: (pos) => `Codeword inválido na posição ${pos}. Cada codeword deve ser uma string.`,
    CODEWORD_VAZIO: (pos) => `Codeword inválido na posição ${pos}. Codeword não pode ser vazio.`,
    CODEWORD_BINARIO_INVALIDO: (pos) => `Codeword inválido na posição ${pos}. Só pode conter 0 e 1.`,
    CODEWORD_SEM_STOP_BIT: (pos) => `Codeword inválido na posição ${pos}. Não possui stop bit.`,

    CODEWORD_TAMANHO_INVALIDO_GOLOMB: (pos) => `Codeword inválido na posição ${pos} do array de codewords. Tamanho inválido para o valor de k.`,

    CODEWORD_TAMANHO_INVALIDO_ELIASGAMMA: (pos) => `Codeword inválido na posição ${pos} do array de codewords. Tamanho inválido para Elias Gamma.`,
    ELIAS_GAMMA_NAO_SUPORTA_ZERO: "Elias Gamma não suporta o valor 0."
};

export default MENSAGENS_ERRO;