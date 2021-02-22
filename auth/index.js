const jwt = require("jsonwebtoken");
const config = require("../configuration");
const error = require("../utils/error");
//Se obtiene el secret desde el archivo de configuracion
const secret = config.jwt.secret;

const sign = (data) => {
    //Para firmar el jwt, se le tiene que enviar los datos y el secret
    return jwt.sign({...data}, secret);
};

const check = {
    own: (req, owner) => {
        //
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id !== owner) {
            throw error("No puedes hacer esto", 401);
        }
    }
}

const getToken = (authorization) => {
    //Bearer token
    if (!authorization) {
        throw error("No viene token", 400);
    }

    if (authorization.indexOf('Bearer ') === -1) {
        throw error("Formato de token inválido");
    }

    let token = authorization.replace('Bearer ', '');

    return token;
}

const verify = (token) => {
    return jwt.verify(token, secret);
}

//Recibe el req para decodificar el token
const decodeHeader = (req) => {
    const authorization = req.headers.authorization || '';
    //Saca el token desde el tipo de cabecera
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}



module.exports = {
    sign,
    check
};