require("dotenv").config()
const jwt = require("jsonwebtoken")

const verify = (req,res,next) =>{
    const tk = req.headers.token

    if(!tk){
        return res.status(401).send({msg:"Por Favor faça o Login"})
    }
    jwt.verify(tk,process.env.JWT_KEY,{experies:process.env.JWT_EXPERIES},(error,dados)=>{
        if(error){
            return res.status(401).send({msg:"Sessão finalizada. Efetue o login outra vez"})
        }
        next()
    })
}

module.exports = verify