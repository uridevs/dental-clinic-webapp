const { Tratamiento, Especialidad } = require("../database.js");

exports.listarTratamientos = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.findAll({
            include: {
                model: Especialidad,
                as: 'especialidad',
                attributes: ['nombre_especialidad']
            }
        });
        res.json(tratamientos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.listarTratamientosPorEspecialidad = async (req, res) => {
    try {
        const { id_especialidad } = req.query;
        const tratamientos = await Tratamiento.findAll({
            where: { id_especialidad },
            include: {
                model: Especialidad,
                as: 'especialidad',
                attributes: ['nombre_especialidad']
            }
        });
        res.json(tratamientos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.crearTratamiento = async (req, res) => {
    try {
        const tratamiento = await Tratamiento.create(req.body);
        res.status(201).json(tratamiento);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.actualizarTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Tratamiento.update(req.body, {
            where: { id_tipo_tratamiento: id }
        });
        if (updated) {
            const updatedTratamiento = await Tratamiento.findByPk(id);
            res.status(200).json(updatedTratamiento);
        } else {
            res.status(404).send("Tratamiento no encontrado");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.eliminarTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Tratamiento.destroy({
            where: { id_tipo_tratamiento: id }
        });
        if (deleted) {
            res.status(204).send("Tratamiento eliminado con éxito");
        } else {
            res.status(404).send("Tratamiento no encontrado");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
