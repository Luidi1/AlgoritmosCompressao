const MENSAGENS_ERRO = {
    CAMPO_OBRIGATORIO: (campo) => `O campo ${campo} é obrigatório!`,
    
    K_INVALIDO: "O campo k deve ser inteiro positivo!",
    TEXTO_INVALIDO: "O campo texto deve ser string!",
    CODEWORDS_INVALIDO: "O campo codewords deve ser um array não vazio!",

    CODEWORD_NAO_STRING: (pos) => `Codeword inválido na posição ${pos}. Cada codeword deve ser uma string.`,
    CODEWORD_VAZIO: (pos) => `Codeword inválido na posição ${pos}. Codeword não pode ser vazio.`,
    CODEWORD_BINARIO_INVALIDO: (pos) => `Codeword inválido na posição ${pos}. Só pode conter 0 e 1.`,
    CODEWORD_SEM_STOP_BIT: (pos) => `Codeword inválido na posição ${pos}. Não possui stop bit.`,
    CODEWORD_TAMANHO_INVALIDO: (pos) => `Codeword inválido na posição ${pos}. Tamanho inválido para o valor de k.`
};

export default MENSAGENS_ERRO;