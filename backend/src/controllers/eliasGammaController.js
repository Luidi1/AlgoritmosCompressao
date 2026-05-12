import eliasGammaService from "../services/eliasGammaService.js";

const encode = (req, res, next) => {
    try {
        const { texto } = req.body;

        const resultado = eliasGammaService.encode(texto);

        return res.status(200).json({ resultado });
    } catch (erro) {
        next(erro);
    }
};

const decode = (req, res, next) => {
    try {
        const { codewords } = req.body;

        const resultado = eliasGammaService.decode(codewords);

        return res.status(200).json({ resultado });
    } catch (erro) {
        next(erro);
    }
};

export default { encode, decode };