import golombService from "../services/golombService.js";

const encode = (req, res) => {

    try{

        const { texto, k } = req.body
    
        if(texto === undefined || texto === ""){
            return res.status(400).json({ mensagem: "O campo texto é obrigatório!" });
        }
    
        if(k === undefined){
            return res.status(400).json({ mensagem: "O campo k é obrigatório!" });
        }
    
        if(typeof texto !== "string"){
            return res.status(400).json({ mensagem: "O campo texto deve ser string!" });
        }
    
        if(!Number.isInteger(k) || k <= 0){
            return res.status(400).json({ mensagem: "O campo k deve ser inteiro positivo!" });
        }

    
        const resultado = golombService.encode(texto, k);
    
        return res.status(200).json({ resultado });
    }
    catch(erro){
        return res.status(500).json({ mensagem: "Erro ao codificar com Golomb", erro: erro.message});
    }
}

export default { encode };