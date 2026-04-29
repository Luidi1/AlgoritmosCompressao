const middlewarewErros = (erro, req, res, next) => {
    if(erro.name === "ErroValidacao"){
        return res.status(400).json({ mensagem: erro.message });
    }

    console.error(erro);
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
}

export default middlewarewErros;