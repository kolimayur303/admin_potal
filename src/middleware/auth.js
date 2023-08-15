const jwt = require('jsonwebtoken'); 
const SECRET_KEY = "mayurkoli@@@@#$890"

const auth = (req, res, next)=>{

    try{
        let token = req.headers.authorization;
        if(token){
            token = token.split(' ')[1];
            let admin = jwt.verify(token,SECRET_KEY);
            req.adminId = admin.id;
           
        }else{
            res.status(401).json({message: "Unauthorized Admin"});
        }
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({message: "Unauthorized Admin"});
    }
}

module.exports = {auth};