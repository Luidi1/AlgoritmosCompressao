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
                                            example: 4
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Texto codificado com sucesso"
                        },
                        400: {
                            description: "Erro de validação nos dados enviados"
                        },
                        500: {
                            description: "Erro interno ao codificar com Golomb"
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
                                            example: 4
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Codewords decodificados com sucesso"
                        },
                        400: {
                            description: "Erro de validação nos dados enviados"
                        },
                        500: {
                            description: "Erro interno ao decodificar com Golomb"
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