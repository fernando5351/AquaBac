

const authorizeRoles = (allowedRole) => {
    return (req, res, next) => {
        // Verificar si el usuario tiene el rol necesario para acceder a la ruta
        const userRole = req.user && req.user.role ? req.user.role : null;

        console.log('User Role:', userRole); // Agregar esta línea para depurar

        if (userRole === allowedRole) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso no autorizado' });
        }
    };
};


module.exports = { authorizeRoles };
