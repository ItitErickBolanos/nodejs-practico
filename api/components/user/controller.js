//Este archivo se comunicará a la capa de almacenamiento (BD) general del proyecto
const { nanoid } = require("nanoid");
const auth = require("../auth");

//CONSTANTE QUE INDICA QUÉ TABLA SE VA A UTILIZAR EN EL CONTROLADOR
const TABLE = "user";

//Para inyectar el almacenamiento se convierte el exports a una función que retorna las funciones del controlador
module.exports = (injectedStore = require("../../../store/dummy")) => {
    let store = injectedStore;
    
    const list = () => {
        return store.list(TABLE);
    }

    const get = (id) => {
        return store.get(TABLE, id);
    }

    const upsert = async (body) => {
        const user = {
            name: body.name,
            username: body.username
        };

        user.id = body.id ? body.id : nanoid();

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            });
        }
        return store.upsert(TABLE, user);
    }

    return {
        list,
        get,
        upsert
    }
}
