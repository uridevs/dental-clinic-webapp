exports.requireRole = (allowedRoles) => {
    return (req, res, next) => {
        const { user } = req;
        if (user && allowedRoles.includes(user.role)) {
            next();
        } else {
            res.status(403).json({ message: "Acceso denegado: no tiene los permisos adecuados.", user });
        }
    };
};
