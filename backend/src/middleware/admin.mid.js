import jwt from 'jsonwebtoken'
import config from '../../config.js'

export default function adminMiddleware(req,res,next){

  const cookieToken = req.cookies.jwt;
     console.log(cookieToken);
     
  if(!cookieToken){
    console.log('ERROR !! no token unauthorize');
    return res.status(401).json({error:'No token unauthorize'});
  }
    try {
     const decode=jwt.verify(cookieToken,config.JWT_ADMIN_SECRET);
     req.adminId=decode.id;
     next();    
    } catch (error) {
        console.log("ERROR !! invalid token or expire",error);
        res.status(401).json({error:'invalid token or expire'})
    }
}