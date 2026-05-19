import fibonacciZeckendorfService from "../services/fibonacciZeckendorfService.js";

const encode = (req, res, next) => {
    try {
        const { texto } = req.body;

        const resultado = fibonacciZeckendorfService.encode(texto);

        return res.status(200).json({ resultado });
    } catch (erro) {
        next(erro);
    }
};

const decode = (req, res, next) => {
    try {
        const { codewords } = req.body;

        const resultado = fibonacciZeckendorfService.decode(codewords);

        return res.status(200).json({ resultado });
    } catch (erro) {
        next(erro);
    }
};

export default { encode, decode };