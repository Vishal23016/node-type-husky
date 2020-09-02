import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
// import config from "../config/config";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        var token = req.headers['authorization'];
        console.log('token',token);
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, process.env.JWTSecretKey, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, code: "E_UNAUTHORIZED", message: 'Failed to authenticate token.' });                    
                } else {
                    req['decoded'] = decoded;
                    next();
                }
            });
        } else {
            return res.json({ success: false, code: "E_UNAUTHORIZED", message: 'No token provided.' });
        } 
    } catch (error) {
        console.log("jwt error::::",error);        
        return res.json({ success: false, code: "E_UNAUTHORIZED", message: 'Error in JWT Verification!.' });
    }
};

export default checkJwt;