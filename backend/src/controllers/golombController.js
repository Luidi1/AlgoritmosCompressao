import golombService from "../services/golombService.js";

const validarK = (k) => {
    if (k === undefined) {
        return "O campo k é obrigatório!";
    }

    if (!Number.isInteger(k) || k <= 0) {
        return "O campo k deve ser inteiro positivo!";
    }

    return null;
};

const encode = (req, res) => {
    try {
        const { texto, k } = req.body;

        if (texto === undefined || texto === "") {
            return res.status(400).json({ mensagem: "O campo texto é obrigatório!" });
        }

        if (typeof texto !== "string") {
            return res.status(400).json({ mensagem: "O campo texto deve ser string!" });
        }

        const erroK = validarK(k);

        if (erroK) {
            return res.status(400).json({ mensagem: erroK });
        }

        const resultado = golombService.encode(texto, k);

        return res.status(200).json({ resultado });
    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao codificar com Golomb",
            erro: erro.message
        });
    }
};

const decode = (req, res) => {
    try {
        const { codewords, k } = req.body;

        if (!Array.isArray(codewords) || codewords.length === 0) {
            return res.status(400).json({
                mensagem: "O campo codewords deve ser um array não vazio!"
            });
        }

        const erroK = validarK(k);

        if (erroK) {
            return res.status(400).json({ mensagem: erroK });
        }

        for (let i = 0; i < codewords.length; i++) {
            const codeword = codewords[i];

            if (typeof codeword !== "string") {
                return res.status(400).json({
                    mensagem: `Codeword inválido na posição ${i}. Cada codeword deve ser uma string.`
                });
            }

            if (!/^[01]+$/.test(codeword)) {
                return res.status(400).json({
                    mensagem: `Codeword inválido na posição ${i}. Só pode conter 0 e 1.`
                });
            }
        }

        const resultado = golombService.decode(codewords, k);

        return res.status(200).json({ resultado });
    } catch (erro) {
        return res.status(500).json({
            mensagem: "Erro ao decodificar com Golomb",
            erro: erro.message
        });
    }
};

export default { encode, decode };