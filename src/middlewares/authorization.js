const User = require("../models/user");
const validateToken = require("../models/tableToken");
const jwt = require("jsonwebtoken");


// Comprobar autorizacion del usuario con token
const ensureToken = async (req, res, next) => {
  
    const authorization = req.headers["authorization"];
    //console.log(authorization);
    if (!authorization) res.json({ message: "ocurrio un error, porfavor intente más tarde"});
    const bearer = authorization.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    req.message = await Comparar(req);
  
    const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
    
  
    req.id = decoded.id
  
    next(); 
  
  
  
};

const Comparar = async (req) => {
  let validate = [];
  if (req.params.id) {
    validate = await validateToken.find({
      id: req.params.id,
      token: req.token,
    });
  } else {
    let user = await User.find({ email: req.body.email });
    console.log(user);
    if (user.length > 0) {
      validate = await validateToken.find({
        id: user[0]._id,
        token: req.token,
      });
    }
  }

  let message;
  if (validate.length == 0) {
    message = 0;
  } else {
    message = 1;
  }
  return message;
};

module.exports = ensureToken;
