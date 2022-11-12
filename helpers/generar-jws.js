const jwt = require("jsonwebtoken");



const generarJWT = (uid = '',tipo='cliente') => {

    return new Promise((resolve, reject) => {

        const payload = { uid,tipo };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                console.log("No se pudo generar el token");
            } else {
                resolve(token);
            }

        });



    });






}


module.exports = {generarJWT};