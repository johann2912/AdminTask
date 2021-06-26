const RoleModel = require('../models/roles')
const userRole = require('../utils/enums/user.enum')

const postRole = async (req, res) => {
    
    if(!userRole.includes(req.body.rol)){
        return res.json({
            ok: false
        })
    }
    const role = new RoleModel(req.body)
    await role.save()
    return res.json({
        ok: true
    })

}

const getRoles = async (req, res) => {
    const roles = await RoleModel.find()
    res.json(roles)
}

module.exports = {
    postRole,
    getRoles   
}