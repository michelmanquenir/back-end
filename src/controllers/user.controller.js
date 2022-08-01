var User = require('../models/user.js');
const logger = require('../utils/logger')('UserController');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt.js');
const userCtrl = {};

userCtrl.registerUser = async (req, res) => {
    try {
    console.log("registerUser");
        var data = req.body;
        const user_array =  await User.find({ email: data.email });
        if(user_array.length == 0) {
            if(data.password) {
                bcrypt.hash(data.password, null, null, async function(err, hash) {
                    if(hash) {
                        data.password = hash;
                        var reg = await User.create(data);
                        res.status(200).json({
                            status: 200,
                            error: '0',
                            message: 'Usuario creado correctamente',
                            usuario: reg
                        });
                    }
                });
            } else {
                res.status(200).json({
                    message: 'El password es requerido', 
                    data: undefined
                });
            }
        } else {
            res.status(200).json({
                error: '0',
                message: 'Usuario ya existe en la base de datos'
            });
        }
    } catch (error) {
        res.json({
            error: '1',
            message: 'Error: ' + error.message
        });
    }
};

userCtrl.loginUser = async (req, res) => {
    try {
        var data = req.body;
        console.log(data);
       /*  const user_array =  await User.find({ email: data.email }); */
        const arrayDummy = [
            {
                id: 1,
                nombre: "michel",
                apellido: "manquenir",
                email: "admin@gmail.com",
                password: "1234",
            },
        ] 
        if(data.email != arrayDummy[0].email) {
            res.status(200).json({
                error: '1',
                message: 'El email no existe en la base de datos'
            });
        } else {
            if(data.password != arrayDummy[0].password){
                res.status(200).json({
                    error: '1',
                    message: 'Password incorrecto'
                });
            } else {
                console.log("usuario autenticado");
                res.status(200).json({
                    error: '0',
                    message: 'Usuario autenticado correctamente',
                    usuario: arrayDummy[0],
                    token: jwt.createToken(arrayDummy[0])
                });
            }

            /* let user = user_array[0]; */
            /* bcrypt.compare(data.password, user.password, async function(err, result) {
                if(result) {
                    console.log("usuario autenticado");
                    res.status(200).json({
                        error: '0',
                        message: 'Usuario autenticado correctamente',
                        usuario: user,
                        token: jwt.createToken(user)
                    });
                } else {
                    res.status(200).json({
                        error: '1',
                        message: 'Password incorrecto'
                    });
                }
            }); */
        }
    } catch (error) {
        res.json({
            error: '1',
            message: 'Error: ' + error.message
        });
    }
}
userCtrl.getDatosDummy = async (req, res) => {
    try{
        console.log("getDatosDummy");
        logger.debug("[getDatosDummy] Inicio get datos dummy");
        const arrayDummy = [
            {
                id: 1,
                nombre: "Juan",
                apellido: "Perez",
                email: "juanperez@gmail.com",
            },
            {
                id: 2,
                nombre: "Constanza",
                apellido: "Rodriguez",
                email: "crodriguez@gmail.com",
            },
        ];
        res.json({
            error: '0',
            message: 'Datos obtenidos correctamente',
            data: arrayDummy
        });

    }catch(error){
        res.json({
            error: '1',
            message: 'Error: ' + error.message
        });
    }
}
module.exports = userCtrl;