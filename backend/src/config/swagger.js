import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Golomb",
            version: "1.0.0",
            description: "API para encode e decode com Golomb"
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
            }
        }
    },
    apis: []
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;