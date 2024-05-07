const { sequelize, Categoria} = require("../database.js");

exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearCategoria = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const {nombre_categoria} = req.body;
        const nuevaCategoria = await Categoria.create(
            {
                nombre_categoria
            },
            {transaction: t}
        );
    await t.commit();
    res.status(201).json({ message: "Categoría creada con éxito" });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Categoria.destroy({
            where: {id_categoria: id},
        });
        if(deleted){
            res.status(204).json({ message: "Categoría eliminada con éxito" });
        }else{
            throw new Error("Categoría no encontrada");
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};