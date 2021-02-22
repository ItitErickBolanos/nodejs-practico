/*
    Importando express para poder utilizar el router,
    el cual permitirá que nuestro controlador responda a las peticiones GET, POST, PUT, DELETE
    según la ruta que le indiquemos
*/

const express = require("express");

const secure = require("./secure");

//Importando archivo de response para poder unificar respuestas en todas las rutas
const response = require("../../../network/response");

//Importando archivo de controlador para poder ser utilizado en el router
const Controller = require("./index");

const router = express.Router();

//Funciones dentro del controlador
const list = async (req, res, next) => {
    try {
        const lista = await Controller.list();
        response.success(req, res, lista, 200);
    } catch (err) {
        next();
    }
};

const get = async (req, res, next) => {
    try {
        const user = await Controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (err) {
        next();
    }
};

const upsert = async (req, res, next) => {
    try {
        let user = await Controller.upsert(req.body);
        response.success(req, res, user, 201);
    } catch (err) {
        next();
    }
}

//Rutas con su respectiva acción en forma de función
router.get("/", list);

router.get("/:id", get);

router.post("/", upsert);

//Se añade el middleware secure para comprobar la autorización de la ruta
router.put("/", secure("update"), upsert);

//Se exporta el controlador como router, lo que permite utilizarlo en otras partes de la aplicación
module.exports = router;