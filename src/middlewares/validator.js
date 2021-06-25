const User = require("../models/user");
const ModelRol = require('../models/roles');
const { RolUser, userRol } = require('../utils/enums/user.enum')


const isGerencial = async (req, res, next) => {
    const user = await User.findById(req.id)
    const rol = await ModelRol.findOne({_id: user.rol})

    console.log(rol.rol)
    
    if(rol.rol == 'gerencial'){
        next();
    } else {
        return res.status(403).json({message: "Ruta exclusiva de gerenciales"})
    }

}


const isAdminsitrativo = async (req, res, next) => {
    const user = await User.findById(req.id)
    const rol = await ModelRol.findOne({_id: user.rol})

    console.log(rol.rol)
    
    if(rol.rol == 'administrativo'){
        next();
    } else {
        return res.status(403).json({message: "Ruta exclusiva de gerenciales"})
    }
}

const isAsistencial = async (req, res, next) => {
    const user = await User.findById(req.id)
    const rol = await ModelRol.findOne({_id: user.rol})

    console.log(rol.rol)
    
    if(rol.rol == 'asistencial'){
        next();
    } else {
        return res.status(403).json({message: "Ruta exclusiva de gerenciales"})
    }
}


module.exports = {
    isGerencial,
    isAdminsitrativo,
    isAsistencial
  };