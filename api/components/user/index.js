//Importa almacenamiento (BD)
const store =  require("../../../store/mysql");

//Importa controlador
const controller = require("./controller");

//Inyectando el store al controlador
module.exports = controller(store);