const express = require("express");

//Archivo de configuración para variables utilizadas
const config = require("../configuration.js");
const auth = require("./components/auth/auth-network");
const errors = require("../network/errors");

//Archivo del controlador de usuario
const user = require("./components/user/user-network");

//Define la app con express.js
const app = express();

//Activa el body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Ruteo
//Añade el controlador de user a la ruta /api/user, el cual permitirá responder las peticiones hechas a esa ruta
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use(errors);

app.listen(config.api.port, () => {
    console.log("Api escuchando en el puerto ", config.api.port);
});