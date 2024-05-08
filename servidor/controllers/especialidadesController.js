const { sequelize, Especialidad} = require("../database.js");

exports.listarEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.findAll();
        res.json(especialidades);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearEspecialidad = async (req, res) => {
    try {
        const nuevaEspecialidad = await Especialidad.create(req.body);
        res.json(nuevaEspecialidad);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.modificarEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_especialidad } = req.body;
        const [updated] = await Especialidad.update({ nombre_especialidad }, {
            where: { id_especialidad: id }
        });

        if (updated) {
            const updatedEspecialidad = await Especialidad.findOne({
                where: { id_especialidad: id }
            });
            res.status(200).json({ message: "Especialidad modificada con éxito", especialidad: updatedEspecialidad });
        } else {
            res.status(404).send("Especialidad no encontrada");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.eliminarEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;  // Asumiendo que el ID viene de la URL
        const deleted = await Especialidad.destroy({
            where: { id_especialidad: id }
        });
        if (deleted) {
            res.status(200).json({ message: "Especialidad eliminada con éxito" });
        } else {
            throw new Error("Especialidad no encontrada");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
