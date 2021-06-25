const User = require("../models/user");
const validateToken = require("../models/tableToken");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//  login
const signUp = async (req, res) => {
  let user = await User.findOne({ email: req.body.email }).select('_id, password');
  if (user) {
    let pass = user.comparePassword(req.body.password);
    if (!pass)
      return res.status(403).json({
        message: "problema con las credenciales",
      });

    req.body.validateToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    // consultar si existe token
    token = await validateToken.findOne({ id: user._id });

    if (token) {
      await validateToken.updateOne(
        { _id: token._id },
        {
          token: req.body.validateToken,
        }
      );
    } else {
      await validateToken.create({
        id: user._id,
        token: req.body.validateToken,
      });
    }
    res
      .status(200)
      .send({ message: "Usuario logueado", token: req.body.validateToken });
  }
};

// logout
const  logout =  async (req, res) => {  
    
    if(req.message == 0){
        res.status(400).send('Token invalido')
    } else {
        const buscando = await validateToken.findOne({id: req.params.id})
        //console.log(buscando)
        if(!buscando) return res.status(400).json({ error: 'ocurrio un error'})
        let lalala = await validateToken.deleteOne({ _id: buscando._id })
        //console.log(lalala)
        res.status(200).send('session cerrada')
    }

};

module.exports = {
  signUp,
  logout
};