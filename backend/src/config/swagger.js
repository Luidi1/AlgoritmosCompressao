import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Algoritmos de Compressão",
            version: "1.0.0",
            description: "API para encode e decode com algoritmos de compressão"
        },
        paths: {
            "/golomb/encode": {
                post: {
                    summary: "Codifica texto usando Golomb",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["texto", "k"],
                                    properties: {
                                        texto: {
                                            type: "string",
                                            example: "AULA"
                                        },
                                        k: {
                                            type: "integer",
                                            minimum: 1,
                                            example: 4
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Texto codificado com sucesso",
                            content: {
                                "application/json": {
                                    example: {
                                        resultado: [
                                            "0000000000000000101",
                                            "000000000000000000000101",
                                            "0000000000000000000100",
                                            "0000000000000000101"
                                        ]
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Erro de validação",
                            content: {
                                "application/json": {
                                    examples: {
                                        campoObrigatorio: {
                                            summary: "Campo obrigatório",
                                            value: {
                                                mensagem: "O campo texto é obrigatório!"
                                            }
                                        },
                                        textoInvalido: {
                                            summary: "Texto inválido",
                                            value: {
                                                mensagem: "O campo texto deve ser uma string válida!"
                                            }
                                        },
                                        kInvalido: {
                                            summary: "K inválido",
                                            value: {
                                                mensagem: "O campo k deve ser um número inteiro maior que zero!"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Erro interno",
                            content: {
                                "application/json": {
                                    example: {
                                        mensagem: "Erro interno do servidor"
                                    }
                                }
                            }
                        }
                    }
                }
            },

            "/golomb/decode": {
                post: {
                    summary: "Decodifica codewords usando Golomb",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["codewords", "k"],
                                    properties: {
                                        codewords: {
                                            type: "array",
                                            items: {
                                                type: "string"
                                            },
                                            example: [
                                                "0000000000000000101",
                                                "000000000000000000000101",
                                                "0000000000000000000100",
                                                "0000000000000000101"
                                            ]
                                        },
                                        k: {
                                            type: "integer",
                                            minimum: 1,
                                            example: 4
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Codewords decodificados com sucesso",
                            content: {
                                "application/json": {
                                    example: {
                                        resultado: "AULA"
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Erro de validação",
                            content: {
                                "application/json": {
                                    examples: {
                                        campoObrigatorio: {
                                            summary: "Campo obrigatório",
                                            value: {
                                                mensagem: "O campo codewords é obrigatório!"
                                            }
                                        },
                                        codewordsInvalido: {
                                            summary: "Codewords inválido",
                                            value: {
                                                mensagem: "O campo codewords deve ser um array válido!"
                                            }
                                        },
                                        codewordInvalido: {
                                            summary: "Codeword inválido",
                                            value: {
                                                mensagem: "Codeword inválido na posição 0"
                                            }
                                        },
                                        kInvalido: {
                                            summary: "K inválido",
                                            value: {
                                                mensagem: "O campo k deve ser um número inteiro maior que zero!"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Erro interno",
                            content: {
                                "application/json": {
                                    example: {
                                        mensagem: "Erro interno do servidor"
                                    }
                                }
                            }
                        }
                    }
                }
            },

            "/elias-gamma/encode": {
                post: {
                    summary: "Codifica texto usando Elias Gamma",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["texto"],
                                    properties: {
                                        texto: {
                                            type: "string",
                                            example: "AULA"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Texto codificado com sucesso",
                            content: {
                                "application/json": {
                                    example: {
                                        resultado: [
                                            "0000001000001",
                                            "0000001010101",
                                            "0000001001100",
                                            "0000001000001"
                                        ]
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Erro de validação",
                            content: {
                                "application/json": {
                                    examples: {
                                        campoObrigatorio: {
                                            summary: "Campo obrigatório",
                                            value: {
                                                mensagem: "O campo texto é obrigatório!"
                                            }
                                        },
                                        textoInvalido: {
                                            summary: "Texto inválido",
                                            value: {
                                                mensagem: "O campo texto deve ser uma string válida!"
                                            }
                                        },
                                        zeroNaoSuportado: {
                                            summary: "Caractere zero não suportado",
                                            value: {
                                                mensagem: "Elias Gamma não suporta o valor zero!"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Erro interno",
                            content: {
                                "application/json": {
                                    example: {
                                        mensagem: "Erro interno do servidor"
                                    }
                                }
                            }
                        }
                    }
                }
            },

            "/elias-gamma/decode": {
                post: {
                    summary: "Decodifica codewords usando Elias Gamma",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["codewords"],
                                    properties: {
                                        codewords: {
                                            type: "array",
                                            items: {
                                                type: "string"
                                            },
                                            example: [
                                                "0000001000001",
                                                "0000001010101",
                                                "0000001001100",
                                                "0000001000001"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Codewords decodificados com sucesso",
                            content: {
                                "application/json": {
                                    example: {
                                        resultado: "AULA"
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Erro de validação",
                            content: {
                                "application/json": {
                                    examples: {
                                        campoObrigatorio: {
                                            summary: "Campo obrigatório",
                                            value: {
                                                mensagem: "O campo codewords é obrigatório!"
                                            }
                                        },
                                        codewordsInvalido: {
                                            summary: "Codewords inválido",
                                            value: {
                                                mensagem: "O campo codewords deve ser um array válido!"
                                            }
                                        },
                                        codewordNaoString: {
                                            summary: "Codeword não string",
                                            value: {
                                                mensagem: "Codeword inválido na posição 0. Cada codeword deve ser uma string."
                                            }
                                        },
                                        codewordVazio: {
                                            summary: "Codeword vazio",
                                            value: {
                                                mensagem: "Codeword inválido na posição 0. O codeword não pode ser vazio."
                                            }
                                        },
                                        codewordBinarioInvalido: {
                                            summary: "Codeword binário inválido",
                                            value: {
                                                mensagem: "Codeword inválido na posição 0. Use apenas 0 e 1."
                                            }
                                        },
                                        codewordSemStopBit: {
                                            summary: "Codeword sem stop bit",
                                            value: {
                                                mensagem: "Codeword inválido na posição 0. Stop bit não encontrado."
                                            }
                                        },
                                        codewordTamanhoInvalido: {
                                            summary: "Tamanho inválido",
                                            value: {
                                                mensagem: "Codeword inválido na posição 0. Tamanho incompatível com Elias Gamma."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Erro interno",
                            content: {
                                "application/json": {
                                    example: {
                                        mensagem: "Erro interno do servidor"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: []
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;