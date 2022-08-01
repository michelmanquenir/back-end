const User = require('../models/user.js');
const logger = require('../utils/logger')('UserController');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt.js');
const userCtrl = {};

userCtrl.registerUser = async (req, res) => {
  try{
    logger.debug('[registerUser] Inicio register user');
    var data = req.body;
    const user_array =  await User.find({ email: data.email });

    if(user_array.length == 0) {
      logger.info('[registerUser] Usuario no encontrado');
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
      logger.info('[registerUser] Usuario ya existe');
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

userCtrl.signinUser = async (req, res) => {
  try{
    logger.debug('[signinUser] Inicio signin user');
    let data = req.body;
    let cliente_array = [];
    cliente_array =  await User.find({ email: data.email });
    logger.silly('[signinUser] cliente_array: ' + JSON.stringify(cliente_array));
    if(cliente_array.length == 0) {
      logger.info('[signinUser] Usuario no encontrado');
      res.status(200).json({
        error: '1',
        message: 'Usuario no existe'
      });
    }else {
      logger.debug('[signinUser] Usuario encontrado');
      let user = cliente_array[0];
      bcrypt.compare(data.password, user.password, async function(err, result) {
        if(result) {
          logger.debug('[signinUser] Usuario autenticado');
          res.status(200).json({
            error: '0',
            message: 'Usuario autenticado correctamente',
            usuario: user,
            token: jwt.createToken(user)
          });
        } else {
          logger.info('[signinUser] Usuario no autenticado');
          res.status(200).json({
            error: '1',
            message: 'Password incorrecto'
          });
        }
      });
    }
  } catch (error) {
    logger.error('[signinUser] Error: ' + error.message);
    res.status(200).json({
      error: '1',
      message: 'Error: ' + error.message
    });
  }
};

userCtrl.getUsers = async (req, res) => {
  try{
    logger.debug('[getUsers] Inicio get users');
    let users = await User.find();
    if(users.length > 0) {
      logger.info('[getUsers] Usuarios encontrados');
      res.status(200).json({
        error: '0',
        message: 'Usuarios encontrados',
        data: users
      });
    } else {
      logger.info('[getUsers] No se encontraron usuarios');
      res.status(200).json({
        error: '1',
        message: 'No se encontraron usuarios'
      });
    }
  } catch (error) {
    logger.error('[getUsers] Error: ' + error.message);
    res.status(200).json({
      error: '1',
      message: 'Error: ' + error.message
    });
  }
};

userCtrl.getDatosDummy = async (req, res) => {
  try{
    logger.debug('[getDatosDummy] Inicio get datos dummy');
    const arrayDummy = [
      {
        id: 1,
        nombre: 'Juan',
        apellido: 'Perez',
        email: 'juanperez@gmail.com',
      },
      {
        id: 2,
        nombre: 'Constanza',
        apellido: 'Rodriguez',
        email: 'crodriguez@gmail.com',
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
};

module.exports = userCtrl;