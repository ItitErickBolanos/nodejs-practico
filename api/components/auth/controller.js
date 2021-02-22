//CONSTANTE QUE INDICA QUÉ TABLA SE VA A UTILIZAR EN EL CONTROLADOR
const bcrypt = require("bcrypt");
const auth = require("../../../auth");
const TABLE = "auth";

//Para inyectar el almacenamiento se convierte el exports a una función que retorna las funciones del controlador
module.exports = (injectedStore = require("../../../store/dummy")) => {
    let store = injectedStore;

    const login = async (username, password) => {
        const data = await store.query(TABLE, {
            username: username
        });
        
        const sonIguales = await bcrypt.compare(password, data.password);
        if (sonIguales) {
            return auth.sign(data);
        } else {
            throw new Error("Información inválida")
        }  
    };

    const upsert = async (data) => {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            //Para generar el hash de nuestra password se utiliza bcrypt.hash, mandando el número de veces que se requiere hacer el proceso
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLE, authData);
    };

    return {
        login,
        upsert
    }
}