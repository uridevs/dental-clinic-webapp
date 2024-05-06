const Categoria = require('../models/Categoria');

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearCategoria = async (req, res) => {
    try {
        const nuevaCategoria = await Categoria.create(req.body);
        res.json(nuevaCategoria);
    } catch (error) {
        res.status(500).send(error.message);
    }
};