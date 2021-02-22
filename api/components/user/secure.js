/*
Exporta un middleware
*/
const auth = require("../../../auth");

const checkAuth = (action) => {
    const middleware = (req, res, next) => {
        switch(action) {
            case "update":
                //Comprobar si se puede realizar la acción
                const owner = req.body.id;
                auth.check.own(req, owner);
                next();
            break;

            default:
                next();
        }
    }

    return middleware;
}

module.exports = checkAuth;