import golombService from "../services/golombService.js";

const encode = (req, res, next) => {
    try {
        const { texto, k } = req.body;

        const resultado = golombService.encode(texto, k);

        return res.status(200).json({ resultado });
    } catch (erro) {
        next(erro);
    }
};

const decode = (req, res, next) => {
    try {
        const { codewords, k } = req.body;

        const resultado = golombService.decode(codewords, k);

        return res.status(200).json({ resultado });
    } catch (erro) {
        next(erro);
    }
};

export default { encode, decode };